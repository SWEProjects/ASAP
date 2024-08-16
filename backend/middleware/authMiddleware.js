const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.SECRET_KEY ;



const authenticateJWT = (req, res, next) =>{
    

    const token = req.cookies['token']; // Use the correct cookie name

    

    if(!token){
        return res.status(401).json({
            message: "FORBIDDEN"
        })
    }

    jwt.verify(token, secret, (err,decoded)=>{
        if(err){
            return res.status(403).json({
                message: 'FORBIDDEN'
            })
        }
        
        console.log(decoded);

        req.user = decoded;
        next();
    })
}


module.exports = authenticateJWT;