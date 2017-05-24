var express = require('express');
var router = express.Router();
var request = require('request');

var Pokemon = require('../models/pokemon');


router.get('/getAllPokemon', function(req, res) {
        Pokemon.find(function(err, pokemons) {
            if (err) throw err;
          
            res.send(pokemons);
        });  
    });


router.post('/addPokemon', function(req, res, next) {

//request from pokeApi  
request('https://pokeapi.co/api/v2/pokemon/19/', function (errors, response, body) {
    
    if (!errors){

        // do something with success response which is in 'body'

        //create variables for schema arrays
        var abilities = [];
        var stats= [];
        var types = [];
        //convert the json to object
        var bodyJason = JSON.parse(body);

        //converting pokeApi abilities syntax to required syntax
        for (var i=0; i<bodyJason.abilities.length; i++){
            abilities[i] = {};
            abilities[i].name = bodyJason.abilities[i].ability.name;
            abilities[i].description = bodyJason.abilities[i].ability.url;
            
        }

        //converting pokeApi stats syntax to required syntax
        for (var i=0; i<bodyJason.stats.length; i++){
            stats[i] = {};
            stats[i].name = bodyJason.stats[i].stat.name;
            stats[i].baseStat = bodyJason.stats[i].base_stat;
        }

        //converting pokeApi types syntax to required syntax
        for (var i=0; i<bodyJason.types.length; i++){
            types[i] = {};
            types[i].slot = bodyJason.types[i].slot;
            types[i].name = bodyJason.types[i].type.name;
        }

        //add new pokemon to Pokemon model
        var newPokemon = Pokemon({
                abilties: abilities,
                stats: stats,
                name: bodyJason.name,
                weight: bodyJason.weight,
                height: bodyJason.height,
                id: bodyJason.id,
                types: types
           });
           newPokemon.save(function(err) {
               if (err) throw err;
               res.send('Saved to database');
           });
    }
    else throw errors;
});

});

module.exports = router;
