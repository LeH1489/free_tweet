import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//api handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    //lấy id từ url
    const { userId } = req.query;

    //nếu ko có id or không phải kiểu chuỗi
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    //tìm user theo id
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    //tìm user follow current user và đếm xem current user có bao nhiêu followers
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
