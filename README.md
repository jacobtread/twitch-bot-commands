# Twitch Bot Commands

Some bot commands and build tools I've made for creating twitch Nightbot JS eval commands

This project contains a `make.js` file which handles converting the command scripts from `./commands` into commands that
can be added to Nightbot for twitch. 

You can build the commands using either `node make.js` or `npm run build` and the commands will be in the `./build` directory.

You can locally run commands using `node run.js {COMMAND_NAME}` (i.e `node run.js bonk`)

Secrets used within the commands are stored in the `.env` file. It should contain the following:

```conf
BONK_PUBLIC_KEY=
BONK_PRIVATE_KEY=

HUG_PUBLIC_KEY=
HUG_PRIVATE_KEY=
```

These environment variables appear in the command source as templates like the following: `{{REPLACE_ENV_BONK_PUBLIC_KEY}}` which
will be replaced when you build

You can generate public/private key pairs for accessing the quotes API:

https://twitch.center/customapi/quote/generate

It should look like

```
$(urlfetch https://twitch.center/customapi/quote?token={YOUR PUBLIC KEY}&data=$(querystring))

$(urlfetch https://twitch.center/customapi/addquote?token={YOUR PRIVATE KEY}&data=$(querystring))

$(urlfetch https://twitch.center/customapi/delquote?token={YOUR PRIVATE KEY}&data=$(querystring))
```