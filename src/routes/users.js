let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const { validations } = require('../../public/js/registerValidator')
const { validateResult } = require('../middlewares/validationMiddleware')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);
//ruta de tipo get /users/registro
router.get('/register', usersController.registro);
router.post('/register', upload.single('avatar'), validations, (req, res) => {usersController.guardarUsuario(req, res);});
router.get('/personal', usersController.personal);
router.get('/detail/:id', usersController.detail);
router.get('/delete', usersController.Eliminar);
router.post('/delete/:id', usersController.Eliminar);
router.get('/edit/:id', usersController.edit);

module.exports = router




module.exports = router 