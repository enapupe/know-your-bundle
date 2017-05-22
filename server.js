const path = require('path')

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')

const ip = '0.0.0.0'
const port = process.env.PORT || 3000
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: 'errors-only',
}))

app.use(webpackHotMiddleware(compiler))

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      next(err)
      return
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(port, ip, (err) => {
  if (err) {
    console.warn(err)
    return
  }

  console.info('\x1b[32m', `[Development] Express is running on http://${ip}:${port}`, '\x1b[0m')
})
