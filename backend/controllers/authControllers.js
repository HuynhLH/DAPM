const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let refreshTokens = [];
const authController ={
    //register
    registerUser:async(req,res) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // crate user
            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password: hashed,
            });

            //save to db
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }

    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "20s"}
        );  
    },
    //GENERATE REFRESH TOKEN
    generaterefreshToken:(user) =>{
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "30d"

    });
    },
    //LOGIN
    loginUser: async(req,res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("sai username!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            ); 
            if(!validPassword){
                return res.status(404).json("sai Password!");
            }
            if(user && validPassword){
            const acccessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generaterefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                samesite:"strict",
            })
            const {password, ...others} = user._doc;
                res.status(200).json({...others,acccessToken});
            }

        } catch (error) {
            res.status(500).json(error);
        }
    },
    requestRefreshToken: async(req,res) =>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("you're not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid ");
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
            if(err){
                console.log("err");
            }
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
            //
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generaterefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                samesite:"strict",
            });
            res.status(200).json({acccessToken: newAccessToken});
        })
    },

    userLogout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out!");
    }
};

// store token 
//(1) local storage:
//xss
//2) HTTPONLY cookies:
//CRSF -> SAMESITE
//3) REDUX STORE -> ACCESSTOKEN 
// HTTPONLY COOKIES -> REFRESHTOKEN 
module.exports = authController;