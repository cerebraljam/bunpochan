// Bunpochan Background Service Worker
// Coordinates grammar analysis and manages extension state

console.log('Bunpochan background service worker loaded');

// Load kuromoji.js library (path relative to extension root)
importScripts('/src/lib/kuromoji/kuromoji.js');

// Grammar database cache
let grammarDatabase = null;
let userSettings = null;

// Kuromoji tokenizer cache
let tokenizer = null;
let tokenizerReady = false;
let tokenizerInitializing = false;

/**
 * Load grammar database
 */
async function loadGrammarDatabase() {
  if (grammarDatabase) {
    return grammarDatabase;
  }

  try {
    const response = await fetch(chrome.runtime.getURL('src/data/grammar-db.json'));
    grammarDatabase = await response.json();
    console.log('Grammar database loaded:', grammarDatabase.patterns.length, 'patterns');
    return grammarDatabase;
  } catch (error) {
    console.error('Error loading grammar database:', error);
    return { patterns: [] };
  }
}

/**
 * Load user settings
 */
async function loadUserSettings() {
  try {
    const result = await chrome.storage.sync.get({
      enabledLevels: {
        n5: true,
        n4: true,
        n3: true,
        n2: true,
        n1: true,
        common: true
      },
      enabledRegisters: {
        casual: true,
        written: true,
        spoken: true,
        neutral: true
      }
    });
    userSettings = {
      levels: result.enabledLevels,
      registers: result.enabledRegisters
    };
    return userSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      levels: {
        n5: true,
        n4: true,
        n3: true,
        n2: true,
        n1: true,
        common: true
      },
      registers: {
        casual: true,
        written: true,
        spoken: true,
        neutral: true
      }
    };
  }
}

/**
 * Initialize kuromoji tokenizer (with caching)
 * This is called lazily on first use to avoid blocking extension startup
 */
async function initializeTokenizer() {
  // Return cached tokenizer if already initialized
  if (tokenizerReady && tokenizer) {
    return tokenizer;
  }

  // Wait if already initializing
  if (tokenizerInitializing) {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (tokenizerReady) {
          clearInterval(checkInterval);
          resolve(tokenizer);
        } else if (!tokenizerInitializing) {
          clearInterval(checkInterval);
          reject(new Error('Tokenizer initialization failed'));
        }
      }, 100);
    });
  }

  tokenizerInitializing = true;

  try {
    return await new Promise((resolve, reject) => {
      const dicPath = chrome.runtime.getURL('src/lib/kuromoji/dict');
      console.log('[Kuromoji] Step 1/3: Starting initialization...');
      console.log('[Kuromoji] Dictionary path:', dicPath);

      const startTime = Date.now();

      kuromoji.builder({ dicPath: dicPath }).build((err, tok) => {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

        if (err) {
          console.error('[Kuromoji] ❌ Initialization failed after', elapsedTime, 'seconds');
          console.error('[Kuromoji] Error details:', err);
          tokenizerInitializing = false;
          reject(err);
        } else {
          tokenizer = tok;
          tokenizerReady = true;
          tokenizerInitializing = false;
          console.log('[Kuromoji] ✓ Initialization complete in', elapsedTime, 'seconds');
          console.log('[Kuromoji] Tokenizer ready for use');
          resolve(tok);
        }
      });

      // Log progress after 1 second
      setTimeout(() => {
        if (tokenizerInitializing) {
          console.log('[Kuromoji] Step 2/3: Loading dictionary files (~17MB)...');
        }
      }, 1000);

      // Warn if taking too long
      setTimeout(() => {
        if (tokenizerInitializing) {
          console.warn('[Kuromoji] Still loading... This is taking longer than expected.');
          console.warn('[Kuromoji] Check browser console for errors.');
        }
      }, 5000);
    });
  } catch (error) {
    tokenizerInitializing = false;
    console.error('[Kuromoji] Fatal error during initialization:', error);
    throw error;
  }
}

/**
 * Match pattern using POS (Part-of-Speech) tagging with kuromoji
 * Used for particles and other patterns that need grammatical context
 */
function matchWithPOS(tokens, pattern) {
  if (!tokens || !pattern.matching) {
    return null;
  }

  const matching = pattern.matching;
  const requiredPOS = matching.pos; // Array of acceptable POS tags
  const surface = matching.surface; // The surface form to match

  // Find all tokens that match both POS tag and surface form
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Check if POS tag matches (e.g., "助詞" for particles)
    const posMatches = requiredPOS && requiredPOS.includes(token.pos);

    // Check if surface form matches
    const surfaceMatches = surface === token.surface_form;

    if (posMatches && surfaceMatches) {
      return {
        text: token.surface_form,
        position: token.word_position || i,
        confidence: 'high' // POS-based matching has high confidence
      };
    }
  }

  return null;
}

/**
 * Match pattern using regex or substring matching
 * Used for most grammar patterns that don't need POS context
 */
