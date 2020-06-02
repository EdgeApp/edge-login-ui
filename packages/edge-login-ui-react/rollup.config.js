import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import flowEntry from 'rollup-plugin-flow-entry'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'

import packageJson from './package.json'

const babelOpts = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-flow',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      { corejs: false, helpers: false, regenerator: true }
    ]
  ]
}

const external = [
  'regenerator-runtime/runtime',
  ...Object.keys(packageJson.dependencies).filter(
    name => name !== 'react-toolbox'
  ),
  ...Object.keys(packageJson.devDependencies)
]

export default {
  external,
  input: 'src/index.js',
  output: {
    file: packageJson.main,
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    commonjs({ exclude: 'src/**' }),
    nodeResolve(),
    url(),
    postcss({
      extract: 'lib/styles.css',
      modules: true,
      plugins: [autoprefixer]
    }),
    babel(babelOpts),
    flowEntry()
  ]
}
