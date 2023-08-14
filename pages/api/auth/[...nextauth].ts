import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CreadentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CreadentialsProvider({
      name: "credentials", //tên để khi gọi hàm signIn của nextjs để nó biết là dùng Provider nào để đăng nhập
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        //nếu ko có email và password
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials!");
        }

        //tìm user theo email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        //nếu user không có or ko có hashedPassword
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        //check password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        //sai password
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", //turn on debug (trong terminal) if đang trong development
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
