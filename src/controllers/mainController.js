const path = require("path")
const fs = require('fs');
const controller = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath,"utf-8"));
        return res.render('index', {products})
    }
<<<<<<< HEAD
  
    
};
=======
}

const productsFilePath = path.join(__dirname,"../dataBase/products.json");


>>>>>>> 4572438bf65f444e8d364218a63112b90c917221
module.exports = controller;