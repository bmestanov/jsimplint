var ProgramNode = /** @class */ (function () {
    function ProgramNode(body, loc) {
        this.type = "Program";
        this.body = body;
        this.loc = loc;
    }
    ProgramNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.body.forEach(function (el) { return el.accept(visitor); });
    };
    return ProgramNode;
}());
var EmptyStatementNode = /** @class */ (function () {
    function EmptyStatementNode(loc) {
        this.type = "EmptyStatement";
        this.loc = loc;
    }
    EmptyStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return EmptyStatementNode;
}());
var CompoundStatementNode = /** @class */ (function () {
    function CompoundStatementNode(body, loc) {
        this.type = "CompoundStatement";
        this.body = body;
        this.loc = loc;
    }
    CompoundStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.body.forEach(function (el) { return el.accept(visitor); });
    };
    return CompoundStatementNode;
}());
var ExpressionNode = /** @class */ (function () {
    function ExpressionNode(expression, loc) {
        this.type = "ExpressionNode";
        this.expression = expression;
        this.loc = loc;
    }
    ExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.expression.accept(visitor);
    };
    return ExpressionNode;
}());
var EmptyExpression = /** @class */ (function () {
    function EmptyExpression(loc) {
        this.type = "EmptyExpression";
        this.loc = loc;
    }
    EmptyExpression.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return EmptyExpression;
}());
var IfStatementNode = /** @class */ (function () {
    function IfStatementNode(test, consequent, alternate, loc) {
        this.type = "IfStatement";
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        this.loc = loc;
    }
    IfStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return IfStatementNode;
}());
var BreakStatementNode = /** @class */ (function () {
    function BreakStatementNode(label, loc) {
        this.type = "BreakStatement";
        this.label = label;
        this.loc = loc;
    }
    BreakStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return BreakStatementNode;
}());
var ContinueStatementNode = /** @class */ (function () {
    function ContinueStatementNode(label, loc) {
        this.type = "ContinueStatement";
        this.label = label;
        this.loc = loc;
    }
    ContinueStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return ContinueStatementNode;
}());
var WithStatementNode = /** @class */ (function () {
    function WithStatementNode(object, body, loc) {
        this.type = "WithStatement";
        this.object = object;
        this.body = body;
        this.loc = loc;
    }
    WithStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.object.accept(visitor);
        this.body.accept(visitor);
    };
    return WithStatementNode;
}());
var SwitchStatementNode = /** @class */ (function () {
    function SwitchStatementNode(discriminant, cases, loc) {
        this.type = "SwitchStatement";
        this.discriminant = discriminant;
        this.cases = cases;
        this.loc = loc;
    }
    SwitchStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.discriminant.accept(visitor);
        this.cases.accept(visitor);
    };
    return SwitchStatementNode;
}());
var ReturnStatementNode = /** @class */ (function () {
    function ReturnStatementNode(argument, loc) {
        this.type = "ReturnStatement";
        this.argument = argument;
        this.loc = loc;
    }
    ReturnStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.argument.accept(visitor);
    };
    return ReturnStatementNode;
}());
var ThrowStatementNode = /** @class */ (function () {
    function ThrowStatementNode(argument, loc) {
        this.type = "ThrowStatement";
        this.argument = argument;
        this.loc = loc;
    }
    ThrowStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.argument.accept(visitor);
    };
    return ThrowStatementNode;
}());
var TryStatementNode = /** @class */ (function () {
    function TryStatementNode(block, handlers, finalizer, loc) {
        this.type = "TryStatement";
        this.block = block;
        this.handlers = handlers;
        this.finalizer = finalizer;
        this.loc = loc;
    }
    TryStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.block.accept(visitor);
        this.handlers.accept(visitor);
        this.finalizer.accept(visitor);
    };
    return TryStatementNode;
}());
var WhileStatementNode = /** @class */ (function () {
    function WhileStatementNode(test, body, loc) {
        this.type = "WhileStatement";
        this.test = test;
        this.body = body;
        this.loc = loc;
    }
    WhileStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.test.accept(visitor);
        this.body.accept(visitor);
    };
    return WhileStatementNode;
}());
var DoWhileStatementNode = /** @class */ (function () {
    function DoWhileStatementNode(body, test, loc) {
        this.type = "DoWhileStatement";
        this.body = body;
        this.test = test;
        this.loc = loc;
    }
    DoWhileStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.test.accept(visitor);
        this.body.accept(visitor);
    };
    return DoWhileStatementNode;
}());
var ForStatementNode = /** @class */ (function () {
    function ForStatementNode(init, test, update, body, loc) {
        this.type = "ForStatement";
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
        this.loc = loc;
    }
    ForStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.init.accept(visitor);
        this.test.accept(visitor);
        this.update.accept(visitor);
        this.body.accept(visitor);
    };
    return ForStatementNode;
}());
var ForInStatementNode = /** @class */ (function () {
    function ForInStatementNode(left, right, body, loc) {
        this.type = "ForInStatement";
        this.left = left;
        this.right = right;
        this.body = body;
        this.loc = loc;
    }
    ForInStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.left.accept(visitor);
        this.right.accept(visitor);
    };
    return ForInStatementNode;
}());
var DebugggerStatementNode = /** @class */ (function () {
    function DebugggerStatementNode(loc) {
        this.type = "DebuggerStatement";
        this.loc = loc;
    }
    DebugggerStatementNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return DebugggerStatementNode;
}());
var FunctionDeclarationNode = /** @class */ (function () {
    function FunctionDeclarationNode(name, params, body, loc) {
        this.type = "FunctionDeclaration";
        this.name = name;
        this.params = params;
        this.body = body;
        this.loc = loc;
    }
    FunctionDeclarationNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.params.accept(visitor);
        this.body.accept(visitor);
    };
    return FunctionDeclarationNode;
}());
var FormalParameterNode = /** @class */ (function () {
    function FormalParameterNode(variable, loc) {
        this.type = "FormalParameter";
        this.variable = variable;
        this.loc = loc;
    }
    FormalParameterNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return FormalParameterNode;
}());
var FormalParameterListNode = /** @class */ (function () {
    function FormalParameterListNode(parameters, loc) {
        this.type = "FormalParameterList";
        this.parameters = parameters;
        this.loc = loc;
    }
    FormalParameterListNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.parameters.forEach(function (param) { return param.accept(visitor); });
    };
    return FormalParameterListNode;
}());
var FunctionArgumentListNode = /** @class */ (function () {
    function FunctionArgumentListNode(args, loc) {
        this.type = "FunctionArgumentList";
        this.args = args;
        this.loc = loc;
    }
    FunctionArgumentListNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.args.forEach(function (arg) { return arg.accept(visitor); });
    };
    return FunctionArgumentListNode;
}());
var VariableDefinitionNode = /** @class */ (function () {
    function VariableDefinitionNode(name, init, loc) {
        this.type = "VariableDefinition";
        this.name = name;
        this.init = init;
        this.loc = loc;
    }
    VariableDefinitionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.init && this.init.accept(visitor);
    };
    return VariableDefinitionNode;
}());
var VariableDefinitionListNode = /** @class */ (function () {
    function VariableDefinitionListNode(definitions, loc) {
        this.type = "VariableDefinitionList";
        this.definitions = definitions;
        this.loc = loc;
    }
    VariableDefinitionListNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.definitions.forEach(function (param) { return param.accept(visitor); });
    };
    return VariableDefinitionListNode;
}());
var ThisExpressionNode = /** @class */ (function () {
    function ThisExpressionNode(loc) {
        this.type = "ThisExpression";
        this.loc = loc;
    }
    ThisExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return ThisExpressionNode;
}());
var UnaryExpressionNode = /** @class */ (function () {
    function UnaryExpressionNode(operator, prefix, argument, loc) {
        this.type = "UnaryExpression";
        this.operator = operator;
        this.prefix = prefix;
        this.argument = argument;
        this.loc = loc;
    }
    UnaryExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.argument.accept(visitor);
    };
    return UnaryExpressionNode;
}());
var BinaryExpressionNode = /** @class */ (function () {
    function BinaryExpressionNode(operator, left, right, loc) {
        this.type = "BinaryExpression";
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
    BinaryExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.left.accept(visitor);
        this.right.accept(visitor);
    };
    return BinaryExpressionNode;
}());
var AssignmentExpressionNode = /** @class */ (function () {
    function AssignmentExpressionNode(operator, left, right, loc) {
        this.type = "AssignmentExpression";
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
    AssignmentExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.left.accept(visitor);
        this.right.accept(visitor);
    };
    return AssignmentExpressionNode;
}());
var UpdateExpressionNode = /** @class */ (function () {
    function UpdateExpressionNode(operator, argument, prefix, loc) {
        this.type = "UpdateExpression";
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.loc = loc;
    }
    UpdateExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.argument.accept(visitor);
    };
    return UpdateExpressionNode;
}());
var ConditionalExpressionNode = /** @class */ (function () {
    function ConditionalExpressionNode(test, consequent, alternate, loc) {
        this.type = "ConditionalExpression";
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        this.loc = loc;
    }
    ConditionalExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.test.accept(visitor);
        this.consequent.accept(visitor);
        this.alternate.accept(visitor);
    };
    return ConditionalExpressionNode;
}());
var NewExpressionNode = /** @class */ (function () {
    function NewExpressionNode(constr, loc) {
        this.type = "NewExpression";
        this.constr = constr;
        this.loc = loc;
    }
    NewExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.constr.accept(visitor);
    };
    return NewExpressionNode;
}());
var CallExpressionNode = /** @class */ (function () {
    function CallExpressionNode(callee, args, loc) {
        this.type = "CallExpression";
        this.callee = callee;
        this.arguments = args;
        this.loc = loc;
    }
    CallExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.arguments.accept(visitor);
    };
    return CallExpressionNode;
}());
var MemberExpressionNode = /** @class */ (function () {
    function MemberExpressionNode(object, property, computed, loc) {
        this.type = "MemberExpression";
        this.object = object;
        this.property = property;
        this.computed = computed;
        this.loc = loc;
    }
    MemberExpressionNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.object.accept(visitor);
        this.property.accept(visitor);
    };
    return MemberExpressionNode;
}());
var SwitchCaseNode = /** @class */ (function () {
    function SwitchCaseNode(test, consequent, loc) {
        this.type = "SwitchCase";
        this.test = test;
        this.consequent = consequent;
        this.loc = loc;
    }
    SwitchCaseNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.test.accept(visitor);
        this.consequent.accept(visitor);
    };
    return SwitchCaseNode;
}());
var CatchClauseNode = /** @class */ (function () {
    function CatchClauseNode(param, body, loc) {
        this.type = "CatchClause";
        this.param = param;
        this.body = body;
        this.loc = loc;
    }
    CatchClauseNode.prototype.accept = function (visitor) {
        visitor.visit(this);
        this.param.accept(visitor);
        this.body.accept(visitor);
    };
    return CatchClauseNode;
}());
var IdentifierNode = /** @class */ (function () {
    function IdentifierNode(name, loc) {
        this.type = "Identifier";
        this.name = name;
        this.loc = loc;
    }
    IdentifierNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return IdentifierNode;
}());
var LiteralNode = /** @class */ (function () {
    function LiteralNode(value, loc) {
        this.type = "Literal";
        this.value = value;
        this.loc = loc;
    }
    LiteralNode.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return LiteralNode;
}());
module.exports = {
    ProgramNode: ProgramNode,
    EmptyStatementNode: EmptyStatementNode,
    CompoundStatementNode: CompoundStatementNode,
    ExpressionNode: ExpressionNode,
    EmptyExpression: EmptyExpression,
    FunctionDeclarationNode: FunctionDeclarationNode,
    IfStatementNode: IfStatementNode,
    BreakStatementNode: BreakStatementNode,
    ContinueStatementNode: ContinueStatementNode,
    WithStatementNode: WithStatementNode,
    SwitchStatementNode: SwitchStatementNode,
    ReturnStatementNode: ReturnStatementNode,
    ThrowStatementNode: ThrowStatementNode,
    TryStatementNode: TryStatementNode,
    WhileStatementNode: WhileStatementNode,
    DoWhileStatementNode: DoWhileStatementNode,
    ForStatementNode: ForStatementNode,
    ForInStatementNode: ForInStatementNode,
    DebugggerStatementNode: DebugggerStatementNode,
    VariableDefinitionNode: VariableDefinitionNode,
    VariableDefinitionListNode: VariableDefinitionListNode,
    FunctionArgumentListNode: FunctionArgumentListNode,
    ThisExpressionNode: ThisExpressionNode,
    UnaryExpressionNode: UnaryExpressionNode,
    BinaryExpressionNode: BinaryExpressionNode,
    AssignmentExpressionNode: AssignmentExpressionNode,
    UpdateExpressionNode: UpdateExpressionNode,
    ConditionalExpressionNode: ConditionalExpressionNode,
    NewExpressionNode: NewExpressionNode,
    CallExpressionNode: CallExpressionNode,
    FormalParameterNode: FormalParameterNode,
    FormalParameterListNode: FormalParameterListNode,
    MemberExpressionNode: MemberExpressionNode,
    SwitchCaseNode: SwitchCaseNode,
    CatchClauseNode: CatchClauseNode,
    IdentifierNode: IdentifierNode,
    LiteralNode: LiteralNode
};
