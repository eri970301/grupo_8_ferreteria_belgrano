const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})
app.get('/loco', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/loco.html'))
})
app.get("/registro", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
});

app.get("/producto", function(req, res){
    res.sendFile(path.resolve(__dirname,"./views/product.html"))
});

let login = path.resolve(__dirname, "./views/login.html")
app.get("/login", (req, res) => {
    res.sendFile(login)
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Servidor escuchando en puerto " + port)
});