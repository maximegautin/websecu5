var User = require('../models/user').model('User');

var security = require('./silosHelpers/securityFunctions');

var passport = require('passport');
require ('./silosHelpers/passport');

var {validateBody, schemas} = require('./silosHelpers/schemaValidator');





module.exports = function(app){



// Création d'une playlist
app.route('/users/playlists/userPlaylist')
      
    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, validateBody(schemas.PlaylistSchema), function(req, res){
           

           User.findById(req.user._id, function(err, user){
                
            user.playlist.push(req.body);

            user.save(function(err){
                if(err) res.send(err);
            });

            res.json(user);
            
           
         });  

           
                
       });



// Modification et suppression d'une playlist
app.route('/users/userPlaylistActions/:playlist_id')
      
   .put(passport.authenticate('jwt', {session : false}), validateBody(schemas.PlaylistSchema), security.isAuthorized, function(req, res){
           
           User.findById(req.user._id, async function(err, user){
                
           user.playlist.forEach(element => {
                if(element._id == req.params.playlist_id){
                    element.name = req.body.name;
                }
            });

           await user.save();

           res.json(user);


            
           
         });
        
                
       })

    .delete(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){
           
           User.findById(req.user._id, async function(err, user){
           var index = -1;
           user.playlist.forEach(element => {
                if(element._id == req.params.playlist_id){
                    index = user.playlist.indexOf(element);
                }
            });
            await user.playlist.splice( index, 1 );

            await user.save();
            
            res.json(user);

         });           
                
       });



//Ajouter une video dans une playlist
app.route('/users/playlists/userPlaylist/:playlist_id/videos')
    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){

        User.findById(req.user._id, async function(err, user){
                
            user.playlist.forEach(element => {
                if(element._id == req.params.playlist_id){
                    element.videos.push(req.body);
                }
            });
            
           

            await user.save(); 
            res.status(200).json({reponse : "vidéo ajoutée"});
           
         });



    });

//Supprimer une vidéo d'une playlist

app.route('/users/playlists/userPlaylist/:playlist_id/deleteVideos/')


    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){

        User.findById(req.user._id, async function(err, user){
            var index = -1;

            user.playlist.forEach( async element => {
                if(element._id == req.params.playlist_id){
                    
                    element.videos.forEach( video => {
                        if(video.id){
                            console.log('cest youtube');
                            if(video.id == req.body.videoId){
                                console.log('yes');

                                index = element.videos.indexOf(video);
                            }
                        }
                        else if(video.stats){
                            console.log('cest vimeo');

                            if(video.uri == req.body.videoId){
                                index = element.videos.indexOf(video);
                            }
                        }
                    });
                    await element.videos.splice( index, 1 );

                    
                }
            }); 
            await user.save();

            
            res.json(user);
           
         });

    });



}



















