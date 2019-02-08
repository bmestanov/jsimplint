const parser = require('./parser');
const expressions = require('./expressions');

const analyze = (source: any) => {
  const visitor = {
    visit(node: any) {
      console.log(node.type);
    }
  };

  const astRoot = parser.parse(source);
  console.log(JSON.stringify(astRoot, null, 2));
  astRoot.accept(visitor);
};

analyze(`
foo(a,c);
`);