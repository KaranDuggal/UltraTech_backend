const jwt = require('jsonwebtoken')
const config = require('../configurations/config');
const user = require('../models/user.models');
// middleware is just function
module.exports = async(req, res, next) => {
    try {
        console.log('in auth');
        const token = req.headers.authorization.split(" ")[1]
        console.log("token", token);
        console.log('config.jwtSecret)', config.jwtSecret)
        const decodedToken = jwt.verify(token, 'jwtdoctorappgsbitlabs');
        
        console.log('decodedToken', decodedToken)

        const User = await user.findOne({ _id: decodedToken.userId });
        if (!User) {
            throw Error;
        }
        req.user = User;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Auth Failed! "
        })

    }
}