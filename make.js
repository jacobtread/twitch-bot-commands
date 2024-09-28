
require('dotenv').config()

const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

function makeCommand(inputFile) {

    // Run the minify function
    const fileContent = fs.readFileSync(inputFile, 'utf8'); // Read the input file
    const result = UglifyJS.minify(fileContent, { ie8: true, toplevel: false, compress: false, output: {} }); // Minify the content

    // Handle minify error
    if (result.error) {
        console.error('failed to minify: ', result.error);
        return;
    }

    // Get the file name and directory
    const ext = path.extname(inputFile);
    const baseName = path.basename(inputFile, ext);
    const buildDirName = path.join(__dirname, "build");

    // Create build dir if it doesn't exist
    if (!fs.existsSync(buildDirName)) {
        fs.mkdirSync(buildDirName);
    }

    // Create the new file name with .min.js extension
    const outputFile = path.join(buildDirName, `${baseName}.min.js`);

    let code = result.code.trim();

    // Replaces any environment variables (i.e {{REPLACE_ENV_BONK_KEY}})
    // environment variables are prefixed with REPLACE_ENV_
    for (const [key, value] of Object.entries(process.env)) {
        const replaceKey = `REPLACE_ENV_${key}`;
        code = code.replace(`{{${replaceKey}}}`, value);
    }

    // Strip the trailing semi-colon to make the command an expression
    if (code.endsWith(';')) code = code.substring(0, code.length - 1)

    const newCode = `$(eval ${code})`

    // Write the minified content to the new file
    fs.writeFileSync(outputFile, newCode, 'utf8');

    console.log(`generated command: ${outputFile}`);
}

const commandsDir = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsDir, { encoding: "utf-8" });

for (const commandFile of commands) {

    const inputFile = path.join(commandsDir, commandFile);

    // Get the file stats
    const stat = fs.statSync(inputFile);

    // Ignore anything thats not a file
    if (!stat.isFile()) continue;

    console.log('making command ' + inputFile)

    // Build the command
    makeCommand(inputFile);
}