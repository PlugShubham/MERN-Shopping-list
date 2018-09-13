var mongoose = require('mongoose');

//creating shopping Schema
var Schema = mongoose.Schema;

var shoppingSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//creating shopping model
var shopping = mongoose.model('shopping',shoppingSchema);

module.exports = shopping;