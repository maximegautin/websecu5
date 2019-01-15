var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Playlist = require('../models/playlist').model('Playlist');


var UserSchema = new mongoose.Schema({
   _id : {
       type: mongoose.Schema.Types.ObjectId,
       auto : true
   },
    nom: {
        type : String
       
    },
    prenom: {
        type : String
      
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
      
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'bloqué', 'supprimé']
    },
    password: {
        type : String,
        required: true,
        select: true
    },

    adminlevel: {
        type: Number,
        default: null
    },

    historique: [{
        recherche: String,
        date_recherche : {
            type : Date,
            default: Date.now
        }
    }],

    playlist: [{
        name:  {
            type : String
        },
        date_creation_playlist: {
            type: Date,
            default: Date.now
        },
        videos: [mongoose.Schema.Types.Mixed]   
        
    }]

    


});



UserSchema.pre('save',function(next){
	var user = this;

	//hash the password only if the password has been 
	//changed or user is new

	if(!user.isModified('password')) return next();

	//generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);

		//change the password to the hashed version
		user.password = hash;
		next();
	});
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
	var user = this;

	return bcrypt.compareSync(password,user.password);
};

module.exports = mongoose.model('User',UserSchema);
