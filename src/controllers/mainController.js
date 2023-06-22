const path = require("path");
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: (req, res) => {
        db.Products.findAll().
        then((product) => {
            return res.render('index', { products: product })
        })

    }
};


module.exports = controller;