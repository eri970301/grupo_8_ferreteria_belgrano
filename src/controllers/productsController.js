const path = require("path")
const fs = require('fs');
const productsFilePath = path.join(__dirname, "../dataBase/products.json");
const db = require('../database/models');

const controller = {
    // Show all products
    index: (req, res) => {
        db.Products.findAll()
        .then((product) => {
            return res.render('products', { products: product })
        })
    },
    category: (req, res) => {
        db.Categorys.findAll()
        .then((category => {
            return res.render('categorys', {category})
        }))
    },
    categoryDetail: (req, res) => {
        const idcategory = req.params.idcategory
        db.Categorys.findByPk(idcategory, {
            include: [{
                model: db.Products,
                as: 'products'
            }]
        })
        .then((category => {  
            console.log(category)
           if(!category){
                return res.status(404).send('Categoria no encontrada');
            }
            const products = category.products;
            
            return res.render('categoryDetail', {products, category})
        }))
        .catch((error) => {
            console.error('Error al obtener los productos de la categoría:', error);
            return res.status(500).send('Error al obtener los productos de la categoría');
          });
    },
    search: (req, res) =>{
        let productSearch = req.query.query.toLowerCase();
        let productsResults = [];
        db.Products.findAll()
        .then((product =>{
            for(let i=0; i<product.length; i++){
                if(product[i].name.toLowerCase().includes(productSearch)){
                    productsResults.push(product[i])
                }
            }
            console.log(productsResults)
            return res.render('products', {products:productsResults})
        }))
    },
    create: (req, res) => {
        res.render('product-create-form')
    },
    store: (req, res) => {
        db.Products.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default-image.png',
            categoryId: req.body.category,
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
            categoryId: req.body.category,
            type: req.body.type,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
        }, {
            where: {
                idproduct: req.params.id
            },
        })
        res.redirect('/products')
    },
    cart: (req, res) => {
        res.render('productCart')
    },
    delete: (req, res) => {
        let id = req.params.id;
        db.Products.destroy({
            where: {
                idproduct: id
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
        console.log(id)
        db.Products.findByPk(id)
            .then(product => {
                console.log(product)
                res.render('detail', { product:product });
            })
            .catch(error => {
                console.error('Error al obtener el detalle del producto:', error);
                res.redirect('/products');
            });
    }

}

module.exports = controller