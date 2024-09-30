import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { SignIn, signUp, userExists } from "./actions/user.actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const findUser = await userExists();
        if (!findUser) {
          await signUp({
            email: user.email!,
            password: "googleAuthPlaceholder",
            username: user.name!,
          });
        } else if (findUser) {
          await SignIn({
            email: user.email!,
            password: "googleAuthPlaceholder",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
      }
      return session;
    },
    redirect() {
      return "/sign-up";
    },
  },
});
