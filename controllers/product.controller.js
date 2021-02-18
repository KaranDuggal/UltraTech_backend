const ProductService = require('../services/product.services')
const productService = new ProductService();
const ValidatorService = require('../services/validator.services')
const validatorService = new ValidatorService()


module.exports = UserController = function () {
    this.add_product = async (req, res) => {
        try {
            console.log('start');
            const imagesURL = await productService.uploadImages(req,res)
            if(imagesURL===false){
                throw{custom_err_message:'place upload Image'}
            }
            // console.log('req.body.images', req.body.images)
            const addproduct = await productService.addProduct(req.body);
            return res.status(200).json({ success: true, message: `product Add Successfully.`, data: addproduct});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false, error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup" });
        }
    }
    this.get_all_product = async (req, res) => {
        try {
            const allproduct = await productService.getallProduct();
            return res.status(200).json({ success: true, message: `Get product Successfully.`, data: allproduct});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false,/*  error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup"  */});
        }
    }
    this.get_product = async (req, res) => {
        try {
            const getproduct = await productService.getProduct(req.params.id);
            if(getproduct===null){
                throw { custom_err_message: "This poduct not exist"}
            }
            return res.status(200).json({ success: true, message: `Get product Successfully.`, data: getproduct});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false, error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup" });
        }
    }
    this.delete_product = async (req, res) => {
        try {
            const deleteproduct = await productService.deleteProduct(req.params.id);
            return res.status(200).json({ success: true, message: `Delete product Successfully.`, data: deleteproduct});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false,/*  error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup"  */});
        }
    }
    this.edit_product = async (req, res) => {
        try {
            const editproduct = await productService.editProduct(req.params.id,req.body);
            return res.status(200).json({ success: true, message: `Update product Successfully.`, data: editproduct});
        } catch (err) {
            if(err.code===11000){  err = "This email Allready Exist"}
            return res.status(400).json({ success: false,/*  error: err, message: err.custom_err_message ? err.custom_err_message : "Could not Signup"  */});
        }
    }
}