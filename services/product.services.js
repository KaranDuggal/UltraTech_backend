const DBService = require('./db.services');
const dbService = new DBService();
const product = require('../models/product.models');
class ProductService {
    constructor() { }
    addProduct(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const model = new product(body);
                const newUser = await dbService.save(model).catch(err => {reject(err);});
                resolve(newUser);
            } catch (err) {
                reject(err);
            }
        })
    }
    getallProduct(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await dbService.findMany(product).catch(err => {throw err})
                resolve((products && products  !== null) ? products : false)
            } catch (err) {
                reject(err);
            }
        })
    }
    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const getproducts = await dbService.findOne(product,id)
                resolve(getproducts)
            } catch (err) {
                reject(err);
            }
        })
    }
    deleteProduct(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteproducts = await dbService.deleteOne(product,id)
                resolve(deleteproducts)
            } catch (err) {
                reject(err);
            }
        })
    }
    editProduct(id,body) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateproducts = await dbService.update(product,id,body)
                resolve(updateproducts)
            } catch (err) {
                reject(err);
            }
        })
    }
}
module.exports = ProductService