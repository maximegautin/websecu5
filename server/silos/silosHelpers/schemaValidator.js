var Joi = require('joi');



module.exports = {

    validateBody : (schema) => {

        return (req, res, next) => {
            var result = Joi.validate (req.body, schema);
            
            if(result.error){
                return res.status(400).json(result.error);
            }

            if(!req.value){req.value = {};}
            req.value['body'] = result.value;
            next(); 
        }

    },

    schemas : {
        RegisterSchema : Joi.object().keys({
            nom : Joi.string().required(),
            prenom : Joi.string().required(),
            email : Joi.string().email({ minDomainAtoms: 2 }).required(),
            password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
            confirm_password : Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'les mots de passe doivent correspondre' } } })



        }),


        MdpSchema : Joi.object().keys({
            old_password : Joi.string().required(),
            new_password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
            confirm_new_password : Joi.any().valid(Joi.ref('new_password')).required().options({ language: { any: { allowOnly: 'les mots de passe doivent correspondre' } } })
           
        }),


        AuthSchema : Joi.object().keys({
            email : Joi.string().email({ minDomainAtoms: 2 }).required(),
            password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()



        }),
        PlaylistSchema : Joi.object().keys({
            name : Joi.string().required().max(30)
        }),

        VideoSearchYSchema :  Joi.object().keys({
            recherche : Joi.string().required()
            
        }),

        VideoSearchVSchema :  Joi.object().keys({
            query : Joi.string().required(),
            page : Joi.number(),
            per_page : Joi.number()
              
            
        })


}

}