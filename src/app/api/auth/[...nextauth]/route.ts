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
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
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