const jisonGen = require('./jison');
const expressions = require('./expressions');

jisonGen.parser.yy  = expressions;
module.exports = jisonGen;