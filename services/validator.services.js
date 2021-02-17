const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

class ValidatorService {
    constructor() {
        this.schemas = {};
        this.initializeScemas();
    }
    initializeScemas() {
        this.schemas.signupSchema = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string(),//.pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        });
        this.schemas.loginSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        this.schemas.productSchema = Joi.object({
            product_name: Joi.string().required(),
            product_type: Joi.string().required(),
            brand_name: Joi.string().required(),
            size: Joi.number(),
            quantity: Joi.number(),
            price: Joi.number().required(),
            images: Joi.array().required()
        });
    }
}

module.exports = ValidatorService;