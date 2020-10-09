const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const router = express.Router();

//Store pictures in uploads folder, new name and only .jpg, .jpeg, .png, .gif
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({
    storage,
    //800 kB max file size
    limits: {fileSize: 800000},
    fileFilter: (req, file, cb) => checkFileType(file, cb)
}).single('file');

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb('Images Only (jpeg, jpg, png, gif)');
    }
}

//Upload Image
router.post('/imageUpload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({
            success: true,
            image: req.file.path,
            fileName: req.file.filename
        })
    })
});

//Upload Product
router.post("/uploadProduct", (req, res) => {
    const product = new Product(req.body)
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});

//Get all Products
router.post('/getProducts', (req, res) => {
    let findArgs = {}

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price') {

            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .exec()
        .then(products => {
            res.status(200).json({
                success: true,
                products
            })
        })
        .catch(err => res.status(400).json({ success: false, err}))
});

module.exports = router;