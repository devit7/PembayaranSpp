exports.IsPetugas=async(req, res, next)=>{
    if(req.petugas.level === "petugas"){
        next();
    }
    return res.status(401).send("Forbidden! you are not petugas");
}
exports.IsAdmin=async(req, res, next)=>{
    if(req.petugas.level === "admin"){
        next();
    }else{
        return res.status(401).send("Forbidden! you are not admin");
    }
}