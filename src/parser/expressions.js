class ProgramNode {
  constructor(body, loc) {
    this.type = "Program";
    this.body = body;
    this.loc = loc;
  }
}

class EmptyStatementNode {
  constructor(loc) {
    this.type = "EmptyStatement";
    this.loc = loc;
  }
}

class BlockStatementNode {
  constructor(body, loc) {
    this.type = "BlockStatement";
    this.body = body;
    this.loc = loc;
  }
}

class ExpressionStatementNode {
  constructor(expression, loc) {
    this.type = "ExpressionStatement";
    this.expression = expression;
    this.loc = loc;
  }
}

class IfStatementNode {
  constructor(test, consequent, alternate, loc) {
    this.type = "IfStatement";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
}

class LabeledStatementNode {
  constructor(label, body, loc) {
    this.type = "LabeledStatement";
    this.label = label;
    this.body = body;
    this.loc = loc;
  }
}

class BreakStatementNode {
  constructor(label, loc) {
    this.type = "BreakStatement";
    this.label = label;
    this.loc = loc;
  }
}

class ContinueStatementNode {
  constructor(label, loc) {
    this.type = "ContinueStatement";
    this.label = label;
    this.loc = loc;
  }
}

class WithStatementNode {
  constructor(object, body, loc) {
    this.type = "WithStatement";
    this.object = object;
    this.body = body;
    this.loc = loc;
  }
}

class SwitchStatementNode {
  constructor(discriminant, cases, loc) {
    this.type = "SwitchStatement";
    this.discriminant = discriminant;
    this.cases = cases;
    this.loc = loc;
  }
}

class ReturnStatementNode {
  constructor(argument, loc) {
    this.type = "ReturnStatement";
    this.argument = argument;
    this.loc = loc;
  }
}

class ThrowStatementNode {
  constructor(argument, loc) {
    this.type = "ThrowStatement";
    this.argument = argument;
    this.loc = loc;
  }
}

class TryStatementNode {
  constructor(block, handlers, finalizer, loc) {
    this.type = "TryStatement";
    this.block = block;
    this.handlers = handlers; // Multiple catch clauses are SpiderMonkey specific
    this.finalizer = finalizer;
    this.loc = loc;
  }
}

class WhileStatementNode {
  constructor(test, body, loc) {
    this.type = "WhileStatement";
    this.test = test;
    this.body = body;
    this.loc = loc;
  }
}

class DoWhileStatementNode {
  constructor(body, test, loc) {
    this.type = "DoWhileStatement";
    this.body = body;
    this.test = test;
    this.loc = loc;
  }
}

class ForStatementNode {
  constructor(init, test, update, body, loc) {
    this.type = "ForStatement";
    this.init = init;
    this.test = test;
    this.update = update;
    this.body = body;
    this.loc = loc;
  }
}

class ForInStatementNode {
  constructor(left, right, body, loc) {
    this.type = "ForInStatement";
    this.left = left;
    this.right = right;
    this.body = body;
    this.loc = loc;
  }
}

class DebugggerStatementNode {
  constructor(loc) {
    this.type = "DebuggerStatement";
    this.loc = loc;
  }
}

class FunctionDeclarationNode {
  constructor(id, params, body, generator, expression, loc) {
    this.type = "FunctionDeclaration";
    this.id = id;
    this.params = params;
    this.body = body;
    this.generator = generator;
    this.expression = expression;
    this.loc = loc;
  }
}

class VariableDeclarationNode {
  constructor(declarations, kind, loc) {
    this.type = "VariableDeclaration";
    this.declarations = declarations;
    this.kind = kind;
    this.loc = loc;
  }
}

class VariableDeclaratorNode {
  constructor(id, init, loc) {
    this.type = "VariableDeclarator";
    this.id = id;
    this.init = init;
    this.loc = loc;
  }
}

class ThisExpressionNode {
  constructor(loc) {
    this.type = "ThisExpression";
    this.loc = loc;
  }
}

class ArrayExpressionNode {
  constructor(elements, loc) {
    this.type = "ArrayExpression";
    this.elements = elements;
    this.loc = loc;
  }
}

class ObjectExpressionNode {
  constructor(properties, loc) {
    this.type = "ObjectExpression";
    this.properties = properties;
    this.loc = loc;
  }
}

class FunctionExpressionNode {
  constructor(id, params, body, generator, expression, loc) {
    this.type = "FunctionExpression";
    this.id = id;
    this.params = params;
    this.body = body;
    this.generator = generator;
    this.expression = expression;
    this.loc = loc;
  }
}

class SequenceExpressionNode {
  constructor(expressions, loc) {
    this.type = "SequenceExpression";
    this.expressions = expressions;
    this.loc = loc;
  }
}

class UnaryExpressionNode {
  constructor(operator, prefix, argument, loc) {
    this.type = "UnaryExpression";
    this.operator = operator;
    this.prefix = prefix;
    this.argument = argument;
    this.loc = loc;
  }
}

class BinaryExpressionNode {
  constructor(operator, left, right, loc) {
    this.type = "BinaryExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
}

class AssignmentExpressionNode {
  constructor(operator, left, right, loc) {
    this.type = "AssignmentExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
}

class UpdateExpressionNode {
  constructor(operator, argument, prefix, loc) {
    this.type = "UpdateExpression";
    this.operator = operator;
    this.argument = argument;
    this.prefix = prefix;
    this.loc = loc;
  }
}

class LogicalExpressionNode {
  constructor(operator, left, right, loc) {
    this.type = "LogicalExpression";
    this.operator = operator;
    this.left = left;
    this.right = right;
    this.loc = loc;
  }
}

class ConditionalExpressionNode {
  constructor(test, consequent, alternate, loc) {
    this.type = "ConditionalExpression";
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
    this.loc = loc;
  }
}

class NewExpressionNode {
  constructor(callee, args, loc) {
    this.type = "NewExpression";
    this.callee = callee;
    this.arguments = args;
    this.loc = loc;
  }
}

class CallExpressionNode {
  constructor(callee, args, loc) {
    this.type = "CallExpression";
    this.callee = callee;
    this.arguments = args;
    this.loc = loc;
  }
}

class MemberExpressionNode {
  constructor(object, property, computed, loc) {
    this.type = "MemberExpression";
    this.object = object;
    this.property = property;
    this.computed = computed;
    this.loc = loc;
  }
}

class SwitchCaseNode {
  constructor(test, consequent, loc) {
    this.type = "SwitchCase";
    this.test = test;
    this.consequent = consequent;
    this.loc = loc;
  }
}

class CatchClauseNode {
  constructor(param, body, loc) {
    this.type = "CatchClause";
    this.param = param;
    this.guard = null; /* Firefox specific */
    this.body = body;
    this.loc = loc;
  }
}

class IdentifierNode {
  constructor(name, loc) {
    this.type = "Identifier";
    this.name = name;
    this.loc = loc;
  }
}

class LiteralNode {
  constructor(value, loc) {
    this.type = "Literal";
    this.value = value;
    this.loc = loc;
  }
}

class SourceLocation {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Position {
  constructor(line, column) {
    this.line = line;
    this.column = column;
  }
}

class Analyzer {
  constructor() {
    this.variableDeclarations = [];
    this.variableReferences = [];
    this.tokens = [];
  }
}

module.exports = {
  ProgramNode,
  EmptyStatementNode,
  BlockStatementNode,
  ExpressionStatementNode,
  IfStatementNode,
  LabeledStatementNode,
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
  FunctionDeclarationNode,
  VariableDeclarationNode,
  VariableDeclaratorNode,
  ThisExpressionNode,
  ArrayExpressionNode,
  ObjectExpressionNode,
  FunctionExpressionNode,
  SequenceExpressionNode,
  UnaryExpressionNode,
  BinaryExpressionNode,
  AssignmentExpressionNode,
  UpdateExpressionNode,
  LogicalExpressionNode,
  ConditionalExpressionNode,
  NewExpressionNode,
  CallExpressionNode,
  MemberExpressionNode,
  SwitchCaseNode,
  CatchClauseNode,
  IdentifierNode,
  LiteralNode,
  SourceLocation,
  Position,
};
