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
    //lấy postId từ url
    const { postId } = req.query;

    //nếu ko có postId
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID!");
    }

    //tìm bài post theo id
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
