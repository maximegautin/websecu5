var mongoose = require('mongoose');


var PlaylistSchema = new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto : true
    },
   
     nom:{
         
            type: String,
            required: true
        },
     date_creation_playlist: {
            type: Date,
            default: Date.now
        },
     videos: [{
            type: Object
        
        }],
     owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
});

module.exports = mongoose.model('Playlist',PlaylistSchema);