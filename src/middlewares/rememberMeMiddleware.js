function rememberMeMiddleware (req,res,next){
    next();

if(req.cookie.recordame != undefined && req.session.usuarios==undefined){

const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let usuarios;
        if(users == ''){
            usuarios = [];
        }else{
            usuarios = users
        }
}
}
module.exports= rememberMeMiddleware