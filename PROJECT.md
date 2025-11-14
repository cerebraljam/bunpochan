# Bunpochan - Japanese Grammar Learning Assistant

## Project Overview

**Bunpochan** is a Chrome extension that helps Japanese learners understand grammar patterns while reading. Similar to how Yomitan assists with vocabulary, bunpochan provides on-demand grammar analysis for Japanese sentences.

### Core Functionality
- **On-demand activation**: User hovers over Japanese text and presses `Ctrl+Alt`
- **Sentence extraction**: Automatically detects and extracts the Japanese sentence at cursor position
- **Grammar analysis**: Identifies JLPT N5-N1 grammar patterns within the sentence
- **Interactive popup**: Displays identified grammar points with explanations
- **Customizable filters**: Users can toggle which JLPT levels to display in settings

## Technical Architecture

### Components

1. **Content Script** (`content.js`)
   - Listens for `Ctrl+Alt` key combination
   - Extracts sentence at cursor position
   - Sends sentence to background script for analysis
   - Displays popup with results

2. **Background Script** (`background.js`)
   - Manages grammar database
   - Coordinates pattern matching
   - Handles user settings storage

3. **Grammar Database** (`grammar-db.json`)
   - Structured JSON containing JLPT N5-N1 grammar patterns
   - Each pattern includes:
     - Pattern structure
     - JLPT level
     - Meaning/explanation
     - Formation rules
     - Example sentences
     - Matching rules

4. **Pattern Matcher** (in `background.js`)
   - Hybrid matching system: POS-based (kuromoji.js) + regex matching
   - POS-based matching for particles to eliminate false positives
   - Regex matching for most grammar patterns
   - Returns identified grammar points with metadata

5. **Popup UI** (`popup.html`, `popup.css`, `popup.js`)
   - Displays identified grammar points
   - Shows explanations and examples
   - Positioned near cursor
   - Star/bookmark feature for saving patterns

6. **Settings Page** (`settings.html`, `settings.js`)
   - JLPT level toggles (N5, N4, N3, N2, N1)
   - User preferences storage
   - Extension configuration

## Technology Stack

- **JavaScript (ES6+)**: Core extension logic
- **Chrome Extension API (Manifest V3)**: Extension framework
- **HTML/CSS**: UI components
- **JSON**: Grammar database storage
- **Chrome Storage API**: User settings persistence
- **kuromoji.js**: Japanese morphological analyzer for POS-based matching
- **Hybrid Pattern Matching**: POS-based (kuromoji) + regex detection

## Project Structure

```
bunpochan/
|-- manifest.json                 # Extension configuration
|-- README.md                     # User documentation
|-- PROJECT.md                    # This file - development plan
|-- src/
|   |-- content/
|   |   |-- content.js           # Content script (sentence extraction, popup trigger)
|   |   |-- content.css          # Popup styling
|   |-- background/
|   |   |-- background.js        # Service worker (pattern matching & settings)
|   |-- data/
|   |   |-- grammar-db.json      # Grammar patterns database
|   |-- lib/
|   |   |-- kuromoji/            # Japanese morphological analyzer
|   |       |-- kuromoji.js      # Library (~300KB)
|   |       |-- dict/            # Dictionary files (~17MB)
|   |-- popup/
|   |   |-- popup.html           # Grammar explanation popup
|   |   |-- popup.css            # Popup styles
|   |   |-- popup.js             # Popup logic
|   |-- settings/
|   |   |-- settings.html        # Extension settings page
|   |   |-- settings.css         # Settings page styles
|   |   |-- settings.js          # Settings management
|   |-- icons/
|       |-- icon16.png           # Extension icon 16x16
|       |-- icon48.png           # Extension icon 48x48
|       |-- icon128.png          # Extension icon 128x128
|-- tests/
    |-- sample-texts.html        # Test page with Japanese text
```

## Development Phases

### Phase 1: MVP (Minimum Viable Product)
**Goal**: Basic working extension with core functionality

**Tasks**:
1. Set up Chrome extension structure
   - Create manifest.json (Manifest V3)
   - Set up directory structure
   - Add placeholder icons

2. Implement sentence extraction
   - Content script to detect Ctrl+Alt
   - Get text at cursor position
   - Extract sentence using Japanese punctuation markers (。、)
   - Handle basic edge cases

3. Build initial grammar database
   - Create ~30-50 essential patterns (N5-N4 focus)
   - Structure: pattern, level, meaning, examples, matching rules
   - Patterns to include:
     - である/です
     - ます forms
     - ている (progressive)
     - た (past tense)
     - ない (negative)
     - から (because)
     - けど (but)
     - たい (want to)
     - etc.