function matchWithRegex(sentence, pattern) {
  const matching = pattern.matching;

  // Try regex matching if available
  if (matching && matching.regex) {
    try {
      const regex = new RegExp(matching.regex, 'g');
      const match = regex.exec(sentence);

      if (match) {
        return {
          text: match[0],
          position: match.index,
          confidence: 'medium'
        };
      }
    } catch (error) {
      console.error('Regex error for pattern', pattern.pattern, error);
    }
  }

  // Try simple substring matching
  if (matching && matching.substring) {
    const index = sentence.indexOf(matching.substring);
    if (index !== -1) {
      return {
        text: matching.substring,
        position: index,
        confidence: 'low'
      };
    }
  }

  // Try multiple possible forms
  if (matching && matching.forms) {
    for (const form of matching.forms) {
      const index = sentence.indexOf(form);
      if (index !== -1) {
        return {
          text: form,
          position: index,
          confidence: 'low'
        };
      }
    }
  }

  return null;
}

/**
 * Analyze sentence for grammar patterns
 */
async function analyzeSentence(sentence) {
  // Load grammar database and settings
  const db = await loadGrammarDatabase();
  const settings = await loadUserSettings();

  // Initialize tokenizer if needed (for POS-based matching)
  let tokens = null;
  try {
    console.log('[Analysis] Initializing tokenizer...');
    const tok = await initializeTokenizer();
    console.log('[Analysis] Step 3/3: Tokenizing sentence...');
    tokens = tok.tokenize(sentence);
    console.log('[Analysis] ✓ Tokenized:', tokens.map(t => `${t.surface_form}(${t.pos})`).join(' '));
  } catch (error) {
    console.warn('[Analysis] ⚠ Tokenizer unavailable, using regex-only matching:', error);
  }

  const detectedPatterns = [];

  // Iterate through grammar patterns
  for (const pattern of db.patterns) {
    // Check if this JLPT level is enabled
    const level = pattern.level.toLowerCase();
    if (!settings.levels[level]) {
      continue;
    }

    // Check if register filter is enabled (if pattern has register)
    if (pattern.register) {
      const register = pattern.register.toLowerCase();
      if (settings.registers && !settings.registers[register]) {
        continue;
      }
    }

    // Route to appropriate matching strategy
    let matches = null;
    const strategy = pattern.matchingStrategy || 'regex';

    if (strategy === 'pos-based' && tokens) {
      // Use POS-based matching for particles and context-sensitive patterns
      matches = matchWithPOS(tokens, pattern);
    } else {
      // Use regex/substring matching for other patterns
      matches = matchWithRegex(sentence, pattern);
    }

    if (matches) {
      detectedPatterns.push({
        id: pattern.id,
        pattern: pattern.pattern,
        level: pattern.level,
        register: pattern.register,
        meaning: pattern.meaning,
        explanation: pattern.explanation,
        formation: pattern.formation,
        matchedText: matches.text,
        position: matches.position
      });
    }
  }

  // Sort by position in sentence (earlier patterns first)
  detectedPatterns.sort((a, b) => {
    if (a.position && b.position) {
      return a.position - b.position;
    }
    return 0;
  });

  return detectedPatterns;
}


/**
 * Handle messages from content script
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeSentence') {
    console.log('Analyzing sentence:', request.sentence);

    analyzeSentence(request.sentence)
      .then(grammarPoints => {
        console.log('Found grammar points:', grammarPoints.length);
        sendResponse({
          success: true,
          grammarPoints: grammarPoints
        });
      })
      .catch(error => {
        console.error('Error analyzing sentence:', error);
        sendResponse({
          success: false,
          error: error.message
        });
      });

    // Return true to indicate we'll send response asynchronously
    return true;
  }

  if (request.action === 'getSettings') {
    loadUserSettings()
      .then(settings => {
        sendResponse({
          success: true,
          settings: settings
        });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error.message
        });
      });

    return true;
  }

  if (request.action === 'saveSettings') {
    const settingsToSave = {};
    if (request.enabledLevels) {
      settingsToSave.enabledLevels = request.enabledLevels;
    }
    if (request.enabledRegisters) {
      settingsToSave.enabledRegisters = request.enabledRegisters;
    }
    
    chrome.storage.sync.set(settingsToSave)
      .then(() => {
        if (request.enabledLevels) {
          if (!userSettings) userSettings = {};
          userSettings.levels = request.enabledLevels;
        }
        if (request.enabledRegisters) {
          if (!userSettings) userSettings = {};
          userSettings.registers = request.enabledRegisters;
        }
        sendResponse({
          success: true
        });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error.message
        });
      });

    return true;
  }
});

// Initialize on installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Bunpochan installed:', details.reason);

  // Initialize default settings
  chrome.storage.sync.get(['enabledLevels', 'enabledRegisters'], (result) => {
    if (!result.enabledLevels) {
      chrome.storage.sync.set({
        enabledLevels: {
          n5: true,
          n4: true,
          n3: true,
          n2: true,
          n1: true,
          common: true
        }
      });
    }
    if (!result.enabledRegisters) {
      chrome.storage.sync.set({
        enabledRegisters: {
          casual: true,
          written: true,
          spoken: true,
          neutral: true
        }
      });
    }
  });
});
