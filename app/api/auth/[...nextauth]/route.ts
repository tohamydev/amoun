import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data 
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        if (credentials.username === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
          return { id: 1, name: 'Admin' }
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

