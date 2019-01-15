'use strict';


var User = require('./../models/user').model('User');
var Logs = require('./../models/logs').model('Log');
var Video = require('./../models/video').model('Video');




var express = require('express');
//var bodyParser = require('body-parser');


var app = express();


app.get('/', function(req, res){

    res.send('Hellooooo');
});

app.get('/test', function(req, res){

    res.send('Hello test!');
    
});

app.post('/addUser/:user', function(req, res, next){

        var tmp = req.params.user.body;

        var user = new User(tmp);

        user.save(function(err){
            if(err){
                return next(err);
            }
        });

        res.send({
            success: true,
            message: 'Utilisateur enregisté'
        });
    
});

app.get('/users', function(req, res){

         User.find({}, function(err, users) {
           
            res.send(users);


          });       
});

app.get('/test2/:entier', function(req, res){
    var entier = req.params.entier;
    res.send('entier : '+ entier);
});



module.exports = app;
