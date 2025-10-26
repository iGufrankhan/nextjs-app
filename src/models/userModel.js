import { verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({    
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],  
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,   
        required: [true, 'Password is required'],
    },
  
    isVerifyed: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetpasswordToken: String,
    forgetpasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

});


const User = mongoose.models.users||mongoose.model('users', userSchema);

export default User;