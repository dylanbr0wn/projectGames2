// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')








var url = process.env.MONGOLAB_URI;
mongoose.connect(url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: String,
  urlgog: String,
  urlsteam: String,
  developer: String,
  publisher: String,
  releasedate: String,
  discountpricegog: String,
  discountpricesteam: String,
  pricegog: String,
  pricesteam: String,
  rating: String,
});

var Game = mongoose.model("Game", GameSchema);

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(serveStatic(__dirname + "/dist"));


app.get('/gameList', (req, res) => {
  Game.find({}, function (error, games) {
	  if (error) { console.error(error); }
	  res.send({
			games: games
		})
	}).sort({_id:-1})
})

app.get('/someGames', (req, res) => {
    Game.find({}, function (error, games) {
        if (error) { console.error(error); }
        res.send({
              games
          })
      }).sort({_id:-1}).limit(32)
  })

app.post('/game', (req, res) => {
    var db = req.db;
    
    Game.findOne({ title: req.body.title }, function (error, games) {
        
        if (error) { console.error(error); }
        if (games) {
            console.log('updated game');
            games.discountpricegog = req.body.discountpricegog;
            games.discountpricesteam = req.body.discountpricesteam;
            games.pricegog = req.body.pricegog;
            games.pricesteam = req.body.pricesteam;
            games.publisher = req.body.publisher;
            games.developer = req.body.developer;
            games.rating = req.body.rating;
            games.releasedate = req.body.releasedate;
            // console.log(games);
            games.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.send({
                    success: true
                })
            })
        } else {
            console.log('new game');
            var title = req.body.title;
            var urlgog = req.body.urlgog;
            var urlsteam = req.body.urlsteam;
            var developer = req.body.developer;
            var publisher = req.body.publisher;
            var releasedate = req.body.releasedate;
            var pricegog = req.body.pricegog;
            var pricesteam = req.body.pricesteam;
            var discountpricegog = req.body.discountpricegog;
            var discountpricesteam = req.body.discountpricesteam;
            var rating = req.body.rating;
            var new_Game = new Game({
                title: title,
                urlgog : urlgog ,
                urlsteam : urlsteam ,
                releasedate : releasedate,
                publisher : publisher,
                developer : developer,
                pricegog: pricegog,
                pricesteam: pricesteam,
                discountpricegog : discountpricegog,
                discountpricesteam : discountpricesteam,
                rating : rating,

            })

            new_Game.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.send({
                    success: true
                })
            })
        }


    })
})

app.put('/game/:id', (req, res) => {
    var db = req.db;
    
    Game.findOne({ id_: req.params.id }, function (error, games) {
        


    })

})

app.delete('/game/:id', (req, res) => {
	var db = req.db;
	Game.remove({
		_id: req.params.id
	}, function(err, game){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/game/:id', (req, res) => {
	var db = req.db;
	Game.findById(req.params.id, function (error, game) {
	  if (error) { console.error(error); }
	  if (game){
        res.send(game)
      }
	})
})

app.get('/search', (req, res) => {

    Game.find({ title: { '$regex': req.query.search, '$options': 'i' } }, function (error, games) {
        if (error) { console.error(error); }

        if (games) {
            res.send(games)
        } else {
            res.send()
        }


    })

})

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);