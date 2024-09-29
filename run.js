require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
  transformDev,
  minifyCode,
  replacePlaceholders,
  replaceBuiltins,
} = require("./utils");

// Get the command line arguments
const args = process.argv;

// Check if a name argument was provided
if (args.length < 3) {
  console.log("missing file name");
  process.exit(1);
}

// The first argument after the script name
const commandFile = args[2] + ".js";
const commandsDir = path.join(__dirname, "commands");
const inputFile = path.join(commandsDir, commandFile);

console.log("running command " + inputFile);

runCommand(inputFile);

async function runCommand(inputFile) {
  // Run the minify function
  const fileContent = fs.readFileSync(inputFile, "utf8"); // Read the input file

  let code = transformDev(inputFile, fileContent);

  // Minify the code
  code = minifyCode(code);

  // Trip whitespace
  code = code.trim();

  // Replace the placeholders
  code = replacePlaceholders(code);

  // Replace nightbot builtins
  code = replaceBuiltins(code);

  // Log the code that will run
  console.log("Generated Code: \n\n\n" + code + "\n\n\n");

  // Strip the trailing semi-colon to make the command an expression
  if (code.endsWith(";")) code = code.substring(0, code.length - 1);

  // Run the code and wait for the response
  const execResult = await eval(code);
  console.log("Output:", execResult);
}
