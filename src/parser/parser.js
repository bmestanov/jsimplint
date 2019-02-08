require('./build');
const expressions = require('./expressions');
const jison = require('./jison');
jison.parser.yy = expressions;
module.exports = jison;