let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/', usersController.login);

module.exports = router