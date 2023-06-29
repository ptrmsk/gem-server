#!/usr/bin/env node
'use strict';

const gemini = require('gemini-server').default;
const fs = require('fs');
const { readFileSync, existsSync } = fs;

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

// argument parser
const parser = new ArgumentParser({
    description: 'gem-server',
    // usage: '' // custom usage
    // epilog: "" // the after-description
});
parser.add_argument('path', { type: 'str', help: "Path", default: "./" });
parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-c', '--cert', { help: "Certificate filename", default: 'cert.pem' });
parser.add_argument('-k', '--key', { help: "Key filename", default: 'key.pem' });
parser.add_argument('-p', '--port', { help: "Port", default: 1965, })
const parsedArgs = parser.parse_args();
// console.dir(parsedArgs);

const certFilename = parsedArgs.cert;
const keyFilename = parsedArgs.key;
const indexStatic = true;

if (!existsSync(certFilename) || !existsSync(keyFilename)) {
    console.log("Cannot find certificate or key files.");
    console.log("Try generating some with a command like:");
    console.log("");
    console.log("openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'");
    process.exit(1);
}

const options = {
    cert: readFileSync(certFilename),
    key: readFileSync(keyFilename),
    titanEnabled: true,
};
const app = gemini(options);

const staticFolder = () => {
    app.use('/', (req, res, next) => {
        // adding status 20 to request
        res.status(20);
        next();
    })
    app.use('/', gemini.serveStatic(parsedArgs.path, { index: indexStatic, redirectOnDirectory: true, }));
}

staticFolder()

console.log("Starting and listening on port " + parsedArgs.port)
app.listen(parsedArgs.port);