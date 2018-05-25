let  Parser = require('./lib/parser.js');

module.exports = function(obj) {
  if (typeof(obj) !== 'object' || obj === null) {
    throw new Error('Missing document root object. Did you pass the argument at all?');
  }

  return Parser.parse(obj);
}
