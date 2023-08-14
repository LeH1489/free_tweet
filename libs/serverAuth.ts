import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//dùng để protecting route (kiểm tra xem người dùng có đăng nhập hay không) và trả về user hiện tại
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  //kiểm tra trong sesion có trường user hay không
  if (!session?.user?.email) {
    throw new Error("Not signed in.");
  }

  //tìm user trong mongo bằng email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //nếu ko có user
  if (!currentUser) {
    throw new Error("Not signed in!");
  }

  //trả về đối tượng
  return { currentUser };
};

export default serverAuth;
