import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req): Promise<any> {
        await dbConnect()
        try {
          const user = await UserModel.findOne(
            {
              $or: [
                { email: credentials.identifier },
                { password: credentials.identifier }
              ]
            }
          )
          if (!user) {
            throw new Error("No user found with is email")
          }
          if (!user.isVerifed) {
            throw new Error("please verify your email")

          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

          if (isPasswordCorrect) {
            return user
          }
          else {
            throw new Error("incorrect Password")
          }
        } catch (error: any) {
          throw new Error(error)
        }

      }
    })
  ],

  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
  ,
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, user }) {
      return token
    }
  }
}

