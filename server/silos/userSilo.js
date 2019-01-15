var User = require('./../models/user').model('User');
var Log = require('./../models/logs').model('Log');
var security = require('./silosHelpers/securityFunctions');

var passport = require('passport');
require ('./silosHelpers/passport');

var {validateBody, schemas} = require('./silosHelpers/schemaValidator');




module.exports = function(app){
    
    
  
    
app.route('/signup')
        .post(validateBody(schemas.RegisterSchema), security.signUp);


app.route('/signin')
       .post(validateBody(schemas.AuthSchema), passport.authenticate('local', {session : false}), security.signIn);
    


// ------------ADMIN SILO --------------------------
app.route('/users')

       .get(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){

            User.find({}, function(err, users){
                res.json(users);
            });
       });


// ------------ADMIN SILO --------------------------
app.route('/users/findUser/:userId')
    .get(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){


        User.findById(req.params.userId, function(err, user){

            if(err) res.send(err);

            res.json(user);

        });

    });




app.route('/users/currentUser')
    
       .get(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){

            
    
             User.findById(req.user._id, function(err, user) {
               
                if(err) res.send(err);
                
                res.json(user);
    
              });   
        })

       .put(passport.authenticate('jwt', {session : false}), security.isAuthorized, validateBody(schemas.RegisterSchema), function(req, res){

           

                User.findById(req.user._id, async function(err,user){
                
                if(err) res.send(err);
                if(req.body.nom == user.nom && req.body.prenom == user.prenom && req.body.email == user.email){
                    res.status(402).json({message : 'modifiez au moins une information'});
                }
                if(!user.comparePassword(req.body.password)){

                    res.status(403).json({message : 'mot de passe incorrect'});

                }
              
                if(req.body.nom) user.nom = req.body.nom;
                if(req.body.prenom) user.prenom = req.body.prenom;
                if(req.body.email) user.email = req.body.email;

              
            
                await user.save(function(err){
                    if(err) res.send(err);       
                });
                var newLog = new Log({type_log : 'modification_compte', user :{nom:user.nom, prenom:user.prenom, id:user._id}});
                await newLog.save();
                res.json(user);	
            });
        });


app.route('/users/changementMdp')
    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, validateBody(schemas.MdpSchema), function(req, res){

        User.findById(req.user._id, async function(err, user){

            if(err) res.json(err);
            if(!user.comparePassword(req.body.old_password)){
                res.status(402).json({message : 'Ancien mot de passe incorrect'});
            }

            user.password = req.body.new_password;
            await user.save();
            res.json(user);
        });
});





app.route('/users/suppressionCompte')
    .post(passport.authenticate('jwt', {session : false}), security.isAuthorized, function(req, res){

        User.findById(req.user._id, async function(err,user){
            if(err) res.send(err);
            user.role = 'supprimé';
            await user.save(function(err){
                if(err) res.send(err);
            });

            var newLog = new Log({type_log : 'suppression_compte', user :{nom:user.nom, prenom:user.prenom, id:user._id}});
            await newLog.save();
            res.json(user);	
        

        });

});



// ------------ ADMIN SILO --------------------------
app.route('/users/blocage')
    .post(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){

        User.findById(req.body.user_id, async function(err,user){

            if(err) res.send(err);


            // blocage si user simple 
            if(user.role == 'user'){

                user.role = 'bloqué';
                await user.save(function(err){
                    if(err) res.send(err);   
                });

                var newLog = new Log({type_log : 'blocage_compte', user :{nom:user.nom, prenom:user.prenom, id:user._id}});

                await newLog.save();

                res.json(user);	
            }

            //blocage si admin
            else if(user.role == 'admin'){

                if(req.user.admin_level < user.admin_level){

                    user.role = 'bloqué';
                    await user.save(function(err){
                        if(err) res.send(err);
                    });

                   var newLog = new Log({type_log : 'blocage_compte', user :{nom:user.nom, prenom:user.prenom, id:user._id}});

                  await newLog.save();
                  res.json(user);	
                }
                else {
                    res.status(400).json({error : 'vous n\'avez pas le droit'});
                }
            }

            //Déblocage
            else if(user.role == 'bloqué'){

                user.role = 'user';
                await user.save(function(err){
                    if(err) res.send(err);
                });

                var newLog = new Log({type_log : 'déblocage_compte', user :{nom:user.nom, prenom:user.prenom, id:user._id}});
                await newLog.save();
                res.json(user);	
            }


        });


});



      
// ------------ ADMIN SILO --------------------------
app.route('/users/changerDroit')

          .post(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){

            User.findById(req.body.user_id, async function(err,user){
                
                if(err) res.send(err);
              
                if(user.role == 'user'){

                    user.role = 'admin';
                    user.adminlevel = req.user.adminlevel + 1;
                    await user.save();
                    res.json(user);	
                    
                }

                else if(user.role == 'admin'){
                    if(req.user.adminlevel < user.adminlevel){
                        user.role = 'user';
                        await user.save();
                     
                        res.json(user);	
                    }
                    else {
                        res.status(400).json({error : 'vous n\'avez pas le droit'});
                    }
                }
                
            

            });
});




// ------------ ADMIN SILO --------------------------
app.route('/users/admin/removeUserhistorique')
    .post(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){

        User.findById(req.body.user_id, async function(err, user){

            user.historique = [];

            await user.save(function(err){
                if(err) res.send(err);
            
            });
        
                res.json(user);

        });

    });


};


