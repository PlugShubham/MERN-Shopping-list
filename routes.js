var express = require('express');
var router = express.Router();
var shoppingModel = require('./shopping-model');

//Util module for better logging
var util = require('util');


//get request, return json of all shopping items
router.get('/',(req,res)=>{
    shoppingModel.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>util.log(err)); 
});

router.post('/',(req,res)=>{
    shoppingModel.create(req.body)
    .then((data)=>{
        util.log(data.name + " is saved!!!")
    })
    .then(()=>res.send("data is saved"))
    .catch((err)=>util.log("Error in post request"))
});

router.delete('/:id',(req,res)=>{
    //fetching id from request parameter
    const id = req.params.id;
    shoppingModel.deleteOne({'_id':id})
    .then((data)=>util.log(data.name + " is successfully deleted"))
    .then(()=>{
        res.send("successfully deleted");
    })
    .catch((err)=>util.log("error"));
})

module.exports = router;


