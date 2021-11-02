const jwt = require('jsonwebtoken');
const {secret}=require('./secret.json');

const authorize = (req, res, next)=>{
    const authHeader = req.headers.authorizatioon;

    if(authHeader){
        const token =authHeader.split('.')[1];

        let verifiedPetugas = jwt.verify(token, secret);
        
        if(!verifiedUser) return res.status(401).send('Unauthorized request')
        req.petugas = verifiedPetugas; // id & role
        next();
    }else{
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports=authorize;