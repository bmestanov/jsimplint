interface Visitor {
  visit(node: ASTNode): void;
}

interface ASTNode {
  accept(visitor: Visitor): void;
}

class ProgramNode implements ASTNode {
  type: string;
  body: ASTNode[];
  loc: any;
  constructor(body: ASTNode[], loc: any) {
    this.type = "Program";
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.body.forEach(el => el.accept(visitor));
  }
}

class EmptyStatementNode implements ASTNode {
  type: string;
  loc: any;
  constructor(loc: any) {
    this.type = "EmptyStatement";
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class CompoundStatementNode implements ASTNode {
  type: string;
  body: ASTNode[];
  loc: any;
  constructor(body: ASTNode[], loc: any) {
    this.type = "CompoundStatement";
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.body.forEach(el => el.accept(visitor));
  }
}

class ExpressionNode implements ASTNode {
  type: string;
  expression: ASTNode;
  loc: any;
  constructor(expression: ASTNode, loc: any) {
    this.type = "ExpressionNode";
    this.expression = expression;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.expression.accept(visitor);
  }
}

class EmptyExpression implements ASTNode {
  type: string;
  loc: any;
  constructor(loc: any) {
    this.type = "EmptyExpression";
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class IfStatementNode implements ASTNode {
  type: string;
  test: ASTNode;
  consequent: ASTNode;
  alternate: ASTNode;
  loc: any;
  constructor(test: ASTNode, consequent: ASTNode, alternate: ASTNode, loc: any) {
    this.type = "IfStatement";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class BreakStatementNode implements ASTNode {
  type: string;
  label: any;
  loc: any;
  constructor(label: any, loc: any) {
    this.type = "BreakStatement";
    this.label = label;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class ContinueStatementNode implements ASTNode {
  type: string;
  label: any;
  loc: any;
  constructor(label: any, loc: any) {
    this.type = "ContinueStatement";
    this.label = label;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class WithStatementNode implements ASTNode {
  type: string;
  object: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(object: ASTNode, body: ASTNode, loc: any) {
    this.type = "WithStatement";
    this.object = object;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.object.accept(visitor);
    this.body.accept(visitor);
  }
}

class SwitchStatementNode implements ASTNode {
  type: string;
  discriminant: ASTNode;
  cases: ASTNode;
  loc: any;
  constructor(discriminant: ASTNode, cases: ASTNode, loc: any) {
    this.type = "SwitchStatement";
    this.discriminant = discriminant;
    this.cases = cases;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.discriminant.accept(visitor);
    this.cases.accept(visitor);
  }
}

class ReturnStatementNode implements ASTNode {
  type: string;
  argument: ASTNode;
  loc: any;
  constructor(argument: ASTNode, loc: any) {
    this.type = "ReturnStatement";
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.argument.accept(visitor);
  }
}

class ThrowStatementNode implements ASTNode {
  type: string;
  argument: ASTNode;
  loc: any;
  constructor(argument: ASTNode, loc: any) {
    this.type = "ThrowStatement";
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.argument.accept(visitor);
  }
}

class TryStatementNode implements ASTNode {
  type: string;
  block: ASTNode;
  handlers: ASTNode;
  finalizer: ASTNode;
  loc: any;
  constructor(block: ASTNode, handlers: ASTNode, finalizer: ASTNode, loc: any) {
    this.type = "TryStatement";
    this.block = block;
    this.handlers = handlers;
    this.finalizer = finalizer;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.block.accept(visitor);
    this.handlers.accept(visitor);
    this.finalizer.accept(visitor);
  }
}

class WhileStatementNode implements ASTNode {
  type: string;
  test: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(test: ASTNode, body: ASTNode, loc: any) {
    this.type = "WhileStatement";
    this.test = test;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.test.accept(visitor);
    this.body.accept(visitor);
  }
}

class DoWhileStatementNode implements ASTNode {
  type: string;
  test: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(body: ASTNode, test: ASTNode, loc: any) {
    this.type = "DoWhileStatement";
    this.body = body;
    this.test = test;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.test.accept(visitor);
    this.body.accept(visitor);
  }
}

class ForStatementNode implements ASTNode {
  type: string;
  init: ASTNode;
  test: ASTNode;
  update: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(init: ASTNode, test: ASTNode, update: ASTNode, body: ASTNode, loc: any) {
    this.type = "ForStatement";
    this.init = init;
    this.test = test;
    this.update = update;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.init.accept(visitor);
    this.test.accept(visitor);
    this.update.accept(visitor);
    this.body.accept(visitor);
  }
}

class ForInStatementNode implements ASTNode {
  type: string;
  left: ASTNode;
  right: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(left: ASTNode, right: ASTNode, body: ASTNode, loc: any) {
    this.type = "ForInStatement";
    this.left = left;
    this.right = right;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.left.accept(visitor);
    this.right.accept(visitor);
  }
}

class DebugggerStatementNode implements ASTNode {
  type: string;
  loc: any;
  constructor(loc: any) {
    this.type = "DebuggerStatement";
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class FunctionDeclarationNode implements ASTNode {
  type: string;
  name: string;
  params: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(name: string, params: ASTNode, body: ASTNode, loc: any) {
    this.type = "FunctionDeclaration";
    this.name = name;
    this.params = params;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.params.accept(visitor);
    this.body.accept(visitor);
  }
}

class FormalParameterNode implements ASTNode {
  type: string;
  variable: string;
  loc: any;
  constructor(variable: string, loc: any) {
    this.type = "FormalParameter";
    this.variable = variable;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class FormalParameterListNode implements ASTNode {
  type: string;
  parameters: ASTNode[];
  loc: any;
  constructor(parameters: ASTNode[], loc: any) {
    this.type = "FormalParameterList";
    this.parameters = parameters;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.parameters.forEach(param => param.accept(visitor));
  }
}

class FunctionArgumentListNode implements ASTNode {
  type: string;
  args: ASTNode[];
  loc: any;
  constructor(args: ASTNode[], loc: any) {
    this.type = "FunctionArgumentList";
    this.args = args;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.args.forEach(arg => arg.accept(visitor));
  }
}

class VariableDefinitionNode implements ASTNode {
  type: string;
  name: string;
  init?: ASTNode;
  loc: any;
  constructor(name: string, init: ASTNode, loc: any) {
    this.type = "VariableDefinition";
    this.name = name;
    this.init = init;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.init && this.init.accept(visitor);
  }
}

class VariableDefinitionListNode implements ASTNode {
  type: string;
  definitions: ASTNode[];
  loc: any;
  constructor(definitions: ASTNode[], loc: any) {
    this.type = "VariableDefinitionList";
    this.definitions = definitions;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.definitions.forEach(param => param.accept(visitor));
  }
}

class ThisExpressionNode implements ASTNode {
  type: string;
  loc: any;
  constructor(loc: any) {
    this.type = "ThisExpression";
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class UnaryExpressionNode implements ASTNode {
  type: string;
  operator: string;
  prefix: boolean;
  argument: ASTNode;
  loc: any;
  constructor(operator: string, prefix: boolean, argument: ASTNode, loc: any) {
    this.type = "UnaryExpression";
    this.operator = operator;
    this.prefix = prefix;
    this.argument = argument;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.argument.accept(visitor);
  }
}

class BinaryExpressionNode implements ASTNode {
  type: string;
  operator: string;
  left: ASTNode;
  right: ASTNode;
  loc: any;
  constructor(operator: string, left: ASTNode, right: ASTNode, loc: any) {
    this.type = "BinaryExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.left.accept(visitor);
    this.right.accept(visitor);
  }
}

class AssignmentExpressionNode implements ASTNode {
  type: string;
  operator: string;
  left: ASTNode;
  right: ASTNode;
  loc: any;
  constructor(operator: string, left: ASTNode, right: ASTNode, loc: any) {
    this.type = "AssignmentExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.left.accept(visitor);
    this.right.accept(visitor);
  }
}

class UpdateExpressionNode implements ASTNode {
  type: string;
  operator: string;
  argument: ASTNode;
  prefix: boolean;
  loc: any;
  constructor(operator: string, argument: ASTNode, prefix: boolean, loc: any) {
    this.type = "UpdateExpression";
    this.operator = operator;
    this.argument = argument;
    this.prefix = prefix;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.argument.accept(visitor);
  }
}

class ConditionalExpressionNode implements ASTNode {
  type: string;
  test: ASTNode;
  consequent: ASTNode;
  alternate: ASTNode;
  loc: any;
  constructor(test: ASTNode, consequent: ASTNode, alternate: ASTNode, loc: any) {
    this.type = "ConditionalExpression";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.test.accept(visitor);
    this.consequent.accept(visitor);
    this.alternate.accept(visitor);
  }
}

class NewExpressionNode implements ASTNode {
  type: string;
  constr: ASTNode;
  loc: any;
  constructor(constr: ASTNode, loc: any) {
    this.type = "NewExpression";
    this.constr = constr;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.constr.accept(visitor);
  }
}

class CallExpressionNode implements ASTNode {
  type: string;
  callee: string;
  arguments: ASTNode;
  loc: any;
  constructor(callee: string, args: ASTNode, loc: any) {
    this.type = "CallExpression";
    this.callee = callee;
    this.arguments = args;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.arguments.accept(visitor);
  }
}

class MemberExpressionNode implements ASTNode {
  type: string;
  object: ASTNode;
  property: ASTNode;
  computed: boolean;
  loc: any;
  constructor(object: ASTNode, property: ASTNode, computed: boolean, loc: any) {
    this.type = "MemberExpression";
    this.object = object;
    this.property = property;
    this.computed = computed;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.object.accept(visitor);
    this.property.accept(visitor);
  }
}

class SwitchCaseNode implements ASTNode {
  type: string;
  test: ASTNode;
  consequent: ASTNode;
  loc: any;
  constructor(test: ASTNode, consequent: ASTNode, loc: any) {
    this.type = "SwitchCase";
    this.test = test;
    this.consequent = consequent;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.test.accept(visitor);
    this.consequent.accept(visitor);
  }
}

class CatchClauseNode implements ASTNode {
  type: string;
  param: ASTNode;
  body: ASTNode;
  loc: any;
  constructor(param: ASTNode, body: ASTNode, loc: any) {
    this.type = "CatchClause";
    this.param = param;
    this.body = body;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
    this.param.accept(visitor);
    this.body.accept(visitor);
  }
}

class IdentifierNode implements ASTNode {
  type: string;
  name: string;
  loc: any;
  constructor(name: string, loc: any) {
    this.type = "Identifier";
    this.name = name;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

class LiteralNode implements ASTNode {
  type: string;
  value: any;
  loc: any;
  constructor(value: any, loc: any) {
    this.type = "Literal";
    this.value = value;
    this.loc = loc;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}

module.exports = {
  ProgramNode,
  EmptyStatementNode,
  CompoundStatementNode,
  ExpressionNode,
  EmptyExpression,
  FunctionDeclarationNode,
  IfStatementNode,
  BreakStatementNode,
  ContinueStatementNode,
  WithStatementNode,
  SwitchStatementNode,
  ReturnStatementNode,
  ThrowStatementNode,
  TryStatementNode,
  WhileStatementNode,
  DoWhileStatementNode,
  ForStatementNode,
  ForInStatementNode,
  DebugggerStatementNode,
  VariableDefinitionNode,
  VariableDefinitionListNode,
  FunctionArgumentListNode,
  ThisExpressionNode,
  UnaryExpressionNode,
  BinaryExpressionNode,
  AssignmentExpressionNode,
  UpdateExpressionNode,
  ConditionalExpressionNode,
  NewExpressionNode,
  CallExpressionNode,
  FormalParameterNode,
  FormalParameterListNode,
  MemberExpressionNode,
  SwitchCaseNode,
  CatchClauseNode,
  IdentifierNode,
  LiteralNode,
};
