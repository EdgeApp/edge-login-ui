import babel from 'rollup-plugin-babel'
import packageJson from './package.json'

export default {
  entry: 'src/abcui.js',
  external: Object.keys(packageJson.dependencies),
  plugins: [
    babel({
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ],
        'stage-2',
        'react'
      ],
      plugins: ['external-helpers']
    })
  ],
  targets: [
    {
      dest: packageJson['main'],
      format: 'cjs',
      sourceMap: true
    },
    {
      dest: packageJson['module'],
      format: 'es',
      sourceMap: true
    }
  ]
}
