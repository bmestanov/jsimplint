export type NodeType =
  "Program"
  | "EmptyStatement"
  | "CompoundStatement"
  | "ExpressionNode"
  | "EmptyExpression"
  | "IfStatement"
  | "BreakStatement"
  | "ContinueStatement"
  | "WithStatement"
  | "SwitchStatement"
  | "ReturnStatement"
  | "ThrowStatement"
  | "TryStatement"
  | "WhileStatement"
  | "DoWhileStatement"
  | "ForStatement"
  | "ForInStatement"
  | "DebuggerStatement"
  | "FunctionDeclaration"
  | "FormalParameter"
  | "FormalParameterList"
  | "FunctionArgumentList"
  | "VariableDefinition"
  | "VariableDefinitionList"
  | "ThisExpression"
  | "UnaryExpression"
  | "BinaryExpression"
  | "AssignmentExpression"
  | "UpdateExpression"
  | "ConditionalExpression"
  | "NewExpression"
  | "CallExpression"
  | "MemberExpression"
  | "SwitchCase"
  | "CatchClause"
  | "Identifier"
  | "Literal"
  ;

export interface Visitor {
  visit(node: ASTNode, context: NodeType[]): void;
}

export interface Location {
  first_line: number;
  first_column: number;
  last_line: number;
  last_column: number;
}

export interface ASTNode {
  type: NodeType;
  loc: Location;
  accept(visitor: Visitor, context: NodeType[]): void;
}

export class ProgramNode implements ASTNode {
  type: NodeType;
  body: ASTNode[];
  loc: Location;
  constructor(body: ASTNode[], loc: Location) {
    this.type = "Program";
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.body.forEach(el => el.accept(visitor, [...context, this.type]));
  }
}

