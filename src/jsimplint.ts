import { ASTNode, VariableDefinitionNode, IdentifierNode, FunctionDeclarationNode, NodeType } from './expressions'
import * as rules from './rules';
const parser = require('./parser');

export interface RuleError {
  message: string;
};

export interface ParseIndex {
  declaredVars: { [name: string]: VariableDefinitionNode };
  declaredFunctions: { [name: string]: FunctionDeclarationNode };
  identifiers: { [name: string]: IdentifierNode };
};

export interface Rule {
  name: string;
  description?: string;
  targetNodeType: NodeType;
  check(node: ASTNode, parseIndex: ParseIndex, context: NodeType[]): RuleError[];
};

export class JSimplint {
  private rules: Rule[] = [];

  private buildParseIndex(root: ASTNode) {
    const pr: ParseIndex = {
      declaredFunctions: {},
      declaredVars: {},
      identifiers: {}
    };

    const visit = (node: ASTNode) => {
      if (node.type === 'VariableDefinition') {
        const tnode = node as VariableDefinitionNode;
        pr.declaredVars[tnode.name] = tnode;
      }
      if (node.type === 'FunctionDeclaration') {
        const tnode = node as FunctionDeclarationNode;
        pr.declaredVars[tnode.name] = tnode;
        pr.declaredFunctions[tnode.name] = tnode;
      }
      if (node.type == 'Identifier') {
        const tnode = node as IdentifierNode;
        pr.identifiers[tnode.name] = tnode;
      }
    };

    root.accept({ visit }, []);
    return pr;
  }

  private checkRules(root: ASTNode, pr: ParseIndex) {
    const errors: RuleError[] = [];

    const visit = (node: ASTNode, context: NodeType[]) => {
      const ruleErrors: any[] = this.rules
        .filter(rule => rule.targetNodeType === node.type)
        .map(rule => ({ checker: rule.name, errors: rule.check(node, pr, context) }))
        .filter(rule => rule.errors.length);
      errors.push(...ruleErrors);
    }

    root.accept({ visit }, []);
    return errors;
  }

  analyze(source: string) {
    try {
      const root = parser.parse(source);
      const pr = this.buildParseIndex(root);
      const errors = this.checkRules(root, pr);
      return errors;
    } catch (err) {
      return [{ message: err.toString() }];
    }
  }

  registerRule(rule: Rule) {
    this.rules.push(rule);
  }
};

export const linter = new JSimplint();
Object.keys(rules).forEach((key: string) => linter.registerRule((rules as any)[key]));