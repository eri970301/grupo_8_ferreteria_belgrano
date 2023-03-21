const express = require('express');
const app = express();
const path = require('path');
const rutaUsers = require('./routes/users');
const rutaMain = require('./routes/main');

app.use(express.static(path.resolve(__dirname, '../public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/', rutaMain)
app.use('/usuarios', rutaUsers)
/* app.use('/register', rutaUsers)  */

/*  app.use('/register', rutaUsers)  */

/*  app.get("/registro", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/register.ejs"))
}); */  
app.get("/producto", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/product.html"))
});

app.get("/cart", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/productCart.html"))
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Servidor escuchando en puerto " + port)
});