import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  secret: process.env.NEXTAUTH_SECRET,
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
          const user = {id: "99", name: "test", password: "1234"}
          if (credentials?.username === user.name && credentials?.password === user.password) {
              return user
          } else {
              return null
          }
      }
  })
  ],
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
