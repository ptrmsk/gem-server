# ♊ gem-server: a simple static gemini server

`gem-server` is a simple-zero configuration command-line static gemini server.
It is in *very* early stages of development, but it should be ready for
basic static gemini sites.

It was heavily inspired by http-server.

# Installation

## Running on-demand

Using `npx` you can run the script without installing it first:

```
npx gem-server {path} [options]
```

(Unlike `http-server`, providing a path is mandatory. If you wish to serve the current directory, simply provide `.`)


## Globally via npm

```
npm install --global gem-server
```

## OpenSSL keys

A `key.pem` and `cert.pem` file need to be generated to use Gemini. To generate these on your own, run the following command (works best in Linux, or in WSL on Windows):

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'
```

# Usage

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'
gem-server {path} [options]
```

`{path}` needs to be passed, common options are `./public` and `.`

*Now you can visit gemini://localhost on your local Gemini browser!* 🚀

# Available options:

* `-p` to choose a different port
* `-c` to specify a different cert file
* `-k` to specify a different key file
* `-h` for help
* `-v` for the version number

#  Magic Files

* `index.gmi` or `index.gemini` will be served as the default file to any directory requests.  
  (Directory lists do not generate at this time.)
