var User = require('./../../models/user').model('User');
var Log = require('./../../models/logs').model('Log');
var JWT = require('jsonwebtoken');


var signToken = (user) => {
    return JWT.sign({
        sub : user._id,
        iat : Math.floor(new Date().getTime()/1000),
        exp : Math.floor(new Date().getTime()/1000) + 60*60
    }, 'projetsecuritedessi');


};


module.exports = {


    signUp : async (req, res, next) => {
        console.log('here');

        var {nom, prenom, email, password} = req.value.body;
        var droit = '';
        var adminl;
        if(email == "josa@gmail.com" || email == "max@gmail.com"){
            droit = 'admin';
            adminl = 0;
        }
        else {
            droit = 'user';
        }

        var searchUser = await User.findOne({email});

        if(searchUser){
            if(searchUser.role == 'supprimé'){
                User.findById(searchUser._id, async function(err, user){

                    if(err) res.json(err);
                    if(user.email == "josa@gmail.com" || user.email == "max@gmail.com"){user.role = 'admin';}
                    else{ user.role = 'user';}
                    
                    await user.save();
                    var token = signToken(user);
                    res.status(200).json({token});
                });
            }
            else if(searchUser.role == 'bloqué'){
                 res.status(402).json({error :'Vous avez été bloqué, contactez un admin'});
            }
            else {
                res.status(401).json({error :'Un utilisateur est déjà inscrit avec ce mail'});
            }
            
        }
        if(adminl == 0){
            var newUser = new User({nom, prenom, email, password, role : droit, adminlevel: adminl});
        }
        else if(adminl != 0){
            var newUser = new User({nom, prenom, email, password, role : droit});
        }
        
        await newUser.save();

        var newLog = new Log({type_log : 'inscription', user :{nom:nom, prenom:prenom, id:newUser._id}});

        await newLog.save();


        var token = signToken(newUser);
        
        res.status(200).json({token});
    
     
    },

    signIn : async (req, res, next) => {

        var token = signToken(req.user);

        var newLog = new Log({type_log : 'connexion', user :{nom:req.user.nom, prenom:req.user.prenom, id:req.user._id}});
        
        await newLog.save();

        res.status(200).json({token});
       
       
        
    },

    isAdmin : async (req, res, next) => {

        User.findById(req.user._id, function(err, user){

            if(user.role == 'admin'){
                next();
            }
            else {
                return res.status(400).json({error :'Vous n\' etes pas autorisé'});
            }


        });

    },

    isAuthorized : async (req, res, next)  => {

        User.findById(req.user._id, function(err, user){

            if(user.role == 'bloqué' || user.role == 'supprimé'){
                return res.status(401).json({error :'Vous n\' etes pas autorisé'});
                
            }
            else {
                next();
                
            }


        });

        
    }

};
