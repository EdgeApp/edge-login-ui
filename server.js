var path = require('path')
var express = require('express')

var app = express()
var port = 8002

app.use('/assets', express.static(__dirname + '/assets'))
app.use('/dist', express.static(__dirname + '/dist'))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index_prod.html'))
})

app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.info('  ==> 🌎 Administration server on port %s. Open up with your ip and port in your browser', port, port)
})
