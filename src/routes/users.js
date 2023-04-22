 let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);   
//ruta de tipo get /usuarios/registro
router.get('/register', usersController.registro);  

router.get('/personal', usersController.personal);  

router.post('/registro', usersController.registro)

module.exports = router 