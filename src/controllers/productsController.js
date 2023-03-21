const path = require("path")
const fs = require('fs');
const productsFilePath = path.join(__dirname,"../dataBase/products.json");
const controller = {
    // Show all products
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath,"utf-8"));
        return res.render('products', {products})
    },
    create: (req, res) =>{
        res.render('product-create-form')
    },
    edit: (req, res) =>{
        res.render('product-edit-form')
    },
    cart: (req, res)=>{
        res.render('productCart')
    }
}

module.exports = controller