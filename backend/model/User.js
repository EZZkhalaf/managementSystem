const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,           
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6            
    },

    role: {
      type: String,
      enum: ['admin', 'employee'],
      required: true
    },

    profileImage: {
      type: String,           
      default: null
    }
  },
  {
    timestamps: {             
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);


const User = mongoose.model("User" , userSchema)
module.exports = User;