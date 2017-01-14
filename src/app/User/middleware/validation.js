import Joi from 'joi-browser'

export const validateLogin = (data, cb) => {

    let Schema = Joi.object({
        username  : Joi.string().required().max(64),
        password  : Joi.string().required().max(64),
    })

    Joi.validate(data, Schema, { abortEarly: false }, (err, value) => {
        if(err) cb(err)
        if(!err) cb(null)
    })

}
