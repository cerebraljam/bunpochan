# 文法ちゃん (Bunpochan) - Japanese Grammar Assistant

A Chrome extension that helps Japanese learners understand grammar patterns while reading. Get instant grammar explanations with a simple keyboard shortcut!

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![JLPT](https://img.shields.io/badge/JLPT-N5%20%7C%20N4-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🌟 Features

- **On-demand Grammar Analysis**: Press `Ctrl+Shift` while hovering over Japanese text to see grammar patterns
- **JLPT-Based Patterns**: Covers N5 and N4 grammar patterns (50+ patterns included)
- **Customizable Levels**: Toggle which JLPT levels to display in settings
- **Non-intrusive**: Only activates when you need it, like Yomitan for vocabulary
- **Beautiful Popup**: Clean, easy-to-read explanations with examples
- **Fast & Lightweight**: Pattern-based matching for instant results

## 📦 Installation (Development Mode)

Since this is currently in development, you'll need to install it manually:

### Step 1: Download the Extension

Clone or download this repository to your local machine:

```bash
git clone <repository-url>
cd bunpochan
```

### Step 2: Open Chrome Extensions Page

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Or use menu: **⋮ Menu** → **More Tools** → **Extensions**

### Step 3: Enable Developer Mode

Toggle the **Developer mode** switch in the top-right corner of the extensions page.

### Step 4: Load the Extension

1. Click the **Load unpacked** button
2. Navigate to the `bunpochan` directory
3. Select the folder (the one containing `manifest.json`)
4. Click **Select Folder**

### Step 5: Verify Installation

- The extension should appear in your extensions list
- You should see the bunpochan icon in your Chrome toolbar
- No errors should be displayed on the extension card

## 🚀 Usage

### Basic Usage

1. **Navigate to a webpage with Japanese text** (or use the included test page: `tests/sample-texts.html`)

2. **Hover your mouse over a Japanese sentence**

3. **Press `Ctrl+Shift` together**

4. **A popup appears** showing all grammar patterns detected in that sentence!

### Example

When you hover over: `私は日本語を勉強しています。`

And press `Ctrl+Shift`, you'll see:
- **～を** (N5) - Direct object marker
- **～ています** (N5) - Present progressive (polite)

### Settings

Click the extension icon in the Chrome toolbar to open settings:

- **Toggle JLPT Levels**: Enable/disable N5, N4, N3, N2, N1 patterns
- **Customize Your Experience**: Hide patterns you've already mastered

## 📚 Grammar Database

The current version (0.1.0) includes **50+ grammar patterns** covering:

### N5 Patterns (26 patterns)
- Copula: です、だ
- Polite forms: ます、ません、ました、ませんでした
- Progressive: ～ている、～ています
- Desire: ～たい
- Negative: ～ない、～なかった
- Particles: は、が、を、に、で、と、か
- Conjunctions: ～から、～けど、～が
- Requests: ～てください
- Permission: ～てもいい
- Prohibition: ～てはいけない
- Ability: ～ことができる

### N4 Patterns (24 patterns)
- Desire (3rd person): ～たがる
- Reason: ～ので
- Conditionals: ～たら、～ば、～と、～なら
- Obligation: ～なくてはいけない、～なければならない
- Change: ～ようになる
- Effort: ～ようにする
- Intention: ～つもり
- Plan: ～予定
- Expectation: ～はず
- Hearsay: ～そうだ
- Appearance: ～そう、～みたい、～らしい
- Possibility: ～かもしれない
- Conjecture: ～だろう、～でしょう

## 🛠️ Development

### Project Structure

```
bunpochan/
├── manifest.json              # Extension configuration
├── README.md                  # This file
├── PROJECT.md                 # Development plan
├── IDEA.md                    # Project conception
├── src/
│   ├── content/
│   │   ├── content.js        # Main content script
│   │   └── content.css       # Popup styles
│   ├── background/
│   │   └── background.js     # Service worker
│   ├── data/
│   │   └── grammar-db.json   # Grammar patterns database
│   ├── settings/
│   │   ├── settings.html     # Settings page
│   │   ├── settings.css      # Settings styles
│   │   └── settings.js       # Settings logic
│   └── icons/                # Extension icons
└── tests/
    └── sample-texts.html     # Test page with Japanese samples
```

### Making Changes

1. **Edit source files** in your code editor

2. **Reload the extension**:
   - Go to `chrome://extensions/`
   - Find bunpochan
   - Click the refresh icon (🔄)

3. **Reload any test pages** to see changes

### Debugging

#### Content Script (sentence detection, popup)
- Right-click on any webpage → **Inspect**
- Check the **Console** tab for logs

#### Background Script (pattern matching)
- Go to `chrome://extensions/`
- Find bunpochan → Click **Inspect views: service worker**
- Check console for analysis logs

#### Settings Page
- Open settings → Right-click → **Inspect**

### Adding New Grammar Patterns

Edit `src/data/grammar-db.json`:

```json
{
  "id": "unique-pattern-id",
  "pattern": "～grammar pattern",
  "level": "N5",
  "category": "verb-form",
  "meaning": "English meaning",
  "explanation": "Detailed explanation",
  "formation": "How to form this pattern",
  "matching": {
    "regex": "regex pattern",
    "substring": "exact match",
    "forms": ["form1", "form2"]
  }
}
```

Then reload the extension!

## 🎯 Roadmap

### Current Version (0.1.0 - MVP)
- ✅ Basic Chrome extension structure
- ✅ Ctrl+Shift activation
- ✅ Sentence extraction
- ✅ Pattern matching engine
- ✅ Grammar database (N5-N4)
- ✅ Popup UI
- ✅ Settings page
- ✅ Test page

### Phase 2 (Planned)
- [ ] Add N3, N2, N1 grammar patterns
- [ ] Improve pattern matching with kuromoji.js
- [ ] Enhanced sentence boundary detection
- [ ] Better handling of HTML elements
- [ ] Performance optimization
- [ ] Example sentence translations

### Phase 3 (Future)
- [ ] User statistics and progress tracking
- [ ] Bookmark favorite patterns
- [ ] Export to Anki
- [ ] Community-contributed patterns
- [ ] Study mode with practice quizzes

## 🐛 Known Issues

- Sentence extraction may occasionally include extra text when Japanese is mixed with HTML elements
- Some complex particle patterns might not be detected perfectly
- Currently optimized for clean text (news sites, articles)

## 🤝 Contributing

This is currently an MVP/personal project. Contributions are welcome! Please see `PROJECT.md` for the development plan.

Ideas for contributions:
- Add more grammar patterns (N3-N1)
- Improve pattern matching accuracy
- Better sentence boundary detection
- Translations for pattern explanations
- UI/UX improvements

## 📝 License

TBD (considering MIT)

## 🙏 Acknowledgments

- Inspired by [Yomitan](https://github.com/themoeway/yomitan) for the interaction model
- Grammar references from Tae Kim's Grammar Guide and JLPT resources
- Icon design: Custom gradient (placeholder in development version)

## 📧 Contact

For questions, suggestions, or bug reports, please open an issue on GitHub.

---

**Happy Grammar Learning! 頑張ってください！** 📖✨
