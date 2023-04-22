const path = require("path")
const fs = require('fs');
/* const productsFilePath = path.join(__dirname,"../dataBase/products.json"); */
const personaFilePath = path.join(__dirname,"../dataBase/users.json");

const users = {
    login: (req, res)=> {
        return res.render('login')
},
    registro: (req, res)=> {
        return res.render('register')
},
    personal: (req, res)=> {
        const products = JSON.parse(fs.readFileSync(personaFilePath,"utf-8"));
        return res.render('personal', {products})
}
}

module.exports = users