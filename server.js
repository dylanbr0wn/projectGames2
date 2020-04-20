// server.js
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.use(function(req, res,next){
    if (req.headers["x-forwarded-proto"] === "https" || req.hostname == "localhost") {
        return next()
    }
    res.redirect("https://" + req.hostname + req.url);
});
app.use(history());
//Serve the Vue server
app.use(express.static('dist'));

const port = process.env.PORT || 5000;
app.listen(port);