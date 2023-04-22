 let express = require('express');
const users = require('../controllers/usersController');
let router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);   
//ruta de tipo get /usuarios/registro
router.get('/register', usersController.registro);
router.post('/register',usersController.guardarUsuario)  

router.get('/personal', usersController.personal);  

module.exports = router 