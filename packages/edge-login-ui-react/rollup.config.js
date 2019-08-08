import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import flowEntry from 'rollup-plugin-flow-entry'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'

import packageJson from './package.json'
import sassLoader from './sass-loader.js'

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
      loaders: [sassLoader],
      modules: true,
      plugins: [autoprefixer]
    }),
    babel(),
    flowEntry()
  ]
}
