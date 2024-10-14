const jwt = require("jsonwebtoken");

const middlewareController = {
    
    //verifytoken
    verifyToken: (req,res,next) =>{
        const token = req.headers.token;
        if(token){
            //Bearer 1234567
            const acccessToken = token.split(" ")[1];
            jwt.verify(acccessToken,process.env.JWT_ACCESS_KEY,(err,user)=> {
                if(err){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });

        }
        else{
            res.status(401).json("you're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req,res,next) =>{ 
        middlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("you're not allowed to delete other");
            }
        });
    },
};
module.exports = middlewareController;