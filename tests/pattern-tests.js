// Bunpochan Pattern Matching Tests
// This file tests that grammar patterns are correctly identified in sample sentences

const testCases = [
  // N5 Tests
  {
    sentence: "私は学生です。",
    expectedPatterns: ["です", "～は"],
    level: "N5"
  },
  {
    sentence: "毎日日本語を勉強しています。",
    expectedPatterns: ["～ています", "～を"],
    level: "N5"
  },
  {
    sentence: "昨日、友達と映画を見ました。",
    expectedPatterns: ["ました", "～と", "～を"],
    level: "N5"
  },
  {
    sentence: "コーヒーを飲みたいです。",
    expectedPatterns: ["～たい", "です", "～を"],
    level: "N5"
  },
  {
    sentence: "昨日は雨が降りませんでした。",
    expectedPatterns: ["ませんでした", "～は", "～が"],
    level: "N5"
  },
  {
    sentence: "ここでタバコを吸ってはいけません。",
    expectedPatterns: ["～てはいけない", "～で", "～を"],
    level: "N5"
  },

  // N4 Tests
  {
    sentence: "日本語が話せるようになりました。",
    expectedPatterns: ["～ようになる", "ました", "～が"],
    level: "N4"
  },
  {
    sentence: "明日は雨が降るかもしれません。",
    expectedPatterns: ["～かもしれない", "～は", "～が"],
    level: "N4"
  },
  {
    sentence: "毎日運動するようにしています。",
    expectedPatterns: ["～ようにする", "～ています"],
    level: "N4"
  },
  {
    sentence: "来週、日本に行く予定です。",
    expectedPatterns: ["～予定", "です", "～に"],
    level: "N4"
  },
  {
    sentence: "忙しいので、手伝えません。",
    expectedPatterns: ["～ので", "ません"],
    level: "N4"
  },
  {
    sentence: "彼は学生らしいです。",
    expectedPatterns: ["～らしい", "です", "～は"],
    level: "N4"
  },
  {
    sentence: "明日までにレポートを出さなければなりません。",
    expectedPatterns: ["～なければならない", "～に", "～を"],
    level: "N4"
  },

  // N3 Tests
  {
    sentence: "来週から毎日6時に起きることにしました。",
    expectedPatterns: ["～ことにする", "ました", "～に"],
    level: "N3"
  },
  {
    sentence: "来月から東京で働くことになりました。",
    expectedPatterns: ["～ことになる", "ました", "～で"],
    level: "N3"
  },
  {
    sentence: "家に着いたばかりなのに、また出かけなければならない。",
    expectedPatterns: ["～ばかり", "～のに", "～なければならない", "～に"],
    level: "N3"
  },
  {
    sentence: "彼は絶対に合格するに違いない。",
    expectedPatterns: ["～に違いない", "～は", "～に"],
    level: "N3"
  },
  {
    sentence: "毎日勉強しているわけではないが、週末は必ずやっています。",
    expectedPatterns: ["～わけではない", "～ています", "～は", "～が"],
    level: "N3"
  },
  {
    sentence: "高いからといって、品質が良いとは限らない。",
    expectedPatterns: ["～とは限らない", "～が"],
    level: "N3"
  },
  {
    sentence: "友達のおかげで、日本語が上手になりました。",
    expectedPatterns: ["～おかげで", "ました", "～で", "～が"],
    level: "N3"
  },
  {
    sentence: "雨のせいで、試合が中止になった。",
    expectedPatterns: ["～せいで", "だ", "～で", "～が"],
    level: "N3"
  },
  {
    sentence: "人によって、意見が違います。",
    expectedPatterns: ["～によって", "ます", "～が"],
    level: "N3"
  },
  {
    sentence: "この問題に関して、意見を聞かせてください。",
    expectedPatterns: ["～に関して", "～てください", "～を", "～に"],
    level: "N3"
  },
  {
    sentence: "日本の文化について研究しています。",
    expectedPatterns: ["～について", "～ています"],
    level: "N3"
  },
  {
    sentence: "学生として、勉強が一番大切だ。",
    expectedPatterns: ["～として", "だ", "～が"],
    level: "N3"
  },

  // N2 Tests
  {
    sentence: "彼が来ないわけだ。今日は休日だから。",
    expectedPatterns: ["～わけだ", "～ない", "だ", "～は", "～が", "～から"],
    level: "N2"
  },
  {
    sentence: "約束したからには、守らなければならない。",
    expectedPatterns: ["～からには", "～なければならない"],
    level: "N2"
  },
  {
    sentence: "学生である以上、勉強するのは当然だ。",
    expectedPatterns: ["～以上", "だ", "～は"],
    level: "N2"
  },
  {
    sentence: "この仕事は引き受けるわけにはいかない。",
    expectedPatterns: ["～わけにはいかない", "～は"],
    level: "N2"
  },
  {
    sentence: "学生なら、勉強するべきだ。",
    expectedPatterns: ["～べき", "だ", "～なら"],
    level: "N2"
  },
  {
    sentence: "明日は雨が降る恐れがある。",
    expectedPatterns: ["～恐れがある", "～は", "～が"],
    level: "N2"
  },
  {
    sentence: "彼女は美しいばかりか、頭も良い。",
    expectedPatterns: ["～ばかりか", "～は"],
    level: "N2"
  },
  {
    sentence: "休むどころか、もっと忙しくなった。",
    expectedPatterns: ["～どころか"],
    level: "N2"
  },

  // N1 Tests
  {
    sentence: "実際に見ないことには、判断できない。",
    expectedPatterns: ["～ないことには", "～に"],
    level: "N1"
  },
  {
    sentence: "この条件では承諾しかねます。",
    expectedPatterns: ["～かねる", "ます", "～では"],
    level: "N1"
  },
  {
    sentence: "彼は優秀であるのみならず、人格者でもある。",
    expectedPatterns: ["～のみならず", "～は"],
    level: "N1"
  },
  {
    sentence: "この会議において、重要な決定がなされた。",
    expectedPatterns: ["～において", "～に"],
    level: "N1"
  }
];

