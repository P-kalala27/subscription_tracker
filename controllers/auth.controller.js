import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRATION_TIME } from "../config/env.js"
import User from "../models/users.model.js"

export const signup = async (req, res, next) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        const { email, password, name } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{
            email, 
            name,
            password: hashedPassword
        }], { session })

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME})


        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }

}

export const signIn = async (req, res, next) => {
    

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });
        if(!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            const error = new Error('Invalid password')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME})

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signOut = async (req, res) => {}




