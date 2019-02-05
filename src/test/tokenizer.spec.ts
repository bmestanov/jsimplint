import tokenize from '../tokenizer/tokenize';
import { Token, TokenType } from '../types/jsimplint';
import { expect } from 'chai';
import 'mocha';

describe('Tokenizer tests', () => {
  it('should tokenize with bad formatting', () => {
    const tokens = tokenize(`
    const   foo =42;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.NUMERIC, value: 42 },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize number declaration', () => {
    const tokens = tokenize(`
    const foo = 42;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.NUMERIC, value: 42 },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize double quote string declaration', () => {
    const tokens = tokenize(`
    const foo = "bar";
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.STRING, value: 'bar' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize single quote string declaration', () => {
    const tokens = tokenize(`
    const foo = 'bar';
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.STRING, value: 'bar' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize null declaration', () => {
    const tokens = tokenize(`
    const foo = null;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.KEYWORD_NULL, value: null },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize undefined declaration', () => {
    const tokens = tokenize(`
    const foo = undefined;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.KEYWORD_UNDEFINED, value: undefined },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize boolean declarations', () => {
    const tokens = tokenize(`
    const foo = true;
    const bar = false;
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.BOOLEAN, value: true },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'bar' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.BOOLEAN, value: false },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize array declaration', () => {
    const tokens = tokenize(`
    const foo = [1, 2];
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.PUNCTUATOR_LEFT_BRACKET, value: '[' },
      { type: TokenType.NUMERIC, value: 1 },
      { type: TokenType.PUNCTUATOR_COMMA, value: ',' },
      { type: TokenType.NUMERIC, value: 2 },
      { type: TokenType.PUNCTUATOR_RIGHT_BRACKET, value: ']' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize object declaration', () => {
    const tokens = tokenize(`
    const foo = {bar: 1};
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_CONST, value: 'const' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_ASSIGN, value: '=' },
      { type: TokenType.PUNCTUATOR_LEFT_CURLY, value: '{' },
      { type: TokenType.IDENTIFIER, value: 'bar' },
      { type: TokenType.PUNCTUATOR_COLON, value: ':' },
      { type: TokenType.NUMERIC, value: 1 },
      { type: TokenType.PUNCTUATOR_RIGHT_CURLY, value: '}' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize function declaration', () => {
    const tokens = tokenize(`
    function foo() {};
    `);
    const expected: Token[] = [
      { type: TokenType.KEYWORD_FUNCTION, value: 'function' },
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_LEFT_PAREN, value: '(' },
      { type: TokenType.PUNCTUATOR_RIGHT_PAREN, value: ')' },
      { type: TokenType.PUNCTUATOR_LEFT_CURLY, value: '{' },
      { type: TokenType.PUNCTUATOR_RIGHT_CURLY, value: '}' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize single line comment', () => {
    const tokens = tokenize(`
    // this is a comment
    `);
    const expected: Token[] = [
      { type: TokenType.COMMENT, value: '// this is a comment' },
    ];
    expect(tokens).to.include.deep.ordered.members(expected);
  });

  it('should tokenize inline single line comment', () => {
    const tokens = tokenize(`
    foo(); // this is a comment
    `);
    const expected: Token[] = [
      { type: TokenType.IDENTIFIER, value: 'foo' },
      { type: TokenType.PUNCTUATOR_LEFT_PAREN, value: '(' },
      { type: TokenType.PUNCTUATOR_RIGHT_PAREN, value: ')' },
      { type: TokenType.PUNCTUATOR_SEMICOLON, value: ';' },
      { type: TokenType.COMMENT, value: '// this is a comment' },
    ];
    expect(tokens).to.have.deep.members(expected);
  });

  it('should tokenize multiline comment', () => {
    const source = `/*
    this is a multiline comment
    */`;
    const tokens = tokenize(source);
    const expected: Token[] = [
      { type: TokenType.COMMENT, value: source },
    ];
    expect(tokens).to.include.deep.ordered.members(expected);
  });
});
