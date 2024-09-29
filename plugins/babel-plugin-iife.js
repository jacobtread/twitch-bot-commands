module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const body = path.get("body");

        // Find the last export default declaration
        const lastExportDefault = body.find((node) =>
          node.isExportDefaultDeclaration()
        );

        // If there's no export default, do nothing
        if (!lastExportDefault) return;

        // Create the IIFE
        const iifeBody = t.blockStatement([]);

        // Move all statements into the IIFE body
        body.forEach((node) => {
          if (!node.isExportDefaultDeclaration()) {
            iifeBody.body.push(node.node);
          }
        });

        // Add the return statement for the export default
        iifeBody.body.push(
          t.returnStatement(lastExportDefault.node.declaration)
        );

        const iife = t.callExpression(
          t.arrowFunctionExpression([], iifeBody),
          []
        );

        // Replace the entire program with the export default of the IIFE
        path.replaceWith(t.program([t.expressionStatement(iife)]));
      },
    },
  };
};
