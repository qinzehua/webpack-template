if (typeof window === 'undefined') {
  global.window = {}
}
if (typeof document === 'undefined') {
  global.document = {}
}

if (typeof self === 'undefined') {
  global.self = {}
}
const express = require('express')
const fs = require('fs')
const path = require('path')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/js/a/b/c/search-server.js')
const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf8'
)

function server(port) {
  const app = express()

  app.use(express.static('dist'))

  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('server 开启')
  })
}

server(process.env.PORT || 3000)

const renderMarkup = str => {
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
}
