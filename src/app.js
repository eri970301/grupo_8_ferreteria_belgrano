const express = require('express');
const app = express();
const path = require('path');
const rutaUsers = require('./routes/users');
const rutaMain = require('./routes/main');
const rutaProducts = require('./routes/products');

app.use(express.static(path.resolve(__dirname, '../public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/', rutaMain)
app.use('/login', rutaUsers)
app.use('/products', rutaProducts);

app.get("/registro", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
});
app.get("/producto", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/product.html"))
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Servidor escuchando en puerto " + port)
});