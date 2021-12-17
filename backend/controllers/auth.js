import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req,res) =>{
    try{
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users)

    }catch(error){
        console.log(error)
    }
}

export const registerUser = async(req,res) =>{
    const {name,email,password,confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({
        "messages" : "Password dan Confirm Password harus sama !"
    })
    const salt          = await bcrypt.genSalt(); //hash password
    const hashPassword  = await bcrypt.hash(password,salt) //hash password
    try{
        await Users.create({
            name    :name,
            email   :email,
            password:hashPassword
        });
        res.json({
            "messages" : "Register successfully!"
        });
    }
    catch(error)
    {
        res.json({
            "messages" : error
        });
    }
}

export const logoutUser = async(req,res) =>{
    // res.sendStatus(200);
    try{
        // await Users.update({
        //     refresh_token: ""
        // });
        res.json({
            "messages" : "Logout successfully!"
        });
    }
    catch(error)
    {
        res.sendStatus(401).json({
            "messages" : error
        });
    }
}


export const loginUser = async(req,res) =>{

    try{
        const user = await Users.findAll({
            where:{
                email:req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({
            "messages" : "Wrong Password!"
        });

        const userId        = user[0].id;
        const name          = user[0].name;
        const email         = user[0].email;
        const access_token  = jwt.sign({userId,name,email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '60s'
        });

        const refresh_token  = jwt.sign({userId,name,email},process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await Users.update({refresh_token:refresh_token},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken',refresh_token,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            secure:true 
        })
        console.log(req.cookies.refreshToken);
        res.json({access_token});
    }
    catch(error){
        res.status(404).json({
            "messages": "Email not registered!"
        })
    }
}