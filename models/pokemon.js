var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//schema for ability
var abilitySchema = new Schema({
    name: { type: String },
    description: { type: String } 
});

//schema for stat
var statSchema = new Schema({
    name: { type: String },
    baseStat: { type: Number } 
});

//schema for Type
var typeSchema = new Schema({
    slot: { type: Number },
    name: { type: String } 
});

var pokemonSchema = new Schema({
    abilties: [abilitySchema],
    stats: [statSchema],
    name: { type: String } ,
    weight: { type: Number },
    height: { type: Number },
    id: { type: Number },
    types: [typeSchema]
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;