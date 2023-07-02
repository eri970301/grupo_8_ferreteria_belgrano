const path = require("path");
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: (req, res) => {
        db.Products.findAll().then((product) =>{
            db.Categorys.findAll().then((category) => {
            return res.render('index', { products: product, category })
        })
        })
    }
};


module.exports = controller;