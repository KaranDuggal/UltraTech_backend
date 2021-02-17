const bcrypt = require('bcrypt')
const UserService = require('../services/user.services')
const userService = new UserService();
const ValidatorService = require('../services/validator.services')
const validatorService = new ValidatorService()

module.exports = UserController = function () {
    this.user_signup = async (req, res) => {
        try {
            // let existingUser = await userService.check_email_exist(req.body.email);
            // if (existingUser === true) { throw { custom_err_message: "User Already Exists" } }
            const validate = await validatorService.schemas.signupSchema.validate(req.body)
            if (validate.error) { throw { custom_err_message: "error in validatorService.schemas.signupSchema", error: validate.error.details } }

            let hashedPassword = await bcrypt.hash(validate.value.password, 10);
            validate.value.password = hashedPassword;
            const user = await userService.signup(validate.value);
            const token = await userService.createUserToken(user);
            return res.status(200).json({ success: true, message: `created successfully.`, data: user,Token: token});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false, error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup" });
        }
    }

    this.user_login = async (req, res) => {
        try {
            // ==================================Nodemailer======================================
            // await nodemailer.sendmail()
            // ==================================================================================
            const validate = await validatorService.schemas.loginScema.validate(req.body);
            // ==================================================================================
            let User = await userService.check_email_exist_send_Data(req.body.email);
            console.log('User', User)
            // ==================================================================================
            const password = await bcrypt.compare(req.body.password, User.password)
            if (password === false) { throw { custom_err_message: "wrong password" } }
            // ==================================================================================
            const token = await userService.createUserToken(User);
            return res.status(200).json({ success: true, message: `Loged In Successfully`, data: User, token: token });
        } catch (err) {
            console.log(`err at user_login ${err}`);
            return res.status(400).json({ success: false, message: err.custom ? err.custom.message : `Couldn't login. Please try again later.`, error: err })
        }
    }
    this.get_all_users = async (req, res) => {
        try {
            const users = await userService.get_all_users();
            return res.status(200).json({ success: true, message: `All Users`, data: users });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: err.custom ? err.custom.message : `error in usersget route`, error: err })
        }
    }
    this.edit_user = async (req, res) => {
        try {
            console.log('in getallusers');
            const users = await userService.get_all_users();
            return res.status(200).json({ success: true, message: `All Users`, data: users });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: err.custom ? err.custom.message : `error in usersget route`, error: err })
        }
    }
    this.delete_user = async (req, res) => {
        try {
            console.log('in delete');
            let deleteuser = await userService.delete_user(req.params.id);
            console.log('deleteuser:', deleteuser)
            if (deleteuser === false) { throw { custom_err_message: "User Already deleted" } }
            // ==================================================================================
            return res.status(200).json({ success: true, message: `user deleted successfully.`, data: deleteuser });
        } catch (err) {
            console.log("error in delete part", err);
            return res.status(400).json({ success: false, error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup" });
        }
    }

}