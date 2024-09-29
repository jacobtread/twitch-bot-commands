const UglifyJS = require("uglify-js");
const babel = require("@babel/core");

function replacePlaceholders(code) {
  // Replaces any environment variables (i.e {{REPLACE_ENV_BONK_KEY}})
  // environment variables are prefixed with REPLACE_ENV_
  for (const [key, value] of Object.entries(process.env)) {
    const replaceKey = `REPLACE_ENV_${key}`;
    // Use a regular expression to replace all occurrences of the placeholder
    const regex = new RegExp(`{{${replaceKey}}}`, "g");
    code = code.replace(regex, value);
  }

  return code;
}

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
