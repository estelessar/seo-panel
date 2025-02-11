import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const settings = await prisma.settings.findFirst();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: settings?.googleClientId || "",
      clientSecret: settings?.googleClientSecret || "",
      authorization: {
        params: {
          access_type: "offline",
          scope: "openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "your-development-secret",
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
});

export { handler as GET, handler as POST };
