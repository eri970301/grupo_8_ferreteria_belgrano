const path = require("path")
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, "../dataBase/users.json");
const productsFilePath = path.join(__dirname, "../dataBase/products.json");

const users = {
    login: (req, res) => {
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let usuarios;
        if(users == ''){
            usuarios = [];
        }else{
            usuarios = users
        }
        for(let i = 0; i < usuarios.length; i++){
            if (req.body.email == usuarios[i].email && bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                res.send('Holaaa usuario');
            }
        }
        res.send('error')
    },
    registro: (req, res) => {
        return res.render('users/register')
    },
    guardarUsuario: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let usuarioNuevo = {
                id: users[users.length - 1].id + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                type: req.body.role,
                avatar: req.file ? req.file.filename : 'user.jpg'
            };
            users.push(usuarioNuevo);
            let usersJSON = JSON.stringify(users, null, " ");
            fs.writeFileSync(usersFilePath, usersJSON);
            res.redirect("personal");
        } else {
            res.render('users/register', {errors:errors.array(),
                old: req.body
            })
        }
    },
    personal: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        return res.render('users/personal', { users })
    }
}

module.exports = users