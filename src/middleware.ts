import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ token }) {
      console.log(token, "MIDDLEWARE TOKEN");
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});
export const config = { matcher: ["/dashboard/:path*", "/categories/:path*"] };
