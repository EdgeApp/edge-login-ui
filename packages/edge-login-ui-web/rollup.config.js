import babel from 'rollup-plugin-babel'
import flowEntry from 'rollup-plugin-flow-entry'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

import packageJson from './package.json'

const external = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
  'edge-core-js/lib/client-side.js',
  'regenerator-runtime/runtime'
]

export default {
  external,
  input: 'src/client/index.js',
  output: [
    { file: packageJson.main, format: 'cjs', sourcemap: true },
    { file: packageJson.module, format: 'es', sourcemap: true }
  ],
  plugins: [json({ preferConst: true }), babel(), flowEntry(), resolve()]
}
