module.exports = function ({ types: t }) {
  return {
    visitor: {
      VariableDeclaration(path) {
        // Check if the declaration is of type 'require'
        const declarations = path.node.declarations;

        for (const declaration of declarations) {
          if (
            t.isCallExpression(declaration.init) &&
            t.isIdentifier(declaration.init.callee, { name: "require" })
          ) {
            // Remove the entire variable declaration
            path.remove();
            break; // Exit the loop after removing the declaration
          }
        }
      },
      CallExpression(path) {
        // Strip requires
        if (t.isIdentifier(path.node.callee, { name: "require" })) {
          path.remove();
          return;
        }
      },
    },
  };
};
