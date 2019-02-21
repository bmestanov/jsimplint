# jsimplint

A simple linting tool using Jison and Typescript.

## How to run
1. Clone the repo

`git clone git@github.com:bmestanov/jsimplint.git`

2. `npm install`

3. To use existing rules: `npm start <file.js>`

## Adding your own rules

To add custom rules, append your rule to the file `rules.ts`. Each rule has the interface

```typescript
export interface Rule {
  name: string;
  description?: string;
  targetNodeType: NodeType;
  check(node: ASTNode, parseIndex: ParseIndex, context: NodeType[]): RuleError[];
};
```

For reference, check the existing rules.