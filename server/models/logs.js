var mongoose = require('mongoose');


var LogsSchema = new mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        auto : true
    },

    type_log : {
        type : String,
        enum : ['connexion', 'inscription', 'suppression_compte', 'blocage_compte', 'déblocage_compte', 'modification_compte']
    },
    date_log : {
        type : Date,
        default : Date.now
    },
    user : {

        nom : String,
        prenom : String,
        id : String
    }
});

module.exports = mongoose.model('Log',LogsSchema);
