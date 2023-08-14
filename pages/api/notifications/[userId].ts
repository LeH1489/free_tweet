import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//api handler chức năng notification
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    //lấy userId từ url
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID!");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //khi người dùng click vào notifications thì sẽ set hasNotification = false (ko còn noti nữa)
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
