const path = require("path")
const fs = require('fs');
/* const productsFilePath = path.join(__dirname,"../dataBase/products.json"); */
const personaFilePath = path.join(__dirname, "../dataBase/users.json");

const users = {
    login: (req, res) => {
        return res.render('login')

    },
    registro: (req, res) => {
        return res.render('register')
    },
    guardarUsuario: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        let usuarioNuevo = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            email: req.body.email
        };

        users.push(usuarioNuevo);

        let usersJSON = JSON.stringify(users, null, " ");

        fs.writeFileSync(usersFilePath, usersJSON);

        res.redirect("/register");
    },


    personal: (req, res) => {
        const products = JSON.parse(fs.readFileSync(personaFilePath, "utf-8"));
        return res.render('personal', { products })
    }
}

module.exports = users