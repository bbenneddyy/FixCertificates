import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { 
                    label: "Username", 
                    type: "text", 
                    placeholder: "your-user-name" 
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your-password"
                }
            },
            async authorize(credentials) {
            /*this is where you need to retrieve user data 
            to verify with credential 
            Docs: https://next-auth.js.org/configuration/providers/credentials*/
                const user = {id: "99", name: "Dummy", password: "1234"}
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}
/*
              const { username, password } = credentials as { username: string; password: string };
              const user = await fetchUser(username);
              if (user) {
                return Promise.resolve(user);
              }
              return Promise.resolve(null);
            },
              password: { 
                label: "Password", 
                type: "password", 
                placeholder: "Enter your password" 
            },
        ],
    },
} */

