import { Token, TokenType } from "../types/jsimplint";
import './expressions';
import * as Node from "./expressions";

/*
JavaScript LL(1) Grammar
JavaScript Language Specification
Prelminary Draft

Brendan Eich
C. Rand Mckinney

JavaScript 1.1
11/18/96
http://hepunx.rl.ac.uk/~adye/jsspec11/llr.htm
*/

export class Parser {
  idx: number;
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.idx = 0;
    this.tokens = tokens;
  }

  public parse() {
    return this.parseProgram();
  }

  private assert(condition: boolean, message: string) {
    if (!condition) {
      throw new Error(message);
    }
  }

  private expect(t: TokenType): void {
    if (!this.match(t)) {
      this.assert(false, `Unexpected token: ${this.tokens[this.idx]}`);
    }
    this.currentToken(); // consume token
  }

  private currentToken(): Token | undefined {
    return this.tokens[this.idx - 1];
  }

  private tokensLeft(): boolean {
    return this.idx < this.tokens.length;
  }

  private match(type?: TokenType): boolean {
    if (!this.tokensLeft()) {
      this.assert(false, 'Unexpected end of program');
    }
    const current = this.tokens[this.idx];
    if (current && current.type === type) {
      this.idx++;
      return true;
    }
    return false;
  }

  private matchAny(types: TokenType[]): boolean {
    return types.some(t => this.match(t));
  }

  private matchSequence(types: TokenType[]): boolean {
    return types.every(this.match);
  }

  private parseProgram() {
    const program: { [k: string]: Node.Element[] } = { elements: [] };
    while (this.tokensLeft()) {
      const element = this.parseElement();
      program.elements.push(element);
    }
    return program;
  }

  private parseElement(): Node.Element {
    return this.parsePrimaryExpression();
  }

  private parseEmptyStatement(): Node.EmptyStatement {
    return new Node.EmptyStatement();
  }

  private parseStatement(): Node.Node {
    if (this.match(TokenType.PUNCTUATOR_SEMICOLON)) {
      const emptyStatement = this.parseEmptyStatement();
      return new Node.Statement(emptyStatement);
    }
    if (this.match(TokenType.KEYWORD_IF)) {
      // if statement
    }
    if (this.match(TokenType.KEYWORD_WHILE)) {
      // while statement
    }
    if (this.match(TokenType.KEYWORD_FOR)) {
      // for
    }
    
  }

  private parseExpression(): Node.Expression {
    return new Node.Expression(null);
  }

  private parsePrimaryExpression(): Node.PrimaryExpression {
    if (this.match(TokenType.PUNCTUATOR_LEFT_PAREN)) {
      const expr = this.parseExpression();
      this.expect(TokenType.PUNCTUATOR_RIGHT_PAREN);
      return new Node.PrimaryExpression(expr);
    }
    const literal = this.parseLiteral();
    return new Node.PrimaryExpression(literal);
  }

  private parseLiteral(): Node.Literal {
    const match = this.matchAny([
      TokenType.IDENTIFIER,
      TokenType.NUMERIC,
      TokenType.STRING,
      TokenType.BOOLEAN,
      TokenType.KEYWORD_NULL,
      TokenType.KEYWORD_UNDEFINED,
      TokenType.KEYWORD_THIS,
    ]);
    if (!match) {
      this.assert(false, 'Bad input');
    }
    const token = this.currentToken()!;
    switch (token.type) {
      case TokenType.IDENTIFIER: { return new Node.Literal('identifier', token.value); }
      case TokenType.NUMERIC: { return new Node.Literal('numeric', token.value); }
      case TokenType.STRING: { return new Node.Literal('string', token.value); }
      case TokenType.BOOLEAN: { return new Node.Literal('boolean', token.value); }
      case TokenType.KEYWORD_NULL: { return new Node.Literal('null', token.value); }
      case TokenType.KEYWORD_THIS: { return new Node.Literal('this', token.value); }
      default: { return new Node.Literal('undefined', token.value); }
    }
  }
}