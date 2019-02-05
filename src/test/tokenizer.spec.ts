import tokenize from '../tokenizer/tokenize';
import { Token, TokenType } from '../types/jsimplint';
import { expect } from 'chai';
import 'mocha';

describe('Tokenizer tests', () => {
  it('should tokenize with bad formatting', () => {
    // console
    const tokens = tokenize(`
    const   foo =42;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.NUMERIC, value: 42 },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });


  it('should tokenize number declaration', () => {
    const tokens = tokenize(`
    const foo = 42;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.NUMERIC, value: 42 },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize double quote string declaration', () => {
    const tokens = tokenize(`
    const foo = "bar";
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.STRING, value: 'bar' },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize single quote string declaration', () => {
    const tokens = tokenize(`
    const foo = 'bar';
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.STRING, value: 'bar' },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize null declaration', () => {
    const tokens = tokenize(`
    const foo = null;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.NULL, value: null },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize undefined declaration', () => {
    const tokens = tokenize(`
    const foo = undefined;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.UNDEFINED, value: undefined },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize boolean declarations', () => {
    const tokens = tokenize(`
    const foo = true;
    const bar = false;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.BOOLEAN, value: true },
      { type: TokenType.SEMICOLON, value: ';' },
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'bar' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.BOOLEAN, value: false },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize array declaration', () => {
    const tokens = tokenize(`
    const foo = [1, 2];
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.LEFT_BRACKET, value: '[' },
      { type: TokenType.NUMERIC, value: 1 },
      { type: TokenType.COMMA, value: ',' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.NUMERIC, value: 2 },
      { type: TokenType.RIGHT_BRACKET, value: ']' },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize object declaration', () => {
    const tokens = tokenize(`
    const foo = {bar: 1};
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'const' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.ASSIGN, value: '=' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.LEFT_CURLY, value: '{' },
      { type: TokenType.IDENTIFIER, value: 'bar' },
      { type: TokenType.COLON, value: ':' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.NUMERIC, value: 1 },
      { type: TokenType.RIGHT_CURLY, value: '}' },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize function declaration', () => {
    const tokens = tokenize(`
    function foo() {};
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD, value: 'function' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.LEFT_PAREN, value: '(' },
      { type: TokenType.RIGHT_PAREN, value: ')' },
      { type: TokenType.SPACE, value: ' ' },
      { type: TokenType.LEFT_CURLY, value: '{' },
      { type: TokenType.RIGHT_CURLY, value: '}' },
      { type: TokenType.SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });
});
