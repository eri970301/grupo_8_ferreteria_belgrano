 let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')
const { body } = require('express-validator');
const validaciones = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('apellido').notEmpty().withMessage('Debes completar el campo apellido'),
    body('usuario').notEmpty().withMessage('Debes completar el campo usuario'),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('contraseña').notEmpty().withMessage('Debes completar el campo contraseña')
]

router.get('/login', usersController.login);   
//ruta de tipo get /usuarios/registro
router.get('/register', usersController.registro);  

router.get('/personal', usersController.personal);  

router.post('/register', validaciones, usersController.store)

module.exports = router