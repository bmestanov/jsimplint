import { Parser } from '../parser/parse';
import tokenize from '../tokenizer/tokenize';
import { Token, TokenType } from '../types/jsimplint';
import { expect } from 'chai';
import 'mocha';

describe('Parser tests', () => {
  it('should parse literals', () => {
    const code = `
    42;
    "foo";
    `;
    const tokens = tokenize(code, new Set([TokenType.SPACE, TokenType.PUNCTUATOR_SEMICOLON]));
    const p = new Parser(tokens);
    const ast = p.parse();
    console.log(JSON.stringify(ast, null, 2));
  });
});