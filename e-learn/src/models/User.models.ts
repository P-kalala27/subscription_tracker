import { Schema, model } from "mongoose";


interface User{
    username: String;
    email:String;
    password:String;
    role: 'student' | 'teacher';
    isMFAEnable: boolean;
    mfaSecret: String,
    isAdmin: boolean;
}


const userSchema = new Schema<User>({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isMFAEnable:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['student', 'teacher'],
        default: 'student'
    },
    mfaSecret: {
        type:String
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
})


export default model<User>('Users', userSchema);