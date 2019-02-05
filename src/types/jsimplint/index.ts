export enum TokenType {
  SPACE,
  ENDLINE,
  IDENTIFIER,
  COMMENT,
  NUMERIC,
  STRING,
  BOOLEAN,
  KEYWORD_DO,
  KEYWORD_IF,
  KEYWORD_IN,
  KEYWORD_FOR,
  KEYWORD_LET,
  KEYWORD_NEW,
  KEYWORD_TRY,
  KEYWORD_VAR,
  KEYWORD_CASE,
  KEYWORD_ELSE,
  KEYWORD_ENUM,
  KEYWORD_EVAL,
  KEYWORD_NULL,
  KEYWORD_UNDEFINED,
  KEYWORD_THIS,
  KEYWORD_TRUE,
  KEYWORD_VOID,
  KEYWORD_WITH,
  KEYWORD_AWAIT,
  KEYWORD_BREAK,
  KEYWORD_CATCH,
  KEYWORD_CLASS,
  KEYWORD_CONST,
  KEYWORD_FALSE,
  KEYWORD_SUPER,
  KEYWORD_THROW,
  KEYWORD_WHILE,
  KEYWORD_YIELD,
  KEYWORD_DELETE,
  KEYWORD_EXPORT,
  KEYWORD_IMPORT,
  KEYWORD_PUBLIC,
  KEYWORD_RETURN,
  KEYWORD_STATIC,
  KEYWORD_SWITCH,
  KEYWORD_TYPEOF,
  KEYWORD_DEFAULT,
  KEYWORD_EXTENDS,
  KEYWORD_FINALLY,
  KEYWORD_PACKAGE,
  KEYWORD_PRIVATE,
  KEYWORD_CONTINUE,
  KEYWORD_DEBUGGER,
  KEYWORD_FUNCTION,
  KEYWORD_ARGUMENTS,
  KEYWORD_INTERFACE,
  KEYWORD_PROTECTED,
  KEYWORD_IMPLEMENTS,
  KEYWORD_INSTANCEOF,
  PUNCTUATOR_ASSIGN_URSH,
  PUNCTUATOR_ASSIGN_RSH,
  PUNCTUATOR_ASSIGN_LSH,
  PUNCTUATOR_ASSIGN_BITWISE_OR,
  PUNCTUATOR_ASSIGN_BITWISE_XOR,
  PUNCTUATOR_ASSIGN_BITWISE_AND,
  PUNCTUATOR_ASSIGN_PLUS,
  PUNCTUATOR_ASSIGN_MINUS,
  PUNCTUATOR_ASSIGN_MUL,
  PUNCTUATOR_ASSIGN_DIV,
  PUNCTUATOR_ASSIGN_MOD,
  PUNCTUATOR_SEMICOLON,
  PUNCTUATOR_COMMA,
  PUNCTUATOR_HOOK,
  PUNCTUATOR_COLON,
  PUNCTUATOR_OR,
  PUNCTUATOR_AND,
  PUNCTUATOR_BITWISE_OR,
  PUNCTUATOR_BITWISE_XOR,
  PUNCTUATOR_BITWISE_AND,
  PUNCTUATOR_STRICT_EQ,
  PUNCTUATOR_EQ,
  PUNCTUATOR_ASSIGN,
  PUNCTUATOR_STRICT_NE,
  PUNCTUATOR_NE,
  PUNCTUATOR_LSH,
  PUNCTUATOR_LE,
  PUNCTUATOR_LT,
  PUNCTUATOR_URSH,
  PUNCTUATOR_RSH,
  PUNCTUATOR_GE,
  PUNCTUATOR_GT,
  PUNCTUATOR_INCREMENT,
  PUNCTUATOR_DECREMENT,
  PUNCTUATOR_PLUS,
  PUNCTUATOR_MINUS,
  PUNCTUATOR_MUL,
  PUNCTUATOR_DIV,
  PUNCTUATOR_MOD,
  PUNCTUATOR_NOT,
  PUNCTUATOR_BITWISE_NOT,
  PUNCTUATOR_DOT,
  PUNCTUATOR_LEFT_BRACKET,
  PUNCTUATOR_RIGHT_BRACKET,
  PUNCTUATOR_LEFT_CURLY,
  PUNCTUATOR_RIGHT_CURLY,
  PUNCTUATOR_LEFT_PAREN,
  PUNCTUATOR_RIGHT_PAREN,
};

export class Token {
  type: TokenType = TokenType.KEYWORD_NULL;
  value: any;
  line?: number;
};

export interface MatchMap {
  [match: string]: TokenType;
};

export interface Expression {

};

export interface Visitor<Expression> {

};