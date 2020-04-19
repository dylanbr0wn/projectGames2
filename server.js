// server.js
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const path = require('path')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//Serve the Vue server
app.use(serveStatic(path.join(__dirname, '/dist')))

app.get('/.well-known/acme-challenge/:content', function(req, res) {
    res.send('Yljp4RvcyzSl8V2aGPs6lEjWv0G6c9AIVuO4X1HKymo.Wb8CZdX0yd3r5sR72JXP91gNsPhngWZLi8jvoNQN4no')
})


const port = process.env.PORT || 5000;
app.listen(port);