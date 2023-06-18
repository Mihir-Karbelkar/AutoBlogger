import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@autoblogger/app/lib/prisma';
import { AuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { signOut } from 'next-auth/react';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: 'Sign in',
    //   credentials: {
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'example@example.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) {
    //       return null;
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email,
    //       },
    //     });

    //     if (
    //       !user ||
    //       !(await compare(credentials.password, user.password || ''))
    //     ) {
    //       return null;
    //     }

    //     return {
    //       id: user.id,
    //       email: user.email,
    //       name: user.name,
    //       randomKey: 'Hey cool',
    //     };
    //   },
    // }),
  ],
  debug: true,

  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET || 'MZkQf837vImpHr71iRcLzOgdxgF68gNgTQ0/vUTGUnc=',
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    async jwt({ user, token, ...rest }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
};
