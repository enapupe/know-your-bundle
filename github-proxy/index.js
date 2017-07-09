const express = require('express')
const request = require('request')
const qs = require('qs')
const cors = require('cors')

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_OAUTH_URI = 'https://github.com/login/oauth/access_token'

const port = process.env.PORT || 3333
const buildURL = (url, params) => `${url}?${qs.stringify(params)}`

const app = express()
app.use(cors())
app.get('/auth/:code/:state', (req, res) => {
  res.set('Content-Type', 'application/json')
  const { code, state } = req.params
  const url = buildURL(GITHUB_OAUTH_URI, {
    code,
    state,
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
  })
  req.pipe(request.post({
    url,
    headers: {
      Accept: 'application/json',
    },
  })).pipe(res)
})

app.listen(port)

console.info(`Listening on http://localhost:${port}`)
