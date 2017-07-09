const express = require('express')
const request = require('request')
const cors = require('cors')

const NPM_REGISTRY = 'https://registry.yarnpkg.com/'

const cleanURL = (url) => {
  const newURL = url.substr(1)
  if (newURL.substr(-1) === '/') {
    return newURL.slice(0, -1)
  }
  return newURL
}
const parsePackageName = (url) =>
  encodeURIComponent(cleanURL(url)).replace('%40', '@')

const app = express()
app.use(cors())
app.get('*', (req, res) => {
  const url = NPM_REGISTRY + parsePackageName(req.url)
  req.pipe(request(url)).pipe(res)
})

app.listen(process.env.PORT || 3333)
