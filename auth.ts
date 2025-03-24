import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/email";
import { redis } from "./lib/redis";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import LinkedIn from "next-auth/providers/linkedin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    // Resend({
    //   from: `AhaTool <support@ahatool.ai>`,
    //   sendVerificationRequest,
    // }),
    GitHub,
    Google,
    LinkedIn,
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    // error: "/auth/error",
  },
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        // const currentUser = await prisma.user.findUnique({
        //   where: { id: token.sub },
        // });

        // if (currentUser) {
        // session.user.credits = currentUser.credits ?? undefined;
        // session.user.stripePriceId = currentUser.stripePriceId;
        // }
      }
      session.user.name = session.user.name || session.user.email.split("@")[0];
      return session;
    },
  },
});
