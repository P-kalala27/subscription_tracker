import { Request, Response } from "express";
import UserModels from "../models/User.models";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"




export const registerUser = async (req: Request, res:Response) => {

    try {
        const {email, role, password, username } = req.body;

        //hashage du mot de passe
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        //creation d'un nouveau utilisateur
        const user = new UserModels({
            username,
            email,
            password:hashPassword,
            role
        })

        await user.save();

        res.status(201).json({message: "User register successfully !"})
        
    } catch (error) {
        res.status(500).json({error: "failed to register"})
    }

}



export const loginUser = async (req: Request, res:Response) => {
    try {
        //recuperation des données de connexion
        const {email, password } = req.body
        const existingUser = await UserModels.findOne({email})

        if(!existingUser){ 
            return res.status(401).json({error:"Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password.toString());

        
           if(!isMatch) {
            return res.status(401).json({error: "Invalid email or password"})
        }
        const GenToken = jwt.sign(
            {
                userId: existingUser._id,
                role:existingUser.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1min'
            }
        )

        res.json({
            GenToken,
            role:existingUser.role
        })
    } catch (error) {
       res.status(401).json({error: "Login failed "}) 
    }
}
