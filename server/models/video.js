var mongoose = require('mongoose');


var VideoSchema = new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto : true
    },
    id : String,
    lien_video : String,
    titre_video: String
    
});

module.exports = mongoose.model('Video',VideoSchema);
