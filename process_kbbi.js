const fs = require('fs');

const jsonFiles = ['part1.json', 'part2.json', 'part3.json', 'part4.json'];
const txtFiles = ['yamxz_kbbi.txt'];
let allWords = [];

const manualWords = [
  // Akhir X
  "apterix", "aframax", "annex", "addax", "bordeaux", "bombyx", "chalcocoryx", "coix", "caronx", "donax", "echinosorex", "forex", "gallierex", "helix", "hystrix", "index", "komix", "lex", "lux", "marx", "murex", "meritix", "melanoperdix", "microhierax", "max", "mystax", "molitrix", "naiasptatrix", "nontax", "nothopanax", "nephotettix", "nephototix", "natrix", "olfax", "offax", "pallacalyx", "phoenix", "rhinoplax",
  // Akhir IF
  "aktif", "adiktif", "aditif", "adaptif", "afektif", "agresif", "akomodatif", "argumentatif", "alternatif", "destruktif", "defensif", "deduktif", "deklaratif", "efektif", "edukatif", "eksklusif", "ekspresif", "emotifaktif", "fax", "inisiatif", "informatif", "intuitif", "imajinatif", "kreatif", "konstruktif", "kompetitif", "konsumtif", "kooperatif", "produktif", "naratif", "negatif", "objektif", "pasif", "positif", "preventif", "reflektif", "represif", "selektif", "sensitif", "subjektif",
  // Awal X
  "xi", "xantat", "xantena", "xantofil", "xantogenat", "xanturenat", "xenia", "xeni", "xenobiotika", "xenobiotik", "xenobiosis", "xenografi", "xenolith", "xenolit", "xenologi", "xilologi", "xenon", "xenonema", "xenops", "xenofobia", "xenofilia", "xenofili", "xenogenesis", "xenograft", "xerodermia", "xerofit", "xeromorf", "xerophthalmia", "xeroftalmia", "xilium", "xilosa", "xilarium", "xilografi", "xilofon", "xylophone", "xilitol", "xiphisternum", "xiphisternal", "xanthoma", "xanthopsia", "xylophagous", "xenograf", "xilonit", "xenokrasi", "xerografi", "xenofili", "xenoglosia", "xiloidina", "xenomania"
];

allWords = allWords.concat(manualWords.map(w => w.toLowerCase()));

jsonFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Processing JSON ${file}...`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const words = Object.keys(data);
    
    // Filter to keep only single words (no spaces, no parentheses)
    const cleanWords = words.filter(word => {
      // Allow letters and hyphens, no spaces
      return /^[a-zA-Z-]+$/.test(word) && !word.startsWith('-') && !word.endsWith('-');
    }).map(word => word.toLowerCase());
    
    allWords = allWords.concat(cleanWords);
  }
});

txtFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Processing TXT ${file}...`);
    const content = fs.readFileSync(file, 'utf8');
    const words = content.split(/\r?\n/).filter(line => line.trim() !== '');
    
    const cleanWords = words.filter(word => {
      // Allow letters and hyphens, no spaces
      return /^[a-zA-Z-]+$/.test(word) && !word.startsWith('-') && !word.endsWith('-');
    }).map(word => word.toLowerCase());
    
    allWords = allWords.concat(cleanWords);
  }
});

// Remove duplicates
const uniqueWords = [...new Set(allWords)].sort();

console.log(`Total unique words found: ${uniqueWords.length}`);

fs.writeFileSync('public/kbbi.json', JSON.stringify(uniqueWords, null, 2));
console.log('Saved to public/kbbi.json');
