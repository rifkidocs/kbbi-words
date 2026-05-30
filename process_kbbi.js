const fs = require('fs');

const files = ['part1.json', 'part2.json', 'part3.json', 'part4.json'];
let allWords = [];

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Processing ${file}...`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const words = Object.keys(data);
    
    // Filter to keep only single words (no spaces, no parentheses)
    const cleanWords = words.filter(word => {
      // Basic Indonesian word check: only letters, no spaces
      return /^[a-zA-Z]+$/.test(word);
    }).map(word => word.toLowerCase());
    
    allWords = allWords.concat(cleanWords);
  }
});

// Remove duplicates
const uniqueWords = [...new Set(allWords)].sort();

console.log(`Total unique words found: ${uniqueWords.length}`);

fs.writeFileSync('public/kbbi.json', JSON.stringify(uniqueWords, null, 2));
console.log('Saved to public/kbbi.json');
