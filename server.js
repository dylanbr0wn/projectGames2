// server.js
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback');


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(history())

app.use(function(request, response){
    if(!request.secure){
        response.redirect("https://" + request.headers.host + request.url);
    }
});

//Serve the Vue server
app.use(express.static('dist'))




const port = process.env.PORT || 5000;
app.listen(port);