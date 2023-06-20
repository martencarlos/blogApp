import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "../../../../lib/dbConnect";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await dbConnect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        let sessionUser = null;
         //Check if the user exists.
         await dbConnect();

         try {
           const DBUser = await User.findOne({
             email: email,
           });
 
           if (DBUser) {
            
             sessionUser = DBUser;
             
            } else {
              const newUser = new User({
                name: name,
                email: email,
                avatar: image,
              });
              await newUser.save();
              sessionUser = await User.findOne({
                email: email,
              });
            }
         } catch (err) {
           throw new Error(err);
         }
         return sessionUser;

      }else
        return true;
    },
    
    async session({ session }) {
      await dbConnect();

      const user = await User.findOne({
        email: session.user.email,
      });
       
      session.user = user;
    
  
      return session;
    },
  },
  pages: {
    error: "/login",
  },

});

export { handler as GET, handler as POST };
