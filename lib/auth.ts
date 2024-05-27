import { NextAuthOptions, User , getServerSession} from "next-auth"
import { useSession } from "next-auth/react"
import { Redirect } from "next/navigation"

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import prisma from "@/lib/prisma"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: { label: "Password", type: "password" },
              },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) return null
                const dbUser = await prisma.user.findFirst({where: {email: credentials.email}})
                if (dbUser && dbUser.password === credentials.password) {
                    return dbUserWithoutPassword as User;
                }
           
                return null;
            }
        })
    ],
}

