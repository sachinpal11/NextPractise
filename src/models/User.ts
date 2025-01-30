import mongoose, { Schema, Document } from "mongoose";

export interface message extends Document {
  content: string;
  createdAt: Date
}

const messageSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})


export interface User extends Document {
  username: string,
  email: string,
  password: string,
  verifyCode: string,
  verifyCodeExpiry: Date,
  isVerifed: boolean,
  isAcceptingMessage: boolean,
  message: message[]
}


const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "email is Required"],
    unique: true,
    match: [/.*?@?[^@]*\.+.*/, "Enter a Valid Email"]
  },
  password: {
    type: String,
    required: [true, "password is Required"]
  },
  verifyCode: {
    type: String,
    required: [true, "verify code is required"]
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code expiry is required"]
  },
  isVerifed: {
    type: Boolean,
    default: false
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true

  },
  message: [messageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema))

export default UserModel;