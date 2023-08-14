import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//api handler chức năng follow
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    //lấy current user
    const { currentUser } = await serverAuth(req, res);

    //lấy id của user muốn follow từ url
    const userId = req.method === "POST" ? req.body.userId : req.query.userId;

    //nếu ko có id của user
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    //tìm user muốn follow theo id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID!");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      //notifications part
      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you.",
            userId: userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
