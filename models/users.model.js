import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minlength: [3, 'User Name must be at least 3 characters long'],
        maxLength:50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minlength: [8, 'User Password must be at least 8 characters long'],
    },
        
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
