const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Servidor escuchando en puerto " + port)
});