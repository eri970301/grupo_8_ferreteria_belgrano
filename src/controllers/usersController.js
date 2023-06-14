const path = require("path")
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const controller = require("./productsController");
const usersFilePath = path.join(__dirname, "../dataBase/users.json");


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

        let finalUsers = users.filter(user => {
            return user.id != id
        })
      

         let usersJSON = JSON.stringify(finalUsers, null, ' ');

        fs.writeFileSync(usersFilePath, usersJSON); 

        console.log(finalUsers)
         res.redirect("/");
    },

    
    personal: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        res.render('users/register')
    },
 
    detailDG: (req, res) => {
 
        let id = req.params.id

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let userToSend = users.find(user => user.id == id)

        res.render('delet', {userToSend})
        console.log(userToSend)
        
       /*  res.render("login") */
  /*       res.render("Admi", {user: userToSend}) */


    }, 
    detail: (req, res) => {
       
        let id = req.params.id

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let userToSend = users.find(user => user.id == id)
   
          res.render('users/delet', {users: userToSend}) 
        console.log(userToSend)  
    },

};

module.exports = users