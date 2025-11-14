// Bunpochan Background Service Worker
// Coordinates grammar analysis and manages extension state

console.log('Bunpochan background service worker loaded');

// Grammar database cache
let grammarDatabase = null;
let userSettings = null;

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
        n1: true
      }
    });
    userSettings = result.enabledLevels;
    return userSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      n5: true,
      n4: true,
      n3: true,
      n2: true,
      n1: true
    };
  }
}

/**
 * Analyze sentence for grammar patterns
 */
async function analyzeSentence(sentence) {
  // Load grammar database and settings
  const db = await loadGrammarDatabase();
  const settings = await loadUserSettings();

  const detectedPatterns = [];

  // Iterate through grammar patterns
  for (const pattern of db.patterns) {
    // Check if this JLPT level is enabled
    const level = pattern.level.toLowerCase();
    if (!settings[level]) {
      continue;
    }

    // Try to match pattern
    const matches = matchPattern(sentence, pattern);
    if (matches) {
      detectedPatterns.push({
        pattern: pattern.pattern,
        level: pattern.level,
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
 * Match a grammar pattern against sentence
 */
function matchPattern(sentence, pattern) {
  // Get matching rules
  const matching = pattern.matching;

  // Try regex matching if available
  if (matching && matching.regex) {
    try {
      const regex = new RegExp(matching.regex, 'g');
      const match = regex.exec(sentence);

      if (match) {
        return {
          text: match[0],
          position: match.index
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
        position: index
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
          position: index
        };
      }
    }
  }

  return null;
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
    chrome.storage.sync.set({ enabledLevels: request.settings })
      .then(() => {
        userSettings = request.settings;
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
  chrome.storage.sync.get('enabledLevels', (result) => {
    if (!result.enabledLevels) {
      chrome.storage.sync.set({
        enabledLevels: {
          n5: true,
          n4: true,
          n3: true,
          n2: true,
          n1: true
        }
      });
    }
  });
});
