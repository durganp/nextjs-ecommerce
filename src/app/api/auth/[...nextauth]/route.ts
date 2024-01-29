import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
    adapter:PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
<<<<<<< HEAD
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
=======
            clientId:env.GOOGLE_CLIENT_ID,
            clientSecret:env.GOOGLE_CLIENT_SECRET,
>>>>>>> 268274ee6cba2e8208465b2c71856cbaf7ec3b11
        })
    ],
    callbacks:{
        session({session, user}) {
            session.user.id = user.id
            return session;
        }
    },
    events:{
        async signIn({user}) {
            await mergeAnonymousCartIntoUserCart(user.id)
        },
    }
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST}