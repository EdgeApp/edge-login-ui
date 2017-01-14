import Joi from 'joi-browser'

export const validateAddOperator = (data, cb) => {

    let Schema = Joi.object({
        account : {
            first 		: Joi.string().required().max(64),
            middle 		: Joi.any().optional(),
            last 		: Joi.string().required().max(64),
            company 	: Joi.string().required(),
            position 	: Joi.any().optional(),
            email  		: Joi.string().required().email().max(64),
            phone 		: Joi.any().optional(),
			address		: Joi.any().optional()
        },
        user : {
            username 		        : Joi.string().token().lowercase().required(),
            email			        : Joi.any().optional(),
            password 		        : Joi.string().required().min(6).max(64),
            password_confirmation   : Joi.string().required().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
        }
    })

    Joi.validate(data, Schema, { abortEarly: false }, (err, value) => {
        if(err) cb(err)
        if(!err) cb(null)
    })

}

export const validateOperatorEditUser = (data, cb) => {

    let Schema;

    if (!data.password || !data.password_confirmation) {
         Schema = Joi.object({
             username 		        : Joi.string().required().max(64),
             password 		        : Joi.any().optional(),
             password_confirmation  : Joi.any().optional()
        })
    }

    if(data.password || data.password_confirmation) {
        Schema = Joi.object({
            username 		        : Joi.string().required().max(64),
            password 		        : Joi.string().required().min(6).max(64),
            password_confirmation   : Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
        })
    }

    Joi.validate(data, Schema, { abortEarly: false }, (err, value) => {
        if(err) cb(err, null)
        if(!err) cb(null, value)
    })

}

export const validateEmployeeEditAccount = (data, cb) => {

    let Schema = Joi.object({
		first 		: Joi.string().required().max(64),
		middle 		: Joi.any().optional(),
		last 		: Joi.string().required().max(64),
		company 	: Joi.string().required(),
		position 	: Joi.any().optional(),
		email  		: Joi.string().required().email().max(64),
		phone 		: Joi.any().optional(),
		address		: Joi.any().optional()
    })

    Joi.validate(data, Schema, { abortEarly: false }, (err, value) => {
        if(err) cb(err)
        if(!err) cb(null)
    })

}
