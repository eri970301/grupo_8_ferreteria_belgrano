const path = require("path");
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: (req, res) => {
        db.Products.findAll({
            limit: 5,
        }).then((product) =>{
            db.Categorys.findAll({
                limit: 4
            }).then((category) => {
            return res.render('index', { products: product, category })
        })
        })
    }
};


module.exports = controller;