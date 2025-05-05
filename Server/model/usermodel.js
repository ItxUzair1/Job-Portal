const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],

    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    bookmarkedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
}, { timestamps: true });

const User=mongoose.model('User',userSchema);
module.exports=User;