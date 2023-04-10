let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router.get('/', productsController.index);
router.get('/create', productsController.create);
router.post('/', upload.single('productImage'), productsController.store);
router.delete('/delete/:id', productsController.delete);
router.get('/edit', productsController.edit);
router.get('/cart',productsController.cart);
router.get('/detail/:id', productsController.detail); 

module.exports = router