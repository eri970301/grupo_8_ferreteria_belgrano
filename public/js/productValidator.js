const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const validateResult = require('../../src/middlewares/validationMiddleware');


const productValidator = [
    check('nombre')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('El nombre debe tener al menos 5 caracteres'),
  
    check('description')
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage('La descripción debe tener al menos 20 caracteres'),
  ];
  
  module.exports = {
    productValidator,
    validateResult
  };
  
  
  