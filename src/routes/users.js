let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator') ;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const validations = [
    body('firstName').notEmpty().withMessage('Ingresa un nombre valido'),
    body('lastName').notEmpty().withMessage('Ingresa un apellido valido'),
    body('email').isEmail().withMessage('Ingresa un email valido'),
    body('password').notEmpty().withMessage('Ingresa una contraseña'),
    body('role').notEmpty().withMessage('Ingresa un rol'),
    body('avatar').notEmpty().withMessage('Ingresa una imagen')
]

router.get('/login', usersController.login);   
//ruta de tipo get /users/registro
router.get('/register', usersController.registro);
router.post('/register', upload.single('avatar'), validations, usersController.guardarUsuario)  
router.get('/personal', usersController.personal);  

module.exports = router 