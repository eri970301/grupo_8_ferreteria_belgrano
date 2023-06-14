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
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let usuarios;
        if (users == '') {
            usuarios = [];
        } else {
            usuarios = users
        }
        /* inicio de seccion */
        for (let i = 0; i < usuarios.length; i++) {
            if (req.body.email == usuarios[i].email && bcrypt.compareSync(req.body.password, usuarios[i].password)){
                 res.cookie('recordame', usuarios[i].email, { maxAge: 60000 });
          

                 switch (usuarios[i].type) {
                    case "Cliente":
                        return res.render('users/personal', { users });
                      break;
                    case "Administrador":
                        return res.render('users/Admi', { users })
                      break;
                  default:  res.send("No sos usuario registrado");
  
            }
        }
    }
    },



    registro: (req, res) => {
        return res.render('users/register')
    },



    guardarUsuario: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarioNuevo = {
                id: users[users.length - 1].id + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                type: req.body.role,
                avatar: req.file ? req.file.filename : 'user.jpg'
            };
            users.push(usuarioNuevo);
            let usersJSON = JSON.stringify(users, null, " ");
            fs.writeFileSync(usersFilePath, usersJSON);
            if(usuarioNuevo.type === "Cliente"){
                res.redirect("/")
                
            } else{
                    return res.render('users/Admi', { users })
                }
               
        } else {
           
            res.render('users/register', {
                
                errors: errors.array(),
                old: req.body
                
            })
        }
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