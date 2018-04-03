#!/usr/bin/env node

// The post-robot library currently crashes if somebody imports the
// edge-login-web library in a node.js context. This is because post-robot
// only wants to run in a browser context.
//
// To avoid crashing our partner's unit tests, we intercept the
// edge-login-web entry point and replace it with a dummy entry point if the
// `window` object is missing.

const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')

const entryPath = path.join(__dirname, packageJson.main)
const realEntryPath = path.join(
  path.dirname(entryPath),
  'edge-login-web-hacked.js'
)

const entryFile = `
if (typeof window !== 'undefined') {
  module.exports = require('./${path.basename(realEntryPath)}')
} else {
  exports.makeEdgeUiContext = function () {
    throw new Error('No window object')
  }
}
`

fs.renameSync(entryPath, realEntryPath)
fs.renameSync(entryPath + '.map', realEntryPath + '.map')
fs.writeFileSync(entryPath, entryFile, 'utf8')