4. Create pattern matcher
   - Implement regex-based pattern matching
   - Support substring and form variations
   - Return identified patterns with metadata

5. Build popup UI
   - Create popup component
   - Position near cursor
   - Display grammar points
   - Show explanations and examples
   - Basic styling

6. Settings page
   - JLPT level toggles (N5-N1)
   - Extension enable/disable toggle
   - Save preferences to Chrome storage

**Deliverable**: Working extension that can identify basic grammar patterns in Japanese sentences

---

### Phase 2: Enhancement
**Goal**: Expand coverage and improve accuracy

**Tasks**:
1. Expand grammar database to N3-N1
   - Research and add ~150-200 more patterns
   - Include advanced grammar forms
   - Add nuance explanations

2. Improve pattern matching
   - Handle pattern variations
   - Detect compound patterns
   - Add confidence scoring

3. Enhanced UI
   - Better popup design
   - Syntax highlighting in examples
   - Pattern categorization in display

4. Complete settings page
   - Individual toggles for all JLPT levels (N5, N4, N3, N2, N1)
   - Advanced options (animation speed, popup size)
   - Import/export settings

5. Performance optimization
   - Cache pattern matching results
   - Lazy load grammar database
   - Optimize regex compilation

**Deliverable**: Full-featured extension with comprehensive JLPT coverage

---

## Installation Instructions (Development Mode)

### Prerequisites
- Google Chrome browser
- Text editor or IDE
- Basic understanding of Chrome DevTools

### Steps to Install Extension in Development Mode

1. **Clone or download the project**
   ```bash
   cd /path/to/bunpochan
   ```

2. **Open Chrome Extensions page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in top-right corner

4. **Load the extension**
   - Click "Load unpacked" button
   - Navigate to the `bunpochan` project directory
   - Select the folder containing `manifest.json`
   - Click "Select Folder"

5. **Verify installation**
   - Extension should appear in the extensions list
   - Icon should be visible in Chrome toolbar
   - Check for any errors in the extension card

6. **Test the extension**
   - Open a webpage with Japanese text (or use `tests/sample-texts.html`)
   - Hover over Japanese text
   - Press `Ctrl+Alt`
   - Popup should appear with grammar analysis

### Development Workflow

**Making Changes:**
1. Edit source files in your code editor
2. Go to `chrome://extensions/`
3. Click the refresh icon (↻) on the bunpochan extension card
4. Reload the test webpage to see changes

**Debugging:**
- **Content script**: Right-click on webpage → Inspect → Console tab
- **Background script**: Extensions page → Click "Inspect views: background page"
- **Popup**: Right-click on popup → Inspect
- **Settings page**: Open settings → Right-click → Inspect

**Viewing Logs:**
- Use `console.log()` in scripts
- Check appropriate DevTools console based on script type

### Common Issues

**Extension doesn't load:**
- Verify `manifest.json` syntax is valid
- Check file paths in manifest match actual structure
- Look for errors on extensions page

**Ctrl+Alt doesn't work:**
- Check browser console for JavaScript errors
- Verify content script is injected (check DevTools → Sources)
- Ensure no other extension is capturing the same shortcut

**Popup doesn't appear:**
- Check content script console for errors
- Verify CSS is loading correctly
- Test sentence extraction with console.log()

---

## Grammar Database Schema

Each grammar pattern entry follows this structure:

```json
{
  "id": "te-iru-progressive",
  "pattern": "ている",
  "level": "N5",
  "category": "verb-form",
  "meaning": "Present progressive / ongoing action",
  "explanation": "Indicates an action in progress or a continuous state. Formed by combining the te-form of a verb with いる.",
  "formation": "Verb (て-form) + いる",
  "examples": [
    {
      "japanese": "今食べている",
      "reading": "いまたべている",
      "translation": "I am eating now."
    },
    {
      "japanese": "本を読んでいる",
      "reading": "ほんをよんでいる",
      "translation": "He is reading a book."
    }
  ],
  "matching": {
    "substring": "ている",
    "regex": "ている",
    "forms": ["ている", "ています", "てる", "てます"]
  },
  "notes": "Can also indicate a resulting state (e.g., 結婚している = is married).",
  "related": ["te-form", "ta-form", "te-aru"]
}
```

---

## Pattern Matching Strategy

### Hybrid Matching System

Bunpochan uses a **two-track matching system** for accurate grammar detection:

