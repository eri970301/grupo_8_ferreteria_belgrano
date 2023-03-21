const users = {
    login: (req, res)=> {
        return res.render('login')
},
    registro: (req, res)=> {
        return res.render('register')
}
}
module.exports = users