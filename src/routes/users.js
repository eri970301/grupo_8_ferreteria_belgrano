let express = require('express');
let router = express.Router();
const usersController = require('../controllers/usersController')
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router.get('/login', usersController.login);   
//ruta de tipo get /users/registro
router.get('/register', usersController.registro);
router.post('/register', upload.single('avatar'), usersController.guardarUsuario)  
router.get('/personal', usersController.personal);  

module.exports = router 