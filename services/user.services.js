const jwt = require('jsonwebtoken');

const DBService = require('./db.services');
const dbService = new DBService();
const user = require('../models/user.models');
const config = require('../configurations/config')
class UserController {
    constructor() { }
    check_email_exist(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const emailexist = await dbService.findOne(user, { email: email }).catch(err => {
                    throw err
                })
                resolve((emailexist && emailexist !== null) ? true : false)
            } catch (err) {
                reject(err)
            }
        })
    }
    signup(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('body',body);
                const model = new user(body);
                const newUser = await dbService.save(model).catch(err => {
                    console.log(err)
                    reject(err);
                });
                resolve(newUser);
            } catch (err) {
                reject(err);
            }
        })
    }
    check_email_exist_send_Data(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const emailexist = await dbService.findOne(user, { email: email }).catch(err => {
                    throw err
                })
                resolve((emailexist && emailexist !== null) ? emailexist : false)
            } catch (err) {
                reject(err)
            }
        })
    }
    createUserToken(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                const token = jwt.sign({
                    userId: data._id,
                    phonenumber: data.phonenumber,
                }, config.jwtSecret, { expiresIn: '1h' })
                resolve(token);
            } catch (err) {
                reject(err);
            }
        })
    }
    get_all_users() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await dbService.findMany(singupuser).catch(err => {
                    throw err
                })
                resolve((users && users  !== null) ? users : false)
            } catch (err) {
                reject(err)
            }
        })
    }
    delete_user(deletequery) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await dbService.deleteOne(singupuser, deletequery);
                resolve(user);
                return
            }
            catch (err) {
                reject(err);
                return
            }
        })
    }
}
module.exports = UserController;