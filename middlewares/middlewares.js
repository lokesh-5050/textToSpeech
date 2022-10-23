exports.isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/")
    }
}

exports.checkIsLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        res.redirect("/chats")
    }else{
        return next();
    }
}