// Load grammar database
async function loadGrammarDatabase() {
  try {
    // Try multiple paths in case of different directory structures
    const paths = [
      '../src/data/grammar-db.json',
      './src/data/grammar-db.json',
      'src/data/grammar-db.json'
    ];

    let data = null;
    let lastError = null;

    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          data = await response.json();
          console.log(`✓ Loaded grammar database from: ${path}`);
          console.log(`✓ Found ${data.patterns.length} patterns\n`);
          return data.patterns;
        }
      } catch (error) {
        lastError = error;
      }
    }

    console.error('❌ Error loading grammar database from any path');
    console.error('Last error:', lastError);
    console.error('\n⚠️  CORS Error? Try one of these solutions:');
    console.error('   1. Run a local web server:');
    console.error('      cd /home/user/bunpochan');
    console.error('      python3 -m http.server 8000');
    console.error('      Then open: http://localhost:8000/tests/test-runner.html');
    console.error('   2. Use the Chrome extension directly to test\n');
    return [];
  } catch (error) {
    console.error('Error loading grammar database:', error);
    return [];
  }
}

// Match a pattern against a sentence
function matchPattern(sentence, pattern) {
  const matching = pattern.matching;

  // Try regex matching
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

  // Try substring matching
  if (matching && matching.substring) {
    const index = sentence.indexOf(matching.substring);
    if (index !== -1) {
      return {
        text: matching.substring,
        position: index
      };
    }
  }

  // Try multiple forms
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

// Run tests
async function runTests() {
  const patterns = await loadGrammarDatabase();
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    issues: []
  };

  console.log('🧪 Running Bunpochan Pattern Tests...\n');

  for (const testCase of testCases) {
    results.total++;
    const { sentence, expectedPatterns, level } = testCase;

    // Find matching patterns
    const detectedPatterns = [];
    for (const pattern of patterns) {
      const match = matchPattern(sentence, pattern);
      if (match) {
        detectedPatterns.push(pattern.pattern);
      }
    }

    // Check if all expected patterns were found
    const missingPatterns = expectedPatterns.filter(
      expected => !detectedPatterns.some(detected => detected.includes(expected.replace('～', '')))
    );

    if (missingPatterns.length === 0) {
      results.passed++;
      console.log(`✅ [${level}] ${sentence}`);
      console.log(`   Found: ${detectedPatterns.join(', ')}\n`);
    } else {
      results.failed++;
      console.log(`❌ [${level}] ${sentence}`);
      console.log(`   Expected: ${expectedPatterns.join(', ')}`);
      console.log(`   Found: ${detectedPatterns.join(', ')}`);
      console.log(`   Missing: ${missingPatterns.join(', ')}\n`);

      results.issues.push({
        sentence,
        level,
        missing: missingPatterns,
        found: detectedPatterns
      });
    }
  }

  // Print summary
  console.log('━'.repeat(80));
  console.log(`\n📊 Test Results:\n`);
  console.log(`   Total tests: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   Success rate: ${((results.passed / results.total) * 100).toFixed(1)}%\n`);

  if (results.issues.length > 0) {
    console.log(`\n🔍 Issues Found:\n`);
    results.issues.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.level}] Missing patterns: ${issue.missing.join(', ')}`);
      console.log(`   Sentence: ${issue.sentence}`);
      console.log(`   Should add/fix regex to match these patterns\n`);
    });
  }

  return results;
}

// Run tests when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', runTests);
}
