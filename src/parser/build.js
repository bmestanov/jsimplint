const fs = require('fs');
const path = require('path');
const jisonGenerator = require('jison');

const bnf = fs.readFileSync(path.join(__dirname, 'grammar.jison'), 'utf8');
const parserSource = new jisonGenerator.Parser(bnf).generate();
fs.writeFileSync(path.join(__dirname, 'jison.js'), parserSource);
console.log('Build finished');