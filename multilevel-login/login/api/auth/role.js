exports.IsCustomer=async(req, res, next)=>{
    if(req.usser.role === "customer"){
        next();
    }
    return res.status(401).send("Forbidden! you are not customer");
}
exports.IsAdmin=async(req, res, next)=>{
    if(req.user.role === "admin"){
        next();
    }else{
        return res.status(401).send("Forbidden! you are not admin");
    }
}