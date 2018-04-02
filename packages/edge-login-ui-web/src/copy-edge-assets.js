#!/usr/bin/env node

const path = require('path')
const cpr = require('cpr')

function main (argv) {
  if (argv.length !== 3) {
    return console.error('Usage: copy-edge-assets <dest>')
  }
  const src = path.join(__dirname, '../assets')
  const dest = path.resolve(argv[2])

  console.log(src + ' -> ' + dest)
  cpr(src, dest, { overwrite: true }, function (e, files) {
    if (e) return console.error(e)
  })
}

main(process.argv)
