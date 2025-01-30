import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { boolean, date, string } from "zod";

export async function POST(req: Request) {
  await dbConnect()

  try {
    const { username, email, password } = await req.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true
    })
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "username already exist"
        },
        {
          status: 400
        }
      )
    }
    const existingUserbyEmail = await UserModel.findOne({ email })
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    if (existingUserbyEmail) {

    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerifed: false,
        isAcceptingMessage: true,
        message: []
      })
      await newUser.save()
      const emailResponse = await sendVerificationEmail(email, username, verifyCode)
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message
          }, {
          status: 500
        }
        )
      }
      return Response.json(
        {
          success: true,
          message: "user registered successfully ! Please verify your email"
        }, {
        status: 201
      }
      )
    }
  } catch (error) {
    console.error("error in routes", error);
    return Response.json({
      success: false,
      message: "error registering user"
    }, { status: 500 })
  }
}






