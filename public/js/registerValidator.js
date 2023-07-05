const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const validateResult = require('../../src/middlewares/validationMiddleware');

const validations = [
  check('firstName')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),

  check('lastName')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres'),

  check('email')
    .isEmail()
    .withMessage('Ingrese un email valido'),

  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),

  check('role')
    .notEmpty()
    .withMessage('Ingresa un rol'),
];

module.exports = {
  validations,
  validateResult
};



