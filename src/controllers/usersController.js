const path = require("path")
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const controller = require("./productsController");
const usersFilePath = path.join(__dirname, "../dataBase/users.json");
const db = require('../database/models');


const users = {
    login: (req, res) => {
        return res.render('users/login')
    },

    
    processLogin: (req, res) => {
      const { email, password } = req.body;
    
      db.Users.findOne({ where: { email } })
        .then(users => {
          if (!users) {
            
            return res.render('users/login');
          }
    
          if (bcrypt.compareSync(password, users.password)) {
              res.cookie('recordame', users.email, { maxAge: 60000 });
              return res.render('users/admi', {users : [users] });
            
          }
    
          
          return res.render('users/login');
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
          const users = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            type: req.body.role,
            image: req.file ? req.file.filename : 'user.jpg'
          };
          db.Users.create(users)
            .then(user => {
              res.redirect("/users/personal")
              console.log(user)
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
        db.Users.findAll()
        
          .then(users => {
           
            return res.render('users/personal', { users: users });
          })
          .catch(error => {
            console.error('Error en personal:', error);
            return res.status(500).send('Error en el servidor');
          });
      },
      

   Eliminar: (req, res) => {
      let id = req.params.id;
      db.Users.destroy({
          where: {
            
              iduser: id
          }
      })
          .then(() => {
              res.redirect('/');
          })
          .catch(error => {
              console.error('Error al eliminar el Usuario:', error);
              res.redirect('/');
          })
          },
          
    edit:(req, res) => {
      let id = req.params.id;
      db.Users.findByPk(id)
          .then(user => {
            return res.render('users/Edit', { user: user });
            console.log(users)
          })
          .catch(error => {
              console.error('Error al obtener el detalle del producto:', error);
              res.redirect('/products');
          });
  },
                

 
    detailDG: (req, res) => {
 
        let id = req.params.id

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let userToSend = users.find(user => user.id == id)

        res.render('delet', {userToSend})
    /*     console.log(userToSend) */
        
       /*  res.render("login") */
  /*       res.render("Admi", {user: userToSend}) */


    }, 
    detail: (req, res) => {
      let id = req.params.id;
            db.Users.findByPk(id)
                .then(user => {
                  return res.render('users/delet', { user: user });
                  console.log(users)
                })
                .catch(error => {
                    console.error('Error al obtener el detalle del producto:', error);
                    res.redirect('/products');
                });
        }
    
    };

module.exports = users