import { Rule, ParseIndex } from './jsimplint';
import { IdentifierNode, ASTNode, NodeType, VariableDefinitionNode } from './expressions';
import * as _ from 'lodash';

export const unknownIdentifier: Rule = {
  name: 'Unknown identifier',
  targetNodeType: 'Identifier',
  check: (node: ASTNode, parseIndex: ParseIndex) => {
    const name = (node as IdentifierNode).name;
    if (!parseIndex.declaredVars[name]) {
      return [{ message: `Unknown identifier: '${name}' at (${node.loc.first_line}:${node.loc.first_column}).` }];
    }
    return [];
  }
};

export const unusedIdentifier: Rule = {
  name: 'Unused identifier',
  targetNodeType: 'Program',
  check: (node: ASTNode, parseIndex: ParseIndex) => {
    const declaredVars = Object.keys(parseIndex.declaredVars);
    const declaredFns = Object.keys(parseIndex.declaredFunctions);
    const identifiers = Object.keys(parseIndex.identifiers);
    const unusedVars =
      _(declaredVars)
        .difference(identifiers)
        .map(v => ({ message: `Unused var: '${v}' at (${node.loc.first_line}:${node.loc.first_column}).` }))
        .value();
    const unusedFns =
      _(declaredFns)
        .difference(identifiers)
        .map(v => ({ message: `Unused function: '${v}' at (${node.loc.first_line}:${node.loc.first_column}).` }))
        .value();
    return [...unusedVars, ...unusedFns];
  }
};

export const wrongNumberArg: Rule = {
  name: 'Wrong number of arguments',
  targetNodeType: 'CallExpression',
  check: (node: ASTNode, parseIndex: ParseIndex) => {
    const fname = _.get(node, ['callee', 'name']);
    const given = _.get(node, ['arguments', 'args', 'length']);
    const expected = _.get(parseIndex, ['declaredFunctions', fname, 'params', 'parameters', 'length']);
    if (given && expected && given !== expected) {
      return [{ message: `Function '${fname}' expects ${expected} argumens, ${given} given at (${node.loc.first_line}:${node.loc.first_column})..` }];
    }
    return [];
  }
};

export const noFunnyNames: Rule = {
  name: 'No funny names',
  targetNodeType: 'VariableDefinition',
  check: (node: ASTNode) => {
    const tnode = node as VariableDefinitionNode;
    if (/.*fun.*/.test(tnode.name)) {
      return [{ message: `No funny nodes: '${tnode.name}'.` }];
    }
    return [];
  }
}

