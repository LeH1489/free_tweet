import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//api handler chức năng edit
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    //lấy user hiện tại từ session
    const { currentUser } = await serverAuth(req, res);

    //destructering data gửi đến
    const { name, username, bio, profileImage, coverImage } = req.body;

    //thiếu field
    if (!name || !username) {
      throw new Error("Missing field!");
    }

    //update
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
