// Bunpochan Content Script
// Handles Ctrl+Shift detection, sentence extraction, and popup display

let isCtrlShiftPressed = false;
let currentPopup = null;

// Initialize content script
console.log('Bunpochan content script loaded');

/**
 * Extract Japanese sentence at cursor position
 * Uses Japanese punctuation as sentence boundaries
 */
function extractSentenceAtCursor(x, y) {
  // Get the element at cursor position
  const element = document.elementFromPoint(x, y);
  if (!element) return null;

  // Get the text node at the cursor position
  const range = document.caretRangeFromPoint(x, y);
  if (!range) return null;

  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return null;

  const text = node.textContent;
  const offset = range.startOffset;

  // Japanese sentence delimiters
  const delimiters = /[。！？\n]/g;

  // Find all delimiter positions
  const matches = [];
  let match;
  while ((match = delimiters.exec(text)) !== null) {
    matches.push(match.index);
  }

  // Find start of sentence (after previous delimiter or start of text)
  let start = 0;
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i] < offset) {
      start = matches[i] + 1;
      break;
    }
  }

  // Find end of sentence (next delimiter or end of text)
  let end = text.length;
  for (let i = 0; i < matches.length; i++) {
    if (matches[i] >= offset) {
      end = matches[i] + 1;
      break;
    }
  }

  // Extract and clean sentence
  const sentence = text.slice(start, end).trim();

  // Check if sentence contains Japanese characters
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(sentence);

  if (!hasJapanese || sentence.length === 0) {
    return null;
  }

  return {
    text: sentence,
    element: element,
    x: x,
    y: y
  };
}

/**
 * Create and display popup with grammar analysis
 */
function showPopup(x, y, grammarPoints) {
  // Remove existing popup
  removePopup();

  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'bunpochan-popup';
  popup.className = 'bunpochan-popup';

  // Create popup content
  let content = '<div class="bunpochan-header">文法ちゃん</div>';

  if (grammarPoints.length === 0) {
    content += '<div class="bunpochan-no-results">No grammar patterns detected in this sentence.</div>';
  } else {
    content += '<div class="bunpochan-results">';
    grammarPoints.forEach((point, index) => {
      content += `
        <div class="grammar-point">
          <div class="pattern-title">${point.pattern} <span class="level-badge">${point.level}</span></div>
          <div class="pattern-meaning">${point.meaning}</div>
          ${point.explanation ? `<div class="pattern-explanation">${point.explanation}</div>` : ''}
          ${point.formation ? `<div class="pattern-formation"><strong>Formation:</strong> ${point.formation}</div>` : ''}
        </div>
      `;
    });
    content += '</div>';
  }

  popup.innerHTML = content;

  // Position popup near cursor
  document.body.appendChild(popup);

  // Adjust position to keep popup in viewport
  const rect = popup.getBoundingClientRect();
  let popupX = x + 10;
  let popupY = y + 10;

  // Adjust horizontal position
  if (popupX + rect.width > window.innerWidth) {
    popupX = window.innerWidth - rect.width - 10;
  }

  // Adjust vertical position
  if (popupY + rect.height > window.innerHeight) {
    popupY = y - rect.height - 10;
  }

  // Ensure popup doesn't go off-screen left/top
  popupX = Math.max(10, popupX);
  popupY = Math.max(10, popupY);

  popup.style.left = `${popupX}px`;
  popup.style.top = `${popupY}px`;

  currentPopup = popup;

  // Add click outside handler to close popup
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);
}

/**
 * Remove popup from DOM
 */
function removePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
    document.removeEventListener('click', handleOutsideClick);
  }
}

/**
 * Handle clicks outside popup to close it
 */
function handleOutsideClick(e) {
  if (currentPopup && !currentPopup.contains(e.target)) {
    removePopup();
  }
}

/**
 * Show loading indicator
 */
function showLoading(x, y) {
  removePopup();

  const popup = document.createElement('div');
  popup.id = 'bunpochan-popup';
  popup.className = 'bunpochan-popup bunpochan-loading';
  popup.innerHTML = '<div class="bunpochan-header">文法ちゃん</div><div class="loading-text">Analyzing...</div>';

  document.body.appendChild(popup);

  // Position popup
  popup.style.left = `${x + 10}px`;
  popup.style.top = `${y + 10}px`;

  currentPopup = popup;
}

/**
 * Handle keydown events for Ctrl+Shift detection
 */
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('keydown', async (e) => {
  // Check for Ctrl+Shift (both keys pressed)
  if (e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey) {
    // Prevent default behavior
    e.preventDefault();

    // Extract sentence at cursor
    const sentenceData = extractSentenceAtCursor(mouseX, mouseY);

    if (!sentenceData) {
      console.log('No Japanese sentence found at cursor');
      return;
    }

    console.log('Extracted sentence:', sentenceData.text);

    // Show loading indicator
    showLoading(mouseX, mouseY);

    try {
      // Send sentence to background script for analysis
      const response = await chrome.runtime.sendMessage({
        action: 'analyzeSentence',
        sentence: sentenceData.text
      });

      if (response && response.success) {
        // Display results in popup
        showPopup(mouseX, mouseY, response.grammarPoints);
      } else {
        // Show error
        showPopup(mouseX, mouseY, []);
      }
    } catch (error) {
      console.error('Error analyzing sentence:', error);
      showPopup(mouseX, mouseY, []);
    }
  }
});

// Handle Escape key to close popup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentPopup) {
    removePopup();
  }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  removePopup();
});
