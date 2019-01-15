
var User = require('../models/user').model('User');
var Log = require('../models/logs').model('Log');

var security = require('./silosHelpers/securityFunctions');

var passport = require('passport');
require ('./silosHelpers/passport');



module.exports = function(app){



// _____________ ADMIN SILO ___________________________________________
app.route('/users/logs')
    .post(passport.authenticate('jwt', {session : false}), security.isAdmin, function(req, res){


            Log.find({'user.id' :  req.body.user_id}, function(err, logs){

                res.json(logs);
            }

      );

});

};

