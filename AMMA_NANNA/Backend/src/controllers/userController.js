import User  from '../models/User.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotEnv from 'dotenv'

dotEnv.config()
const SECRET_KEY = process.env.WHO_R_U

export const userRegister = async(req, res ) =>{
    const {username , email , password , role } = req.body
    try{
        if (!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All the fields are required"
            })
        }
        const userEmail = await User.findOne({email})
        if(userEmail){
            return res.status(400).json("Email already in use")

        }
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            username , 
            email , 
            password: hashedPassword ,
            role: role || 'User'
        })
        await newUser.save()

        res.status(201).json({message: " User Registered Successfully"})
        console.log('registered')
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const userLogin = async( req, res )=> {
    const { email , password } = req.body
    try {
        if(!email || !password){
            return res.status(400).json({
                success: false,
                error: " Email and password are required"
            })
        }
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password , user.password))){
            return res.status(401).json({error : " Invalid Username or Password"})
        }
        const token = jwt.sign({userId: user._id} , SECRET_KEY , { expiresIn : "1h"})

        res.status(200).json({success: "Login Successful", token})
        console.log(email , "this is email ", token )
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export const getAllUsers = async(req, res)=>{
    try {
        const Users = await User.find().populate('notes')
        res.json({Users})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export const getUserById = async (req,res)=>{
    const userId = req.params.id
    try {
        const user = await User.findById(userId).populate('notes')
        if(!user){
            return res.status(404).json({error: " Vendor not found "})
        }
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error"})       
    }
}
