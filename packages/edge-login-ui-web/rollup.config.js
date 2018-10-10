import babel from 'rollup-plugin-babel'
import flowEntry from 'rollup-plugin-flow-entry'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

import packageJson from './package.json'

const babelOpts = {
  babelrc: false,
  presets: ['es2015-rollup', 'flow', 'react'],
  plugins: [
    'transform-async-to-generator',
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-regenerator',
    ['transform-es2015-for-of', { loose: true }]
  ]
}

const external = [
  'regenerator-runtime/runtime',
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies)
]

export default {
  external,
  input: 'src/client/index.js',
  output: [
    { file: packageJson.main, format: 'cjs' },
    { file: packageJson.module, format: 'es' }
  ],
  plugins: [
    json({ preferConst: true }),
    babel(babelOpts),
    flowEntry(),
    resolve()
  ],
  sourcemap: true
}
