const multer = require('multer')
const path = require('path')
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
    uploadImages(req,res) {
        return new Promise(async (resolve, reject) => {
            try {
                const filePath = './public/uploadedImages';
                var storage = multer.diskStorage({
                    destination: function (req, file, cb) {
                        cb(null, filePath)
                    },
                    filename: function (req, file, cb) {
                        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))//Date.now() + '-' + file.originalname + path.extname(file.originalname)
                    }
                })
                var upload = multer({ storage: storage }).array('image');
                upload(req, res, async function (err) {
                    if (err) {reject(err)}
                    const imgURLS = []
                    for (let i = 0; i < req.files.length; i++) {
                        const IMGURL = { URL: req.files[i].path }
                        imgURLS.push(IMGURL)
                    }
                    resolve(imgURLS)
                });
            } catch (err) {
                reject(err);
            }
        })
    }
}
module.exports = ProductService