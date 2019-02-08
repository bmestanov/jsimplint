/* lexical grammar */
%lex

DecimalDigit [0-9]
DecimalDigits [0-9]+
NonZeroDigit [1-9]
OctalDigit [0-7]
HexDigit [0-9a-fA-F]
IdentifierStart [$_a-zA-Z]|("\\"[u]{HexDigit}{4})
IdentifierPart {IdentifierStart}|[0-9]
Identifier {IdentifierStart}{IdentifierPart}*
ExponentIndicator [eE]
SignedInteger [+-]?[0-9]+
DecimalIntegerLiteral [0]|({NonZeroDigit}{DecimalDigits}*)
ExponentPart {ExponentIndicator}{SignedInteger}
OctalIntegerLiteral [0]{OctalDigit}+
HexIntegerLiteral [0][xX]{HexDigit}+
DecimalLiteral ({DecimalIntegerLiteral}\.{DecimalDigits}*{ExponentPart}?)|(\.{DecimalDigits}{ExponentPart}?)|({DecimalIntegerLiteral}{ExponentPart}?)
LineContinuation \\(\r\n|\r|\n)
OctalEscapeSequence (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence [x]{HexDigit}{2}
SingleEscapeCharacter [\"\"\\bfnrtv]
NonEscapeCharacter [^\"\"\\bfnrtv0-9xu]
CharacterEscapeSequence {SingleEscapeCharacter}|{NonEscapeCharacter}
EscapeSequence {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}
DoubleStringCharacter ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
SingleStringCharacter ([^\'\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\")

%x REGEXP
%options flex

%%
">>>=" return ">>>=";
">>=" return ">>=";
"<<=" return "<<=";
"|=" return "|=";
"^=" return "^=";
"&=" return "&=";
"+=" return "+=";
"-=" return "-=";
"*=" return "*=";
"/=" return "/=";
"%=" return "%=";
";" return ";";
"," return ",";
"?" return "?";
":" return ":";
"||" return "||";
"&&" return "&&";
"|" return "|";
"^" return "^";
"&" return "&";
"===" return "===";
"==" return "==";
"=" return "=";
"!==" return "!==";
"!=" return "!=";
"<<" return "<<";
"<=" return "<=";
"<" return "<";
">>>" return ">>>";
">>" return ">>";
">=" return ">=";
">" return ">";
"++" return "++";
"--" return "--";
"+" return "+";
"-" return "-";
"*" return "*";
"/" return "/";
"%" return "%";
"!" return "!";
"~" return "~";
"." return ".";
"[" return "[";
"]" return "]";
"{" return "{";
"}" return "}";
"(" return "(";
")" return ")";
"abstract" return "KEYWORD_ABSTRACT";
"boolean" return "KEYWORD_BOOLEAN";
"break" return "KEYWORD_BREAK";
"byte" return "KEYWORD_BYTE";
"case" return "KEYWORD_CASE";
"catch" return "KEYWORD_CATCH";
"char" return "KEYWORD_CHAR";
"class" return "KEYWORD_CLASS";
"const" return "KEYWORD_CONST";
"continue" return "KEYWORD_CONTINUE";
"default" return "KEYWORD_DEFAULT";
"delete" return "KEYWORD_DELETE";
"do" return "KEYWORD_DO";
"double" return "KEYWORD_DOUBLE";
"else" return "KEYWORD_ELSE";
"extends" return "KEYWORD_EXTENDS";
"final" return "KEYWORD_FINAL";
"finally" return "KEYWORD_FINALLY";
"float" return "KEYWORD_FLOAT";
"for" return "KEYWORD_FOR";
"function" return "KEYWORD_FUNCTION";
"goto" return "KEYWORD_GOTO";
"if" return "KEYWORD_IF";
"implements" return "KEYWORD_IMPLEMENTS";
"import" return "KEYWORD_IMPORT";
"in" return "KEYWORD_IN";
"instanceof" return "KEYWORD_INSTANCEOF";
"int" return "KEYWORD_INT";
"interface" return "KEYWORD_INTERFACE";
"long" return "KEYWORD_LONG";
"native" return "KEYWORD_NATIVE";
"new" return "KEYWORD_NEW";
"package" return "KEYWORD_PACKAGE";
"private" return "KEYWORD_PRIVATE";
"protected" return "KEYWORD_PROTECTED";
"public" return "KEYWORD_PUBLIC";
"return" return "KEYWORD_RETURN";
"short" return "KEYWORD_SHORT";
"static" return "KEYWORD_STATIC";
"super" return "KEYWORD_SUPER";
"switch" return "KEYWORD_SWITCH";
"synchronized" return "KEYWORD_SYNCHRONIZED";
"throw" return "KEYWORD_THROW";
"throws" return "KEYWORD_THROWS";
"transient" return "KEYWORD_TRANSIENT";
"try" return "KEYWORD_TRY";
"typeof" return "KEYWORD_TYPEOF";
"var" return "KEYWORD_VAR";
"void" return "KEYWORD_VOID";
"volatile" return "KEYWORD_VOLATILE";
"while" return "KEYWORD_WHILE";
"with" return "KEYWORD_WITH";
"break" return "KEYWORD_BREAK";
"continue" return "KEYWORD_CONTINUE";
"delete" return "KEYWORD_DELETE";
"else" return "KEYWORD_ELSE";
"for" return "KEYWORD_FOR";
"function" return "KEYWORD_FUNCTION";
"if" return "KEYWORD_IF";
"in" return "KEYWORD_IN";
"new" return "KEYWORD_NEW";
"return" return "KEYWORD_RETURN";
"this" return "KEYWORD_THIS";
"typeof" return "KEYWORD_TYPEOF";
"var" return "KEYWORD_VAR";
"void" return "KEYWORD_VOID";
"while" return "KEYWORD_WHILE";
"with" return "KEYWORD_WITH";
<<EOF>> return "EOF";
{StringLiteral} return "STRING_LITERAL";
{Identifier}            return "IDENTIFIER";
{DecimalLiteral}        return "NUMERIC_LITERAL";
{HexIntegerLiteral}     return "NUMERIC_LITERAL";
{OctalIntegerLiteral}   return "NUMERIC_LITERAL";

/lex

%start Program

%%
Program
  : Element Program
    { return 'program'; }
  | EOF
    { return []; }
  ;
Element
  : KEYWORD_FUNCTION IDENTIFIER "(" ParameterListOpt ")" CompoundStatement
  | Statement
  ;
ParameterListOpt
  : 
  | ParameterList
  ;
ParameterList
  : IDENTIFIER
  | IDENTIFIER "," ParameterList
  ;
CompoundStatement
  : "{" Statements "}"
  ;
Statements
  : 
  | Statement Statements
  ;
Statement
  :
  | ";"
  | KEYWORD_IF Condition Statement
  | KEYWORD_IF Condition Statement KEYWORD_ELSE Statement
  | KEYWORD_WHILE Condition Statement
  | ForParen ";" ExpressionOpt ";" ExpressionOpt ")" Statement
  | ForBegin ";" ExpressionOpt ";" ExpressionOpt ")" Statement
  | ForBegin KEYWORD_IN Expression ")" Statement
  | KEYWORD_BREAK ";"
  | KEYWORD_CONTINUE ";"
  | KEYWORD_WITH "(" Expression ")" Statement
  | KEYWORD_RETURN ExpressionOpt ";"
  | CompoundStatement
  | VariablesOrExpression
  | VariablesOrExpression ";"
  ;
Condition
  : "(" Expression ")"
  ;
ForParen
  : KEYWORD_FOR "("
  ;
ForBegin
  : ForParen VariablesOrExpression
  ;
VariablesOrExpression
  : KEYWORD_VAR Variables
  | Expression
  ;
Variables
  : Variable
  | Variable "," Variables
  ;
Variable
  : IDENTIFIER
  | IDENTIFIER "=" AssignmentExpression
  ;
ExpressionOpt
  : 
  | Expression
  ;
Expression
  : AssignmentExpression
  | AssignmentExpression "," Expression
  ;
AssignmentExpression
  : ConditionalExpression
  | ConditionalExpression AssignmentOperator AssignmentExpression
  ;
AssignmentOperator
  : "="
  | ">>>="
  | ">>="
  | "<<="
  | "|="
  | "^="
  | "&="
  | "+="
  | "-="
  | "*="
  | "/="
  | "%="
  ;
ConditionalExpression
  : OrExpression
  | OrExpression "?" AssignmentExpression ":" AssignmentExpression
  ;
OrExpression
  : AndExpression
  | AndExpression "||" OrExpression
  ;
AndExpression
  : BitwiseOrExpression
  | BitwiseOrExpression "&&" AndExpression
  ;
BitwiseOrExpression
  : BitwiseXorExpression
  | BitwiseXorExpression "|" BitwiseOrExpression
  ;
BitwiseXorExpression
  : BitwiseAndExpression
  | BitwiseAndExpression "^" BitwiseXorExpression
  ;
BitwiseAndExpression
  : EqualityExpression
  | EqualityExpression "&" BitwiseAndExpression
  ;
EqualityExpression
  : RelationalExpression
  | RelationalExpression EqualityOperator EqualityExpression
  ;
EqualityOperator
  : "=="
  | "==="
  | "!="
  | "!=="
  ;
RelationalExpression
  : ShiftExpression
  | RelationalExpression RelationalOperator ShiftExpression
  ;
RelationalOperator
  : "<="
  | "<"
  | ">="
  | ">"
  ;
ShiftExpression
  : AdditiveExpression
  | AdditiveExpression ShiftOperator ShiftExpression
  ;
ShiftOperator
  : "<<"
  | ">>>"
  | ">>"
  ;
AdditiveExpression
  : MultiplicativeExpression
  | MultiplicativeExpression AdditiveOperator AdditiveExpression
  ;
AdditiveOperator
  : "+"
  | "-"
  ;  
MultiplicativeExpression
  : UnaryExpression
  | UnaryExpression MultiplicativeOperator MultiplicativeExpression
  ;
MultiplicativeOperator
  : "*"
  | "/"
  | "%"
  ;
UnaryExpression
  : MemberExpression
  | UnaryOperator UnaryExpression
  | "-" UnaryExpression
  | "+" UnaryExpression
  | PrefixOperator MemberExpression
  | MemberExpression PostfixOperator
  | KEYWORD_NEW Constructor
  | KEYWORD_DELETE MemberExpression
  ;
PrefixOperator
  : "++"
  | "--"
  ;
PostfixOperator
  : "++"
  | "--"
  ;
Constructor
  : KEYWORD_THIS "." CallExpression
  | CallExpression
  ;
CallExpression
  : IDENTIFIER
  | IDENTIFIER "(" ArgumentListOpt ")"
  | IDENTIFIER "." CallExpression
  ;
MemberExpression
  : PrimaryExpression
  | PrimaryExpression "." MemberExpression
  | PrimaryExpression "[" Expression "]"
  | PrimaryExpression "(" ArgumentListOpt ")"
  ;
ArgumentListOpt
  : 
  | ArgumentList
  ;
ArgumentList
  : AssignmentExpression
  | AssignmentExpression "," ArgumentList
  ;
PrimaryExpression
  : "(" Expression ")"
  | IDENTIFIER
  | Literal
  | KEYWORD_THIS
  ;
Literal
  : NullLiteral
  | UndefinedLiteral
  | BooleanLiteral
  | NumericLiteral
  | StringLiteral
  ;
UndefinedLiteral
  : "KEYWORD_UNDEFINED"
  ;
NullLiteral
  : "KEYWORD_NULL"
  ;
BooleanLiteral
  : "KEYWORD_TRUE"
  | "KEYWORD_FALSE"
  ;
NumericLiteral
  : "NUMERIC_LITERAL"
  ;
StringLiteral
  : "STRING_LITERAL"
  ;
