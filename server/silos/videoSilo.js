
var User = require('../models/user').model('User');
var search = require('youtube-search');
var search2 = require('youtube-node');

var security = require('./silosHelpers/securityFunctions');

var passport = require('passport');
require ('./silosHelpers/passport');

var {validateBody, schemas} = require('./silosHelpers/schemaValidator');

var Vimeo = require('vimeo').Vimeo;


module.exports = function(app){


app.route('/videosY/search')
    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, validateBody(schemas.VideoSearchYSchema), function(req, res){
        var opts = {
            maxResults: 20,
            key: 'AIzaSyDOU0_gW7lVYmO5Xzh2aIq7cL4d9EiExWM',
            type: 'video',
            videoEmbeddable : true

          };
          User.findById(req.user._id, async function(err, user){

              if(req.user.historique.length != 0){
                var index = user.historique.length - 1;

                if(req.body.recherche != user.historique[index].recherche){
                  await user.historique.push(req.body);
                }
              }


              if(user.historique.length == 0){
                await user.historique.push(req.body);

              }

              await user.save();

             // console.log(req.user.historique);

            });

          search(req.body.recherche, opts, function(err, results) {
            if(err) return console.log(err);
          
            res.json(results);
          });

        


    });

app.route('/videosY/search/:videoId')

  .get(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){
        
        var youTube = new search2();
        youTube.setKey('AIzaSyDOU0_gW7lVYmO5Xzh2aIq7cL4d9EiExWM');

        youTube.getById(req.params.videoId, function(error, result) {
        if (error) {
            console.log(error);
        }
        else {
            res.json(result.items);
        }
        });

});


app.route('/vimeo/api/search')
   .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, validateBody(schemas.VideoSearchVSchema), function(req, res){

    
 
    var key = '5269ad3544b5570b46569a1f2a736e2bd5e14e63'; // vimeo api key
    var secret = '0Li4jDOi/+zd0X8b/Lzqy8k7y6LvQDj8YZICZhwNpcaobmX65BgVD1braRLm9YxC0AEZzHfQeTEbOml6YPQK4DDNmQ8BeVVC8Bns+7kEnwS5oWSO++TqmNA73xMVTqbg'; 
    var token = 'da77b1e784fb1ffb1a22b0a95d3984bf';
    var client = new Vimeo(key, secret, token);
 
  
    User.findById(req.user._id, async function(err, user){

      if(req.user.historique.length != 0){
        //console.log(1);
        var index = user.historique.length - 1;
        if(req.body.query != user.historique[index].recherche){
          await user.historique.push({"recherche" : req.body.query});
        }
      }


      if(user.historique.length == 0){
        await user.historique.push({"recherche" : req.body.query});
       // console.log(req.body);

      }

      await user.save();

     // console.log(req.user.historique);

    });



      client.request({

        method : 'GET',
        path : '/videos',
        

        query : req.body

      }, function (error, body, status_code, headers) {
        if (error) {
          res.send(error);
        } else {
     
          res.json(body.data);
     
        }

      
      
      });

   });


app.route('/vimeo/api/search/vimeoSpecifiqVideo')
      .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){

    
 
    var key = '5269ad3544b5570b46569a1f2a736e2bd5e14e63'; // vimeo api key
    var secret = '0Li4jDOi/+zd0X8b/Lzqy8k7y6LvQDj8YZICZhwNpcaobmX65BgVD1braRLm9YxC0AEZzHfQeTEbOml6YPQK4DDNmQ8BeVVC8Bns+7kEnwS5oWSO++TqmNA73xMVTqbg'; 
    var token = 'da77b1e784fb1ffb1a22b0a95d3984bf';
    var client = new Vimeo(key, secret, token);
 
  

      client.request({

        method : 'GET',
        path : req.body.uri,
        

       

      }, function (error, body, status_code, headers) {
        if (error) {
          res.send(error);
        } else {
     
          res.json(body);
     
        }

      
      });
    });



}