export class EmptyStatementNode implements ASTNode {
  type: NodeType;
  loc: Location;
  constructor(loc: Location) {
    this.type = "EmptyStatement";
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class CompoundStatementNode implements ASTNode {
  type: NodeType;
  body: ASTNode[];
  loc: Location;
  constructor(body: ASTNode[], loc: Location) {
    this.type = "CompoundStatement";
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.body.forEach(el => el.accept(visitor, [...context, this.type]));
  }
}

export class ExpressionNode implements ASTNode {
  type: NodeType;
  expression: ASTNode;
  loc: Location;
  constructor(expression: ASTNode, loc: Location) {
    this.type = "ExpressionNode";
    this.expression = expression;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.expression.accept(visitor, [...context, this.type]);
  }
}

export class EmptyExpression implements ASTNode {
  type: NodeType;
  loc: Location;
  constructor(loc: Location) {
    this.type = "EmptyExpression";
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class IfStatementNode implements ASTNode {
  type: NodeType;
  test: ASTNode;
  consequent: ASTNode;
  alternate: ASTNode;
  loc: Location;
  constructor(test: ASTNode, consequent: ASTNode, alternate: ASTNode, loc: Location) {
    this.type = "IfStatement";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class BreakStatementNode implements ASTNode {
  type: NodeType;
  label: any;
  loc: Location;
  constructor(label: any, loc: Location) {
    this.type = "BreakStatement";
    this.label = label;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class ContinueStatementNode implements ASTNode {
  type: NodeType;
  label: any;
  loc: Location;
  constructor(label: any, loc: Location) {
    this.type = "ContinueStatement";
    this.label = label;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class WithStatementNode implements ASTNode {
  type: NodeType;
  object: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(object: ASTNode, body: ASTNode, loc: Location) {
    this.type = "WithStatement";
    this.object = object;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.object.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class SwitchStatementNode implements ASTNode {
  type: NodeType;
  discriminant: ASTNode;
  cases: ASTNode;
  loc: Location;
  constructor(discriminant: ASTNode, cases: ASTNode, loc: Location) {
    this.type = "SwitchStatement";
    this.discriminant = discriminant;
    this.cases = cases;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.discriminant.accept(visitor, [...context, this.type]);
    this.cases.accept(visitor, [...context, this.type]);
  }
}

export class ReturnStatementNode implements ASTNode {
  type: NodeType;
  argument: ASTNode;
  loc: Location;
  constructor(argument: ASTNode, loc: Location) {
    this.type = "ReturnStatement";
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.argument.accept(visitor, [...context, this.type]);
  }
}

export class ThrowStatementNode implements ASTNode {
  type: NodeType;
  argument: ASTNode;
  loc: Location;
  constructor(argument: ASTNode, loc: Location) {
    this.type = "ThrowStatement";
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.argument.accept(visitor, [...context, this.type]);
  }
}

export class TryStatementNode implements ASTNode {
  type: NodeType;
  block: ASTNode;
  handlers: ASTNode;
  finalizer: ASTNode;
  loc: Location;
  constructor(block: ASTNode, handlers: ASTNode, finalizer: ASTNode, loc: Location) {
    this.type = "TryStatement";
    this.block = block;
    this.handlers = handlers;
    this.finalizer = finalizer;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.block.accept(visitor, [...context, this.type]);
    this.handlers.accept(visitor, [...context, this.type]);
    this.finalizer.accept(visitor, [...context, this.type]);
  }
}

export class WhileStatementNode implements ASTNode {
  type: NodeType;
  test: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(test: ASTNode, body: ASTNode, loc: Location) {
    this.type = "WhileStatement";
    this.test = test;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.test.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class DoWhileStatementNode implements ASTNode {
  type: NodeType;
  test: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(body: ASTNode, test: ASTNode, loc: Location) {
    this.type = "DoWhileStatement";
    this.body = body;
    this.test = test;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.test.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class ForStatementNode implements ASTNode {
  type: NodeType;
  init: ASTNode;
  test: ASTNode;
  update: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(init: ASTNode, test: ASTNode, update: ASTNode, body: ASTNode, loc: Location) {
    this.type = "ForStatement";
    this.init = init;
    this.test = test;
    this.update = update;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.init.accept(visitor, [...context, this.type]);
    this.test.accept(visitor, [...context, this.type]);
    this.update.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class ForInStatementNode implements ASTNode {
  type: NodeType;
  left: ASTNode;
  right: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(left: ASTNode, right: ASTNode, body: ASTNode, loc: Location) {
    this.type = "ForInStatement";
    this.left = left;
    this.right = right;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.left.accept(visitor, [...context, this.type]);
    this.right.accept(visitor, [...context, this.type]);
  }
}

export class DebugggerStatementNode implements ASTNode {
  type: NodeType;
  loc: Location;
  constructor(loc: Location) {
    this.type = "DebuggerStatement";
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class FunctionDeclarationNode implements ASTNode {
  type: NodeType;
  name: string;
  params: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(name: string, params: ASTNode, body: ASTNode, loc: Location) {
    this.type = "FunctionDeclaration";
    this.name = name;
    this.params = params;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.params.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class FormalParameterNode implements ASTNode {
  type: NodeType;
  variable: string;
  loc: Location;
  constructor(variable: string, loc: Location) {
    this.type = "FormalParameter";
    this.variable = variable;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class FormalParameterListNode implements ASTNode {
  type: NodeType;
  parameters: ASTNode[];
  loc: Location;
  constructor(parameters: ASTNode[], loc: Location) {
    this.type = "FormalParameterList";
    this.parameters = parameters;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.parameters.forEach(param => param.accept(visitor, [...context, this.type]));
  }
}

export class FunctionArgumentListNode implements ASTNode {
  type: NodeType;
  args: ASTNode[];
  loc: Location;
  constructor(args: ASTNode[], loc: Location) {
    this.type = "FunctionArgumentList";
    this.args = args;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.args.forEach(arg => arg.accept(visitor, [...context, this.type]));
  }
}

export class VariableDefinitionNode implements ASTNode {
  type: NodeType;
  name: string;
  init?: ASTNode;
  loc: Location;
  constructor(name: string, init: ASTNode, loc: Location) {
    this.type = "VariableDefinition";
    this.name = name;
    this.init = init;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.init && this.init.accept(visitor, [...context, this.type]);
  }
}

export class VariableDefinitionListNode implements ASTNode {
  type: NodeType;
  definitions: ASTNode[];
  loc: Location;
  constructor(definitions: ASTNode[], loc: Location) {
    this.type = "VariableDefinitionList";
    this.definitions = definitions;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.definitions.forEach(param => param.accept(visitor, [...context, this.type]));
  }
}

export class ThisExpressionNode implements ASTNode {
  type: NodeType;
  loc: Location;
  constructor(loc: Location) {
    this.type = "ThisExpression";
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class UnaryExpressionNode implements ASTNode {
  type: NodeType;
  operator: string;
  prefix: boolean;
  argument: ASTNode;
  loc: Location;
  constructor(operator: string, prefix: boolean, argument: ASTNode, loc: Location) {
    this.type = "UnaryExpression";
    this.operator = operator;
    this.prefix = prefix;
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.argument.accept(visitor, [...context, this.type]);
  }
}

export class BinaryExpressionNode implements ASTNode {
  type: NodeType;
  operator: string;
  left: ASTNode;
  right: ASTNode;
  loc: Location;
  constructor(operator: string, left: ASTNode, right: ASTNode, loc: Location) {
    this.type = "BinaryExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.left.accept(visitor, [...context, this.type]);
    this.right.accept(visitor, [...context, this.type]);
  }
}

export class AssignmentExpressionNode implements ASTNode {
  type: NodeType;
  operator: string;
  left: ASTNode;
  right: ASTNode;
  loc: Location;
  constructor(operator: string, left: ASTNode, right: ASTNode, loc: Location) {
    this.type = "AssignmentExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.left.accept(visitor, [...context, this.type]);
    this.right.accept(visitor, [...context, this.type]);
  }
}

export class UpdateExpressionNode implements ASTNode {
  type: NodeType;
  operator: string;
  argument: ASTNode;
  prefix: boolean;
  loc: Location;
  constructor(operator: string, argument: ASTNode, prefix: boolean, loc: Location) {
    this.type = "UpdateExpression";
    this.operator = operator;
    this.argument = argument;
    this.prefix = prefix;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.argument.accept(visitor, [...context, this.type]);
  }
}

export class ConditionalExpressionNode implements ASTNode {
  type: NodeType;
  test: ASTNode;
  consequent: ASTNode;
  alternate: ASTNode;
  loc: Location;
  constructor(test: ASTNode, consequent: ASTNode, alternate: ASTNode, loc: Location) {
    this.type = "ConditionalExpression";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.test.accept(visitor, [...context, this.type]);
    this.consequent.accept(visitor, [...context, this.type]);
    this.alternate.accept(visitor, [...context, this.type]);
  }
}

export class NewExpressionNode implements ASTNode {
  type: NodeType;
  constr: ASTNode;
  loc: Location;
  constructor(constr: ASTNode, loc: Location) {
    this.type = "NewExpression";
    this.constr = constr;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.constr.accept(visitor, [...context, this.type]);
  }
}

export class CallExpressionNode implements ASTNode {
  type: NodeType;
  callee: ASTNode;
  arguments: ASTNode;
  loc: Location;
  constructor(callee: ASTNode, args: ASTNode, loc: Location) {
    this.type = "CallExpression";
    this.callee = callee;
    this.arguments = args;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.callee.accept(visitor, [...context, this.type]);
    this.arguments.accept(visitor, [...context, this.type]);
  }
}

export class MemberExpressionNode implements ASTNode {
  type: NodeType;
  object: ASTNode;
  property: ASTNode;
  computed: boolean;
  loc: Location;
  constructor(object: ASTNode, property: ASTNode, computed: boolean, loc: Location) {
    this.type = "MemberExpression";
    this.object = object;
    this.property = property;
    this.computed = computed;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.object.accept(visitor, [...context, this.type]);
    this.property.accept(visitor, [...context, this.type]);
  }
}

export class SwitchCaseNode implements ASTNode {
  type: NodeType;
  test: ASTNode;
  consequent: ASTNode;
  loc: Location;
  constructor(test: ASTNode, consequent: ASTNode, loc: Location) {
    this.type = "SwitchCase";
    this.test = test;
    this.consequent = consequent;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.test.accept(visitor, [...context, this.type]);
    this.consequent.accept(visitor, [...context, this.type]);
  }
}

export class CatchClauseNode implements ASTNode {
  type: NodeType;
  param: ASTNode;
  body: ASTNode;
  loc: Location;
  constructor(param: ASTNode, body: ASTNode, loc: Location) {
    this.type = "CatchClause";
    this.param = param;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
    this.param.accept(visitor, [...context, this.type]);
    this.body.accept(visitor, [...context, this.type]);
  }
}

export class IdentifierNode implements ASTNode {
  type: NodeType;
  name: string;
  loc: Location;
  constructor(name: string, loc: Location) {
    this.type = "Identifier";
    this.name = name;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}

export class LiteralNode implements ASTNode {
  type: NodeType;
  value: any;
  loc: Location;
  constructor(value: any, loc: Location) {
    this.type = "Literal";
    this.value = value;
    this.loc = loc;
  }
  accept(visitor: Visitor, context: NodeType[]): void {
    visitor.visit(this, context);
  }
}
