module.exports = function ({ types: t }) {
  return {
    visitor: {
      AwaitExpression(path) {
        // Remove the await keyword
        path.replaceWith(path.node.argument);
      },

      CallExpression(path) {
        // Replace urlfetch
        if (
          path.node.callee.name === "urlfetch" &&
          path.node.arguments.length > 0
        ) {
          const arg = path.node.arguments[0];
          const value = arg.value;
          const expr = `$(urlfetch ${value})`;
          if (t.isStringLiteral(arg)) {
            path.replaceWith(t.stringLiteral(expr));
          }
          return;
        }

        // Replace urlfetchJSON
        if (
          path.node.callee.name === "urlfetchJSON" &&
          path.node.arguments.length > 0
        ) {
          const arg = path.node.arguments[0];
          const value = arg.value;
          const expr = `$(urlfetch json ${value})`;
          if (t.isStringLiteral(arg)) {
            path.replaceWith(t.stringLiteral(expr));
          }
          return;
        }
      },
    },
  };
};
