import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

import { checkUserEmailPassword, oauthToDbUser } from '@/database/dbUsers'

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Your email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials
        return await checkUserEmailPassword(email, password)
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: 'auth/login',
    newUser: 'auth/register',
  },
  jwt: {},
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'credentials':
            token.user = user
            break
          case 'oauth':
            token.user = await oauthToDbUser(user.email, user.name)
            break
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    },
  },
})
