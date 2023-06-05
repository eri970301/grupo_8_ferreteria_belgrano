const path = require("path")
const fs = require('fs');
const productsFilePath = path.join(__dirname, "../dataBase/products.json");
const db = require('../database/models');

const controller = {
    // Show all products
    index: (req, res) => {
        db.Products.findAll().then((product) => {
            console.log(product)
            return res.render('products', { products: product })
        })
    },
    create: (req, res) => {
        res.render('product-create-form')
    },
    store: (req, res) => {
        db.Products.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default-image.png',
            category: req.body.category,
            type: req.body.type,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
        })
        res.redirect('/products')
    },
    edit: (req, res) => {
        let id = req.params.id;
        db.Products.findByPk(id)
            .then((product) => {
                res.render('product-edit-form', { product: product })
            })
    },
    update: (req, res) => {
        db.Products.update({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default-image.png',
            category: req.body.category,
            type: req.body.type,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
        }, {
            where: {
                id: req.params.id
            },
        })
        res.redirect('/products')
    },
    cart: (req, res) => {
        res.render('productCart')
    },
    delete: (req, res) => {
        let id = req.params.id;


        Product.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect('/products');
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                res.redirect('/products');
            })
    },
    detail: (req, res) => {
        let id = req.params.id;
        Product.findOne({
            where: {
                id: id
            }
        })
            .then(product => {
                res.render('detail', { product });
            })
            .catch(error => {
                console.error('Error al obtener el detalle del producto:', error);
                res.redirect('/products');
            });
    }

}

module.exports = controller

