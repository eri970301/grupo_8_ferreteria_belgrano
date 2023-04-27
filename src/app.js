const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const rutaUsers = require('./routes/users');
const rutaMain = require('./routes/main');
const rutaProducts = require('./routes/products');
const { cookie } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.static(path.resolve(__dirname, '../public')))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))
app.use(session({secret: 'Secreto',resave: true,saveUninitialized: true,}));
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/', rutaMain)
app.use('/products', rutaProducts);
app.use('/users', rutaUsers)

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Servidor escuchando en puerto " + port)
});
