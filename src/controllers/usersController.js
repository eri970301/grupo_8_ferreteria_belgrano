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
        const { email, password } = req.body;
        
        Usuario.findOne({ where: { email } })
          .then(usuario => {
            if (usuario && bcrypt.compareSync(password, usuario.password)) {
              res.cookie('recordame', usuario.email, { maxAge: 60000 });
              return res.render('users/Admi', { users: [] });
            }
            
            return res.render('users/register');
          })
          .catch(error => {
            console.error('Error en processLogin:', error);
            return res.status(500).send('Error en el servidor');
          });
      },
      
    
    registro: (req, res) => {
        return res.render('users/register')
    },
    guardarUsuario: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const usuarioNuevo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            type: req.body.role,
            avatar: req.file ? req.file.filename : 'user.jpg'
          };
          Usuario.create(usuarioNuevo)
            .then(nuevoUsuario => {
              res.redirect("personal");
            })
            .catch(error => {
              console.error('Error en guardarUsuario:', error);
              return res.status(500).send('Error en el servidor');
            });
        } else {
          res.render('users/register', {
            errors: errors.array(),
            old: req.body
          });
        }
      },
      
    personal: (req, res) => {
        Usuario.findAll()
          .then(users => {
            return res.render('users/personal', { users });
          })
          .catch(error => {
            console.error('Error en personal:', error);
            return res.status(500).send('Error en el servidor');
          });
      },
      

    Eliminar: (req, res) => {
        let id = req.params.id;

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        const usuario = users.find(user => {
            return users.id == id
        })
        console.log(usuario)
        res.send('FALTA TERMINAR ')



    },
    detail: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        let id = req.params.id
        let product = products.find(product => product.id == id)

        res.render('detail', { users })
    }

}

module.exports = users