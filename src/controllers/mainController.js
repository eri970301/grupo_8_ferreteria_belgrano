const path = require("path")
const fs = require('fs');
const controller = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath,"utf-8"));
        return res.render('index', {products})
    }
  
    
};
const productsFilePath = path.join(__dirname,"../dataBase/products.json");


module.exports = controller;