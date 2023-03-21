let express = require('express');
let router = express.Router();
const productsController = require('../controllers/productsController')

router.get('/', productsController.index);
router.get('/create', productsController.create);
router.get('/edit', productsController.edit);
router.get('/cart',productsController.cart);

module.exports = router