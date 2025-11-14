// Bunpochan Settings Page Script

// DOM elements
const toggleN5 = document.getElementById('toggle-n5');
const toggleN4 = document.getElementById('toggle-n4');
const toggleN3 = document.getElementById('toggle-n3');
const toggleN2 = document.getElementById('toggle-n2');
const toggleN1 = document.getElementById('toggle-n1');
const toggleCommon = document.getElementById('toggle-common');
const toggleCasual = document.getElementById('toggle-casual');
const toggleWritten = document.getElementById('toggle-written');
const toggleNeutral = document.getElementById('toggle-neutral');
const saveStatus = document.getElementById('save-status');

/**
 * Load settings from storage
 */
async function loadSettings() {
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
        neutral: true
      }
    });

    const levels = result.enabledLevels;
    const registers = result.enabledRegisters;

    toggleN5.checked = levels.n5;
    toggleN4.checked = levels.n4;
    toggleN3.checked = levels.n3;
    toggleN2.checked = levels.n2;
    toggleN1.checked = levels.n1;
    toggleCommon.checked = levels.common;

    toggleCasual.checked = registers.casual;
    toggleWritten.checked = registers.written;
    toggleNeutral.checked = registers.neutral;

    console.log('Settings loaded:', { levels, registers });
  } catch (error) {
    console.error('Error loading settings:', error);
    showStatus('Error loading settings', 'error');
  }
}

/**
 * Save settings to storage
 */
async function saveSettings() {
  const enabledLevels = {
    n5: toggleN5.checked,
    n4: toggleN4.checked,
    n3: toggleN3.checked,
    n2: toggleN2.checked,
    n1: toggleN1.checked,
    common: toggleCommon.checked
  };

  const enabledRegisters = {
    casual: toggleCasual.checked,
    written: toggleWritten.checked,
    neutral: toggleNeutral.checked
  };
  try {
    await chrome.storage.sync.set({ enabledLevels, enabledRegisters });
    console.log('Settings saved:', { enabledLevels, enabledRegisters });
    showStatus('Settings saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving settings:', error);
    showStatus('Error saving settings', 'error');
  }
}

/**
 * Show save status message
 */
function showStatus(message, type) {
  saveStatus.textContent = message;
  saveStatus.className = `save-status show ${type}`;

  setTimeout(() => {
    saveStatus.classList.remove('show');
  }, 3000);
}

/**
 * Add event listeners
 */
function initializeEventListeners() {
  // Save settings when any toggle changes
  [toggleN5, toggleN4, toggleN3, toggleN2, toggleN1, toggleCommon].forEach(toggle => {
    toggle.addEventListener('change', saveSettings);
  });

  [toggleCasual, toggleWritten, toggleNeutral].forEach(toggle => {
    toggle.addEventListener('change', saveSettings);
  });
}

/**
 * Initialize settings page
 */
async function initialize() {
  console.log('Bunpochan settings page initialized');
  await loadSettings();
  initializeEventListeners();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
