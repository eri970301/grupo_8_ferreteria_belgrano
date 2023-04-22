const path = require("path")
const fs = require('fs');
const productsFilePath = path.join(__dirname, "../dataBase/products.json");
const controller = {
    // Show all products
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        return res.render('products', { products })
    },
    create: (req, res) => {
        res.render('product-create-form')
    },
    store: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let productoNuevo = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default-image.png'
        };
        products.push(productoNuevo);
        let productsJSON = JSON.stringify(products, null, '');
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/products')
    },
    edit: (req, res) => {
        res.render('product-edit-form')
    },
    cart: (req, res) => {
        res.render('productCart')
    },
    delete: (req, res) => {
        let id = req.params.id;
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let finalProducts = products.filter(product => {
            return product.id != id
        })
        let productsJSON = JSON.stringify(finalProducts, null, ' ');
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/products');
    },
    detail: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let id = req.params.id
		let product = products.find(product => product.id == id)

		res.render('/detail', {
			product})
    }
    
}

module.exports = controller

