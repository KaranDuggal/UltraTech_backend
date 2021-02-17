const Joi = require('joi');
require('dotenv-flow').config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'staging', 'production')
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(3000),
    CMS_URL: Joi.string() /*.required()*/
        .description('CMS url required.'),
    WEBSITE_URL: Joi.string().allow(''),
    JWT_SECRET: Joi.string() /*.required()*/
        .description('JWT Secret required.'),
    API_KEY: Joi.string() /*.required()*/
        .description('Api Key required.'),
    MONGO_HOST: Joi.string() /*.required()*/
        .description('Mongo DB host required.'),
    MONGODB_USER: Joi.string() /*.required()*/
        .description('Mongo DB user required.'),
    MONGODB_PASSWORD: Joi.string() /*.required()*/
        .description('Mongo DB password required.'),
    MONGO_PORT: Joi.number()
        .default(27017)
}).unknown()
    .required();
// console.log(envVarsSchema);
// const envVars = envVarsSchema
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Configuration Error: ${error.message}`);
const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    apiUrl: envVars.API_URL,
    cmsUrl: envVars.CMS_URL,
    websiteUrl: envVars.WEBSITE_URL,
    apiKey: envVars.API_KEY,
    jwtSecret: envVars.JWT_SECRET,
    db: {
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        database: envVars.DB_NAME
    },
    mail: {
        email: envVars.MAIL_EMAIL,
        password: envVars.MAIL_PASSWORD
    }
};

module.exports = config;