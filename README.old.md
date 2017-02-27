# Installation

STEP 1 - You need these installed on your system.

Requirements:

- Node js - https://nodejs.org/en/download/ (Download here or install with your package manager).
- NPM - Comes with node js when installed.
- Bower - https://bower.io/#install-bower (If nodejs is installed just type "npm install -g bower")

STEP 2 - Clone the repo

```sh
$ git clone https://github.com/Airbitz/airbitz-core-js-ui2
```

STEP 3 - Go to the repo folder and install the application dependencies.

```sh
$ cd mtb-office
$ npm install
```

Step 4 - Install webpack globally. Use sudo if prompt for admin.

```sh
$ npm install -g webpack
(or)
$ sudo npm install -g webpack
```
Step 5 -  Create a config.json using the config.example.json as the pattern

Step  6 - Run the app depending on your environment.

 -Production
```sh
$ cd .. (if you are not yet at the index of the app)
$ webpack
$ node server.js
```
-Development
```sh
$ cd .. (if you are not yet at the index of the app)
$ npm start
```
