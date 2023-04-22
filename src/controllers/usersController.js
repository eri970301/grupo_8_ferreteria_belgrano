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
},
    store: (req, res) => {
        const users = JSON.parse(fs.readFileSync(personaFilePath,"utf-8"));
        let userNew = {
			id: users[users.length - 1].id + 1,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : 'default-image.png'
		};
        users.push(userNew);
        let usersJSON = JSON.stringify(users, null, '');
        fs.writeFileSync(usersFilePath, usersJSON);
        res.redirect('/products')
    }
}

module.exports = users