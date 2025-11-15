# Bunpochan Test Suite

This directory contains test files for verifying the accuracy of Bunpochan's grammar pattern detection.

## Files

### test-runner.html
An interactive HTML test runner that verifies pattern detection accuracy.

**How to use:**
1. Open `test-runner.html` in a web browser
2. Click "▶ Run Tests" to execute all test cases
3. View results in the browser console (press F12)
4. Results are also displayed on the page

**What it tests:**
- Verifies that expected grammar patterns are detected in sample sentences
- Tests patterns from all JLPT levels (N5-N1)
- Reports missing or incorrectly detected patterns
- Provides success rate statistics

### pattern-tests.js
The test suite implementation containing:
- Test cases with sample sentences and expected patterns
- Pattern matching logic (mirrors the extension's logic)
- Test result reporting

### sample-texts.html
A collection of Japanese sentences organized by JLPT level for manual testing of the extension.

**How to use:**
1. Load the extension in Chrome
2. Open `sample-texts.html`
3. Press `Ctrl+Shift` over any Japanese sentence
4. Verify that the expected grammar patterns are detected

## Adding New Tests

To add a new test case, edit `pattern-tests.js` and add an entry to the `testCases` array:

```javascript
{
  sentence: "Your Japanese sentence here",
  expectedPatterns: ["pattern1", "pattern2"],
  level: "N3"  // N5, N4, N3, N2, or N1
}
```

## Interpreting Results

### Success (✅)
Pattern was correctly detected in the sentence.

### Failure (❌)
One or more expected patterns were not detected. This indicates:
- The regex pattern in `grammar-db.json` needs to be updated
- The pattern might be missing a common conjugation
- The matching logic needs adjustment

### Common Issues

1. **Missing conjugations**: Patterns often need multiple forms
   - Example: `ことにする` → should include `ことにした`, `ことにします`, `ことにしました`

2. **Regex too strict**: Some patterns need more flexible matching
   - Example: Past tense, polite forms, negative forms

3. **Overlapping patterns**: Some patterns might match substrings of others
   - Solution: Use more specific regex with word boundaries

## Running Tests via Command Line

**⚠️ Important:** The test runner requires a web server to avoid CORS issues when loading the grammar database.

### Easy Method (Recommended)
```bash
cd tests
./run-tests.sh
```
This script will:
- Start a local web server on port 8000
- Automatically open the test runner in your browser
- Press Ctrl+C to stop when done

### Manual Method
```bash
# From project root
cd /home/user/bunpochan
python3 -m http.server 8000

# Then navigate to:
# http://localhost:8000/tests/test-runner.html
```

### Troubleshooting
If you get **0% success rate**, it means the grammar database isn't loading:
1. Make sure you're running via a web server (not opening the file directly)
2. Check the browser console for "Loaded grammar database" message
3. If you see CORS errors, use the run-tests.sh script

## Continuous Testing

When adding new grammar patterns to `grammar-db.json`:
1. Add corresponding test cases to `pattern-tests.js`
2. Run the test suite to verify detection
3. Fix any failing tests before committing
4. Update `sample-texts.html` with real-world examples
