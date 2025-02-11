import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

async function getGoogleCredentials() {
  const settings = await prisma.settings.findFirst();
  if (!settings?.googleClientId || !settings?.googleClientSecret) {
    throw new Error("Google API bilgileri bulunamadı");
  }
  return {
    clientId: settings.googleClientId,
    clientSecret: settings.googleClientSecret
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly"
        }
      }
    })
  ],
  callbacks: {
    async signIn() {
      try {
        const credentials = await getGoogleCredentials();
        // @ts-ignore
        authOptions.providers[0].clientId = credentials.clientId;
        // @ts-ignore
        authOptions.providers[0].clientSecret = credentials.clientSecret;
        return true;
      } catch (error) {
        console.error("Google giriş hatası:", error);
        return false;
      }
    },
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
};
