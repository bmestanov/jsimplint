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
StringLiteral (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\')

%options flex

%%
\s+ ;
"/*"(.|\r|\n)*?"*/" ;
"//".*($|\r\n|\r|\n) ;
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
  : Elements EOF
    { $$ = new yy.ProgramNode($1, @1); return $$; }
  ;
Elements
  :
    { $$ = []; }
  | Elements Element
    { $$ =  $1.concat($2); }
  ;
Element
  : KEYWORD_FUNCTION IDENTIFIER "(" ParameterListOpt ")" CompoundStatement
    { $$ = new yy.FunctionDeclarationNode($2, $4, $6, @1); }
  | Statement
  ;
ParameterListOpt
  : 
    { $$ = new yy.FormalParameterListNode([], @1); }
  | ParameterList
    { $$ = new yy.FormalParameterListNode($1, @1); }
  ;
ParameterList
  : IDENTIFIER
    { $$ = [new yy.FormalParameterNode($1, @1)]; }
  | ParameterList "," ParameterList
    { $$ = $1.concat($3); }
  ;
CompoundStatement
  : "{" Statements "}"
    { $$ = new yy.CompoundStatementNode($2, @1); }
  ;
Statements
  : 
    { $$ = []; }
  | Statements Statement
    { $$ =  $1.concat($2); }
  ;
Statement
  :
  | ";"
    { $$ = new yy.EmptyStatementNode(@1); }
  | KEYWORD_IF Condition Statement
    { $$ = new yy.IfStatementNode($2, $3, null, @1); }
  | KEYWORD_IF Condition Statement KEYWORD_ELSE Statement
    { $$ = new yy.IfStatementNode($2, $3, null, @1); }
  | KEYWORD_WHILE Condition Statement
    { $$ = new yy.WhileStatementNode($2, $3, @1); }
  | ForParen ";" ExpressionOpt ";" ExpressionOpt ")" Statement
    { $$ = new yy.ForStatementNode(null, $3, $5, $7, @1); }
  | ForBegin ";" ExpressionOpt ";" ExpressionOpt ")" Statement
    { $$ = new yy.ForStatementNode($1, $3, $5, $7, @1); }
  | ForBegin KEYWORD_IN Expression ")" Statement
    { $$ = new yy.ForStatementNode($1, $3, $5, @1); }
  | KEYWORD_BREAK ";"
    { $$ = new yy.BreakStatementNode(@1); }
  | KEYWORD_CONTINUE ";"
    { $$ = new yy.ContinueStatementNode(@1); }
  | KEYWORD_WITH "(" Expression ")" Statement
    { $$ = new yy.WithStatementNode($3, $5, @1); }  
  | KEYWORD_RETURN ExpressionOpt ";"
    { $$ = new yy.ReturnStatementNode($2, @1); }  
  | CompoundStatement
  | VariablesOrExpression
  | VariablesOrExpression ";"
  ;
Condition
  : "(" Expression ")"
    { $$ = $2; }
  ;
ForParen
  : KEYWORD_FOR "("
  ;
ForBegin
  : ForParen VariablesOrExpression
    { $$ = $2; }
  ;
VariablesOrExpression
  : KEYWORD_VAR Variables
    { $$ = new yy.VariableDefinitionListNode($2, @1); }
  | Expression
  ;
Variables
  : Variable
    { $$ = [$1]; }
  | Variables "," Variable
    { $$ = $1.concat($3); }
  ;
Variable
  : IDENTIFIER
    { $$ = new yy.VariableDefinitionNode($1, undefined, @1); }
  | IDENTIFIER "=" AssignmentExpression
    { $$ = new yy.VariableDefinitionNode($1, $3, @1); }
  ;
ExpressionOpt
  : 
  { $$ = new yy.EmptyExpression(@1); }
  | Expression
  ;
Expression
  : AssignmentExpression
  | AssignmentExpression "," Expression
  ;
AssignmentExpression
  : ConditionalExpression
  | ConditionalExpression AssignmentOperator AssignmentExpression
    { $$ = new yy.AssignmentExpressionNode($2, $1, $3, @1); }
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
    { $$ = new yy.ConditionalExpression($1, $3, $5, @1); }
  ;
OrExpression
  : AndExpression
  | AndExpression "||" OrExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
AndExpression
  : BitwiseOrExpression
  | BitwiseOrExpression "&&" AndExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
BitwiseOrExpression
  : BitwiseXorExpression
  | BitwiseXorExpression "|" BitwiseOrExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
BitwiseXorExpression
  : BitwiseAndExpression
  | BitwiseAndExpression "^" BitwiseXorExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
BitwiseAndExpression
  : EqualityExpression
  | EqualityExpression "&" BitwiseAndExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
EqualityExpression
  : RelationalExpression
  | RelationalExpression EqualityOperator EqualityExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
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
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
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
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
ShiftOperator
  : "<<"
  | ">>>"
  | ">>"
  ;
AdditiveExpression
  : MultiplicativeExpression
  | MultiplicativeExpression AdditiveOperator AdditiveExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
AdditiveOperator
  : "+"
  | "-"
  ;  
MultiplicativeExpression
  : UnaryExpression
  | UnaryExpression MultiplicativeOperator MultiplicativeExpression
    { $$ = new yy.BinaryExpressionNode($2, $1, $3, @1); }
  ;
MultiplicativeOperator
  : "*"
  | "/"
  | "%"
  ;
UnaryExpression
  : MemberExpression
  | PrefixOperator MemberExpression
    { $$ = new yy.UnaryExpressionNode($1, true, $2, @1); }
  | MemberExpression PostfixOperator
    { $$ = new yy.UnaryExpressionNode($2, false, $1, @1); }
  | KEYWORD_NEW Constructor
    { $$ = new yy.NewExpressionNode($2, @1); }  
  ;
PrefixOperator
  : "++"
  | "--"
  | "-"
  | "+"
  | "!"
  | "~"
  | KEYWORD_TYPEOF
  | KEYWORD_DELETE
  ;
PostfixOperator
  : "++"
  | "--"
  ;
Constructor
  : KEYWORD_THIS "." ConstructorCall
  | ConstructorCall
  ;
ConstructorCall
  : IDENTIFIER
  | IDENTIFIER "(" ArgumentListOpt ")"
  | IDENTIFIER "." ConstructorCall
  ;
MemberExpression
  : PrimaryExpression
  | PrimaryExpression "." MemberExpression
    { $$ = new yy.MemberExpressionNode($1, $3, false, @1); }
  | PrimaryExpression "[" Expression "]"
    { $$ = new yy.MemberExpressionNode($1, $3, true, @1); }
  | PrimaryExpression "(" ArgumentListOpt ")"
    { $$ = new yy.CallExpressionNode($1, $3, @1); }
  ;
ArgumentListOpt
  : 
    { $$ = new yy.FunctionArgumentListNode([], @1); }
  | ArgumentList
    { $$ = new yy.FunctionArgumentListNode($1, @1); }
  ;
ArgumentList
  : AssignmentExpression
    { $$ = [$1]; }
  | ArgumentList "," AssignmentExpression
    { $$ = $1.concat($3); }
  ;
PrimaryExpression
  : "(" Expression ")"
    { $$ = new yy.ExpressionNode($2, @1); }
  | Literal
    { $$ = new yy.ExpressionNode($1, @1); }
  | IDENTIFIER
    { $$ = new yy.IdentifierNode($1, @1); }
  | KEYWORD_THIS
    { $$ = new yy.ThisExpressionNode($1, @1); }
  ;
Literal
  : NullLiteral
    { $$ = new yy.LiteralNode(null, @1); }
  | UndefinedLiteral
    { $$ = new yy.LiteralNode(undefined, @1); }
  | BooleanLiteral
    { $$ = new yy.LiteralNode(yytext === 'true', @1); }
  | NumericLiteral
    { $$ = new yy.LiteralNode(Number(yytext), @1); }
  | StringLiteral
    { $$ = new yy.LiteralNode(yytext, @1); }
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