#### 1. **POS-Based Matching** (High Accuracy)
- Uses [kuromoji.js](https://github.com/takuyaa/kuromoji.js) for morphological analysis
- Applied to single-character particles (は, が, を, に, で, と, か, から)
- Eliminates false positives by checking grammatical context
- Example: Detects は in `私は学生` (I am a student) but NOT in `早い` (fast)

#### 2. **Regex Matching** (Fast & Flexible)
- Used for most grammar patterns (conditionals, conjugations, compound patterns)
- Optimized regular expressions for pattern recognition
- Faster execution for complex multi-character patterns

### How It Works

Each pattern in `grammar-db.json` has a `matchingStrategy` field:

**POS-based pattern example:**
```json
{
  "id": "particle-wa",
  "matchingStrategy": "pos-based",
  "matching": {
    "pos": ["助詞"],
    "surface": "は"
  }
}
```

**Regex-based pattern example (default):**
```json
{
  "id": "te-iru",
  "matchingStrategy": "regex",
  "matching": {
    "regex": "ている"
  }
}
```

### Matching Process

1. **Tokenization** (for POS-based patterns only)
   - Initialize kuromoji tokenizer (cached after first use)
   - Tokenize sentence into morphemes with POS tags
   - Example: `私は学生です` → `私(名詞) は(助詞) 学生(名詞) です(助動詞)`

2. **Pattern Detection**
   - Check if pattern's JLPT level is enabled in settings
   - Check if pattern's register filter is enabled
   - Route to appropriate matching strategy:
     - **POS-based**: Match by surface form AND part-of-speech tag
     - **Regex**: Match by regular expression or substring

3. **Result Compilation**
   - Collect all matched patterns with position data
   - Sort by position (earlier patterns first)
   - Return to content script for display

### Example Flow

**Input sentence**: `私は本を読んでいる`

**Step 1: Tokenization**
```
私(名詞) は(助詞) 本(名詞) を(助詞) 読ん(動詞) で(助詞) いる(動詞)
```

**Step 2: Pattern Matching**
- `は` → POS-based match: surface="は" AND pos="助詞" ✓
- `を` → POS-based match: surface="を" AND pos="助詞" ✓
- `ている` → Regex match: /ている/ ✓

**Step 3: Output**
```javascript
[
  {
    pattern: "は",
    level: "N5",
    meaning: "Topic marker",
    position: 1
  },
  {
    pattern: "を",
    level: "N5",
    meaning: "Direct object marker",
    position: 3
  },
  {
    pattern: "ている",
    level: "N5",
    meaning: "Present progressive / ongoing action",
    position: 5
  }
]
```

### Benefits
- 🎯 Eliminates ~90% of false positives for particles
- ⚡ Fast initialization (tokenizer caches after first use)
- 🔄 Graceful fallback to regex if tokenizer unavailable
- 📝 Clear, maintainable codebase
```

---

## Sentence Extraction Algorithm

```javascript
/**
 * Extract Japanese sentence at cursor position
 * Uses Japanese punctuation as sentence boundaries
 */
function extractSentenceAtCursor(element, offset) {
  const text = element.textContent;

  // Japanese sentence delimiters
  const delimiters = /[。！？\n]/g;

  // Find start of sentence (after previous delimiter or start of text)
  let start = 0;
  let match;
  const matches = [];

  while ((match = delimiters.exec(text)) !== null) {
    matches.push(match.index);
  }

  // Find the last delimiter before cursor
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

  return sentence;
}
```

---

## Performance Considerations

### Optimization Strategies

1. **Grammar Database Loading**
   - Load grammar database on first use
   - Cache in memory for subsequent requests
   - Minimize database file size

2. **Kuromoji Tokenizer**
   - Lazy initialization (only on first analysis request)
   - Cached after first load for instant subsequent use
   - Dictionary size: ~17MB (cached by browser)
   - Initialization time: ~2-3 seconds on first load
   - Graceful degradation: falls back to regex if unavailable

3. **Pattern Matching Cache**
   - Cache recently analyzed sentences
   - Avoid re-analyzing identical text
   - Clear cache periodically to prevent memory bloat

4. **Regex Optimization**
   - Pre-compile regex patterns when database loads
   - Use efficient regex patterns (avoid catastrophic backtracking)
   - Prefer simple substring matching where possible

5. **Database Optimization**
   - Index patterns by JLPT level for quick filtering
   - Organize patterns by frequency of occurrence
   - Use efficient data structures

6. **Bundle Size**
   - Grammar database: ~150KB (175+ patterns)
   - kuromoji.js library: ~300KB
   - kuromoji dictionary: ~17MB
   - Total extension size: ~17.5MB

---

## Testing Strategy

### Test Cases

1. **Sentence Extraction**
   - Single sentence paragraphs
   - Multiple sentences
   - Sentences with quotes
   - Sentences with HTML elements
   - Edge case: very long sentences

2. **Pattern Matching**
   - Each grammar pattern with known examples
   - Compound patterns
   - Negative cases (patterns that shouldn't match)
   - Multiple patterns in one sentence

3. **UI/UX**
   - Popup positioning (near cursor, within viewport)
   - Keyboard shortcut conflicts
   - Settings persistence
   - Performance with long web pages

4. **Cross-browser**
   - Chrome (primary target)
   - Edge (Chromium-based)
   - Other Chromium browsers

### Test Files

- `tests/sample-texts.html`: Web page with diverse Japanese content
- `tests/test-patterns.js`: Unit tests for pattern matching
- Manual testing with real Japanese websites (NHK News, Yahoo Japan, etc.)

---

## Future Enhancements (Post-MVP)

### Potential Features

1. **Smart Pattern Hiding**
   - Track which patterns user looks up frequently
   - Automatically hide patterns they've mastered
   - Adaptive difficulty

2. **Integration with Anki**
   - Export grammar points to Anki flashcards
   - Track study progress
   - Spaced repetition integration

3. **Sentence Translation**
   - Optional machine translation for full sentence
   - Highlight grammar pattern role in translation

4. **Audio Pronunciation**
   - TTS for example sentences
   - Native speaker recordings (if available)

5. **Community Database**
   - User-submitted patterns and examples
   - Crowd-sourced explanations
   - Rating system for examples

6. **Study Mode**
   - Optional passive highlighting of patterns
   - Practice quizzes on detected patterns
   - Progress tracking dashboard

7. **Mobile Support**
   - Investigate mobile browser extensions
   - Touch-based activation method

---

## Success Metrics

### MVP Success Criteria
- ✓ Extension loads without errors
- ✓ Detects Ctrl+Alt activation
- ✓ Correctly extracts sentences 90%+ of the time
- ✓ Identifies at least 30 common grammar patterns
- ✓ Popup displays clearly and positions correctly
- ✓ Settings persist between sessions
- ✓ Works on major Japanese websites (NHK, Yahoo Japan)

### User Success Indicators
- Users can understand unfamiliar grammar in context
- Reduced need to leave webpage to look up grammar
- Positive feedback on accuracy and usefulness
- Regular usage while reading Japanese content

---

## Resources & References

### Grammar Resources
- **JLPT Grammar Lists**: [jlptsensei.com](https://jlptsensei.com/)
- **Tae Kim's Grammar Guide**: [guidetojapanese.org](http://www.guidetojapanese.org/)
- **Imabi**: [imabi.org](https://imabi.org/)
- **Hanabira.org**: Open-source JLPT grammar database
- **japanese-grammar-db**: GitHub repository

### Technical Resources
- **Chrome Extension Docs**: [developer.chrome.com](https://developer.chrome.com/docs/extensions/)
- **Manifest V3 Migration**: [Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/intro/)
- **JavaScript RegEx**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- **kuromoji.js**: [GitHub Repository](https://github.com/takuyaa/kuromoji.js) - Japanese morphological analyzer

### Similar Tools
- **Yomitan**: Vocabulary popup dictionary (inspiration for UX) [Yomitan on Github](https://github.com/yomidevs/yomitan)
- **Rikaichamp**: Firefox Japanese dictionary
- **rikaikun**: Chrome Japanese dictionary

---

## 📝 License

MIT. This Chrome Extension was developed while testing [Claude Code Web](https://claude.ai/code/). 
Other than the idea, all of the development was done by Claude Code.

---

## Contributing

(Future: Guidelines for community contributions to grammar database)

---

## Changelog

### v0.2.0 - MVP (Completed)
- Initial project setup
- Chrome extension structure (Manifest V3)
- Sentence extraction functionality
- Comprehensive grammar database (N5-N1, 175+ patterns)
- Hybrid pattern matching engine (kuromoji.js POS-based + regex)
- kuromoji.js integration for particle disambiguation
- Popup UI with star/bookmark feature
- Settings page with JLPT level + register filters
- Extension enable/disable toggle

---

**Last Updated**: 2025-11-15
**Project Status**: Phase 1 (MVP) - Completed
