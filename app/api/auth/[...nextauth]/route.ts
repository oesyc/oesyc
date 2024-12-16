import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'


const handler =  NextAuth({
  providers: [
    // OAuth authentication providers...
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    // Passwordless / email sign in
  ]
})

export {handler as GET, handler as POST}