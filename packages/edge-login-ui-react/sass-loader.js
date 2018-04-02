import path from 'path'

import sass from 'node-sass'
import pify from 'pify'
import resolve from 'resolve'

const moduleRe = /^~([a-z0-9]|@).+/i

// Copied from rollup-plugin-postcss,
// then hacked to inject the react-toolbox theme into every file.

export default {
  name: 'sass',
  test: /\.s[ac]ss$/,
  async process ({ code }) {
    const res = await pify(sass.render.bind(sass))(
      Object.assign({}, this.options, {
        file: this.id,
        data:
          `@import "${path.resolve(__dirname, 'src/theme/_config.scss')}";` +
          code,
        indentedSyntax: /\.sass$/.test(this.id),
        sourceMap: this.sourceMap,
        importer: [
          (url, importer, done) => {
            if (!moduleRe.test(url)) return done({ file: url })

            resolve(
              url.slice(1),
              {
                basedir: path.dirname(importer),
                extensions: ['.scss', '.sass', '.css']
              },
              (err, id) => {
                if (err) {
                  return Promise.reject(err)
                }
                done({
                  // Do not add `.css` extension in order to inline the file
                  file: id.endsWith('.css') ? id.replace(/\.css$/, '') : id
                })
              }
            )
          }
        ].concat(this.options.importer || [])
      })
    )

    return {
      code: res.css.toString(),
      map: res.map && res.map.toString()
    }
  }
}
