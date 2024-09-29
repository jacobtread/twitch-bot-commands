const UglifyJS = require("uglify-js");
const babel = require("@babel/core");

/**
 * Replaces environment variable templates (i.e {{REPLACE_ENV_BONK_KEY}})
 * environment variables are prefixed with REPLACE_ENV_
 *
 * @param {string} code The code to replace the variables within
 * @returns {string} The new code with the variables replaced
 */
function replacePlaceholders(code) {
  for (const [key, value] of Object.entries(process.env)) {
    const replaceKey = `REPLACE_ENV_${key}`;
    // Use a regular expression to replace all occurrences of the placeholder
    const regex = new RegExp(`{{${replaceKey}}}`, "g");
    code = code.replace(regex, value);
  }

  return code;
}

/**
 * Minifies the provided code
 *
 * @param {string} code The code to minify
 * @returns {string} The minified code
 */
function minifyCode(code) {
  const result = UglifyJS.minify(code, {
    ie8: true,
    toplevel: false,
    compress: false,
    output: {},
  }); // Minify the content

  // Handle minify error
  if (result.error) {
    console.error("failed to minify: ", result.error);
    throw result.error;
  }

  return result.code;
}

/**
 * Transforms the JavaScript code for release,
 *
 * - Wraps the code in an IIFE replacing the default export with a return statement.
 * - Replaces the urlfetch functions with the urlfetch template syntax.
 * - Strips any require() imports
 *
 * @param {string} inputFile The input file for error messages
 * @param {string} code The input code
 * @returns {string} The transformed code
 */
function transformRelease(inputFile, code) {
  const transformResult = babel.transformSync(code, {
    filename: inputFile,
    presets: [],
    plugins: [
      require("./plugins/babel-plugin-iife"),
      require("./plugins/babel-plugin-replace-urlfetch"),
      require("./plugins/babel-plugin-strip-imports"),
    ],
    targets: "node 20",
  });

  if (!transformResult.code) {
    throw new Error("failed to transform release code");
  }

  return transformResult.code;
}

/**
 * Transforms the JavaScript code for dev testing
 *
 * - Wraps the code in an async IIFE replacing the default export with a return statement
 *   so that the async await code will work
 *
 * @param {string} inputFile The input file for error messages
 * @param {string} code The input code
 * @returns {string} The transformed code
 */
function transformDev(inputFile, code) {
  const transformResult = babel.transformSync(code, {
    filename: inputFile,
    presets: [],
    plugins: [require("./plugins/babel-plugin-async-iife")],
    targets: "node 20",
  });

  if (!transformResult.code) {
    throw new Error("failed to transform dev code");
  }

  return transformResult.code;
}

/**
 * Replaces nightbot builtin variables with testing data
 * for running dev tests
 *
 * @param {string} code The input code
 * @returns {string} The code with the variables replaced
 */
function replaceBuiltins(code) {
  // Replace nightbot builtins
  code = code.replace(/\$\(user\)/g, "TestUserFrom");
  code = code.replace(/\$\(touser\)/g, "TestUserTo");
  return code;
}

module.exports = {
  replacePlaceholders,
  minifyCode,
  transformRelease,
  transformDev,
  replaceBuiltins,
};
