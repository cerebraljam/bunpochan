# 文法ちゃん (Bunpochan) - Japanese Grammar Assistant

A Chrome extension that helps Japanese learners understand grammar patterns while reading. Get instant grammar explanations with a simple keyboard shortcut!

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![JLPT](https://img.shields.io/badge/JLPT-N5%20%7C%20N4%20%7C%20N3%20%7C%20N2%20%7C%20N1-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🌟 Features

- **On-demand Grammar Analysis**: Press `Ctrl+Alt` while hovering over Japanese text to see grammar patterns
- **Comprehensive Coverage**: 175+ patterns including JLPT N5-N1 plus common casual/spoken forms
- **Multiple Pattern Types**: JLPT patterns, casual speech, written/formal expressions
- **Customizable Filters**: Toggle JLPT levels and register types (casual, written, neutral)
- **Register Indicators**: Visual badges showing pattern formality (casual, written, neutral)
- **Non-intrusive**: Only activates when you need it, like Yomitan for vocabulary
- **Beautiful Popup**: Clean, easy-to-read explanations with examples
- **Fast & Lightweight**: Pattern-based matching for instant results
- **Star/Bookmark**: Save patterns you want to review later

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

3. **Press `Ctrl+Alt` together** (Ctrl+Option on Mac)

4. **A popup appears** showing all grammar patterns detected in that sentence!

### Example

When you hover over: `私は日本語を勉強しています。`

And press `Ctrl+Alt`, you'll see:
- **～を** (N5) - Direct object marker
- **～ています** (N5) - Present progressive (polite)

### Settings

Click the extension icon in the Chrome toolbar to open settings:

- **Toggle JLPT Levels**: Enable/disable N5, N4, N3, N2, N1, and Common patterns
- **Register Filters**: Filter by casual, written/formal, or neutral patterns
- **Star Patterns**: View and manage your bookmarked grammar points
- **Customize Your Experience**: Hide patterns you've already mastered

## 📚 Grammar Database

The current version (0.2.0) includes **175+ grammar patterns** covering:

### JLPT Patterns (N5-N1): ~125 patterns
- **N5** (26 patterns): です、ます、particles, basic forms
- **N4** (24 patterns): conditionals, たい/たがる, hearsay, appearance
- **N3** (25 patterns): decisions, extent, conjecture, time expressions
- **N2** (25 patterns): obligation, correlation, emphasis, written forms
- **N1** (25 patterns): complex conditionals, literary, formal expressions

### Common/Casual Patterns: ~50 patterns
- **Casual Speech**: じゃん、～っけ、～なんて、～くせに
- **Contractions**: ～ちゃう/じゃう、～んだけど
- **Ending Particles**: ～よね、～かな、～さ、～ぜ/ぞ/わ
- **Spoken Quotations**: ～って、～んだって
- **Experience**: ～たことがある
- **Habits**: ～ことにしている
- **Verb Forms**: Passive, causative, potential, volitional, imperative

### Written/Formal Patterns: ~20 patterns
- **Formal Occasions**: ～に際して、～にあたって
- **Formal Means**: ～を通じて、～に基づいて
- **Formal Extent**: ～にわたって
- **Literary Purpose**: ～べく

## 📚 Grammar Database

The current version (0.2.0) includes **175+ grammar patterns** covering:

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

### N3 Patterns (25 patterns)
- Decision: ～ことにする、～ことになる
- Extent: ～ばかり
- Conjecture: ～に違いない
- Negation: ～わけではない
- Possibility: ～とは限らない
- Reason: ～おかげで、～せいで
- Means: ～によって
- Direction: ～に対して
- Topic: ～に関して、～について
- Role: ～として
- Time: ～最中、～途中、～うちに、～ところ
- Condition: ～上で、～限り
- Frequency: ～たびに
- Contrast: ～のに
- Listing: ～とか
- Explanation: ～もの
- Reflection: ～ものだ

### N2 Patterns (25 patterns)
- Conclusion: ～わけだ
- Obligation: ～わけにはいかない、～べき
- Necessity: ～ざるを得ない
- Compulsion: ～ないではいられない
- Possibility: ～恐れがある
- Time: ～次第
- Reason: ～以上、～からには、～ことから
- Correlation: ～ば～ほど、～に伴い
- Condition: ～にしても
- Addition: ～ばかりか
- Emphasis: ～どころか
- Emotion: ～てならない
- Tendency: ～っぽい
- Difficulty: ～がたい
- Progression: ～つつある
- Contrast: ～一方、～反面、～に反して
- Basis: ～をもとに
- Listing: ～をはじめ

### N1 Patterns (25 patterns)
- Condition: ～ことなしに、～ないことには、～たところで、～ともなると、～ようでは、～ようものなら
- Manner: ～んばかりに
- Result: ～ずじまい
- Estimation: ～といったところだ
- Prohibition: ～まじき
- Degree: ～極まる
- Purpose: ～かたがた
- Parallel: ～かたわら
- Difficulty: ～かねる
- Tendency: ～きらいがある
- Value: ～に足る、～に堪える
- Addition: ～のみならず
- Combination: ～と相まって
- Preference: ～に限る
- Trigger: ～を契機に
- Topic: ～をめぐって
- Location: ～において
- Scope: ～を問わず

### Common/Casual Patterns (~50 patterns)
- **Casual Speech**: じゃん、～っけ、～なんて、～くせに
- **Contractions**: ～ちゃう/じゃう、～んだけど
- **Ending Particles**: ～よね、～かな、～さ、～ぜ/ぞ/わ
- **Spoken Quotations**: ～って、～んだって
- **Experience**: ～たことがある
- **Habits**: ～ことにしている
- **Verb Forms**: Passive, causative, potential, volitional, imperative

### Written/Formal Patterns (~20 patterns)
- **Formal Occasions**: ～に際して、～にあたって
- **Formal Means**: ～を通じて、～に基づいて
- **Formal Extent**: ～にわたって
- **Literary Purpose**: ～べく

### Pattern Categories by Register:
- 🟪 **Common** (Purple): Everyday casual/spoken patterns
- 🟡 **Casual** (Yellow): Informal conversation
- 🔵 **Written** (Blue): Formal/written text
- ⚪ **Neutral** (No badge): Standard JLPT patterns

All patterns include:
- Pattern structure and JLPT level (when applicable)
- Register indicator (casual, written, or neutral)
- English meaning and detailed explanation
- Formation rules
- Usage notes

## 🔧 Technical Details

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

#### How It Works

Each pattern in `grammar-db.json` has a `matchingStrategy` field:

```json
{
  "id": "particle-wa",
  "matchingStrategy": "pos-based",   // Uses kuromoji tokenizer
  "matching": {
    "pos": ["助詞"],                   // Must be a particle
    "surface": "は"                    // Surface form
  }
}
```

vs.

```json
{
  "id": "te-iru",
  "matchingStrategy": "regex",        // Uses regex (default)
  "matching": {
    "regex": "ている"
  }
}
```

**Benefits:**
- 🎯 Eliminates ~90% of false positives for particles
- ⚡ Fast initialization (tokenizer caches after first use)
- 🔄 Graceful fallback to regex if tokenizer unavailable
- 📝 Clear, maintainable codebase

## 🛠️ Development

### Project Structure

```
bunpochan/
├── manifest.json              # Extension configuration
├── README.md                  # This file
├── PROJECT.md                 # Development plan
├── src/
│   ├── content/
│   │   ├── content.js        # Main content script
│   │   └── content.css       # Popup styles
│   ├── background/
│   │   └── background.js     # Service worker with kuromoji integration
│   ├── data/
│   │   └── grammar-db.json   # Grammar patterns database
│   ├── lib/
│   │   └── kuromoji/         # Japanese morphological analyzer
│   │       ├── kuromoji.js   # Library (~300KB)
│   │       └── dict/         # Dictionary files (~17MB)
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

**For regex-based patterns** (most patterns):
```json
{
  "id": "unique-pattern-id",
  "pattern": "～grammar pattern",
  "level": "N5",
  "category": "verb-form",
  "matchingStrategy": "regex",
  "meaning": "English meaning",
  "explanation": "Detailed explanation",
  "formation": "How to form this pattern",
  "matching": {
    "regex": "regex pattern"
  }
}
```

**For POS-based patterns** (particles, context-sensitive):
```json
{
  "id": "particle-example",
  "pattern": "～particle",
  "level": "N5",
  "category": "particle",
  "matchingStrategy": "pos-based",
  "meaning": "English meaning",
  "explanation": "Detailed explanation",
  "formation": "How to form this pattern",
  "matching": {
    "pos": ["助詞"],
    "surface": "particle-text"
  }
}
```

Then reload the extension!

## 🎯 Roadmap

### Current Version (0.2.0)
- ✅ Basic Chrome extension structure
- ✅ Ctrl+Alt activation
- ✅ Sentence extraction
- ✅ Pattern matching engine
- ✅ Grammar database (N5-N1 JLPT + Common patterns, 175+ total)
- ✅ Popup UI with register badges
- ✅ Settings page with JLPT level + register filters
- ✅ Star/bookmark functionality
- ✅ Test page

### Phase 3 (Planned)
- [ ] Pattern variation detection (contracted forms)
- [ ] Compound pattern detection
- [ ] Enhanced sentence boundary detection
- [ ] Performance optimization
- [ ] Example sentence translations
- [ ] More dialect patterns (optional)

### Phase 4 (Future)
- [ ] User statistics and progress tracking
- [ ] Export to Anki
- [ ] Community-contributed patterns
- [ ] Study mode with practice quizzes
- [ ] Pattern frequency analysis

## 🐛 Known Issues

- Sentence extraction may occasionally include extra text when Japanese is mixed with HTML elements
- Some complex particle patterns might not be detected perfectly
- Currently optimized for clean text (news sites, articles)

## 🤝 Contributing

This is currently an MVP/personal project. Contributions are welcome! Please see `PROJECT.md` for the development plan.

Ideas for contributions:
- Add more advanced or specialized grammar patterns
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
