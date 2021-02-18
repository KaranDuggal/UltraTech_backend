const mongoose = require('mongoose')
class DBService {
    constructor() { }
    findOne(collection, id) {
        return new Promise((resolve, reject) => {
            collection.findOne(mongoose.Types.ObjectId(id
            )).exec((err, data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    findOneByPhone(collection, phoneNo) {
        return new Promise((resolve, reject) => {
            collection.findOne(phoneNo).exec((err, data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    save(model) {
        return new Promise((resolve, reject) => {
            model.save((err, modelsaved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(modelsaved);
                }
            });
        });
    }
    findMany(collection) {
        return new Promise((resolve, reject) => {
            collection.find().exec((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }
    update(collection, findquery, updatequery) {
        return new Promise(async (resolve, reject) => {
            const update = await collection.findOneAndUpdate(findquery,updatequery)
            resolve(update)
        })
    }
}

module.exports = DBService;