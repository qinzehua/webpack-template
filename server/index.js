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
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/js/a/b/c/search-server.js')

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
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link href="./cssFile/a/search_86b0dcd2.css" rel="stylesheet"></link>
        </head>
        <body>
            <div id="app">${str}</div>
        </body>
        </html>
     `
}
