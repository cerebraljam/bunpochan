// Bunpochan Toolbar Popup Script

// Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.dataset.tab;

    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show target tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(`${targetTab}-tab`).style.display = 'block';
  });
});

// Load starred patterns
async function loadStarredPatterns() {
  try {
    const result = await chrome.storage.sync.get({ starredPatterns: {} });
    const starredPatterns = result.starredPatterns;

    const container = document.getElementById('starred-patterns-container');
    const emptyState = document.getElementById('empty-state');

    if (Object.keys(starredPatterns).length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = '';

    // Display each starred pattern
    Object.entries(starredPatterns).forEach(([patternId, data]) => {
      const patternEl = createStarredPatternElement(patternId, data);
      container.appendChild(patternEl);
    });
  } catch (error) {
    console.error('Error loading starred patterns:', error);
    document.getElementById('starred-patterns-container').innerHTML =
      '<div class="loading">Error loading starred patterns</div>';
  }
}

function createStarredPatternElement(patternId, data) {
  const el = document.createElement('div');
  el.className = 'starred-pattern';

  const levelClass = data.level ? data.level.toLowerCase() : 'n5';

  let examplesHTML = '';
  if (data.examples && data.examples.length > 0) {
    const examples = data.examples.slice(0, 5); // Show max 5 examples
    examplesHTML = `
      <div class="example-sentences">
        <div class="example-sentences-title">Example sentences (${examples.length}):</div>
        ${examples.map(ex => `<div class="example-sentence">${escapeHtml(ex)}</div>`).join('')}
      </div>
    `;
  }

  el.innerHTML = `
    <div class="pattern-header">
      <div>
        <span class="pattern-name">${escapeHtml(data.pattern)}</span>
        <span class="level-badge ${levelClass}">${data.level || 'N5'}</span>
      </div>
      <button class="unstar-button" data-pattern-id="${escapeHtml(patternId)}" title="Unstar this pattern">★</button>
    </div>
    <div class="pattern-meaning">${escapeHtml(data.meaning)}</div>
    ${examplesHTML}
  `;

  // Add unstar functionality
  el.querySelector('.unstar-button').addEventListener('click', async (e) => {
    const patternId = e.target.dataset.patternId;
    await unstarPattern(patternId);
    await loadStarredPatterns();
  });

  return el;
}

async function unstarPattern(patternId) {
  try {
    const result = await chrome.storage.sync.get({ starredPatterns: {} });
    const starredPatterns = result.starredPatterns;
    delete starredPatterns[patternId];
    await chrome.storage.sync.set({ starredPatterns });
  } catch (error) {
    console.error('Error unstarring pattern:', error);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load settings
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get({
      extensionEnabled: true,
      enabledLevels: {
        n5: true,
        n4: true,
        n3: true,
        n2: true,
        n1: true
      }
    });

    const levels = result.enabledLevels;
    const enabled = result.extensionEnabled;

    // Set extension enabled toggle
    document.getElementById('extension-enabled').checked = enabled;
    updateExtensionStatus(enabled);

    // Set JLPT level toggles
    document.getElementById('toggle-n5').checked = levels.n5;
    document.getElementById('toggle-n4').checked = levels.n4;
    document.getElementById('toggle-n3').checked = levels.n3;
    document.getElementById('toggle-n2').checked = levels.n2;
    document.getElementById('toggle-n1').checked = levels.n1;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Save settings
async function saveSettings() {
  const enabledLevels = {
    n5: document.getElementById('toggle-n5').checked,
    n4: document.getElementById('toggle-n4').checked,
    n3: document.getElementById('toggle-n3').checked,
    n2: document.getElementById('toggle-n2').checked,
    n1: document.getElementById('toggle-n1').checked
  };

  try {
    await chrome.storage.sync.set({ enabledLevels });
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Update extension status display
function updateExtensionStatus(enabled) {
  const statusText = document.getElementById('status-text');
  if (enabled) {
    statusText.textContent = 'Enabled';
    statusText.classList.remove('disabled');
  } else {
    statusText.textContent = 'Disabled';
    statusText.classList.add('disabled');
  }
}

// Toggle extension enabled/disabled
async function toggleExtension(enabled) {
  try {
    await chrome.storage.sync.set({ extensionEnabled: enabled });
    updateExtensionStatus(enabled);
    console.log('Extension', enabled ? 'enabled' : 'disabled');
  } catch (error) {
    console.error('Error toggling extension:', error);
  }
}

// Add event listeners
document.getElementById('extension-enabled').addEventListener('change', (e) => {
  toggleExtension(e.target.checked);
});

document.querySelectorAll('.level-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', saveSettings);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
  await loadStarredPatterns();
  await loadSettings();
});
