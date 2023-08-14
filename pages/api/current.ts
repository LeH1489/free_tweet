import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

//api handler để lấy dữ liệu user hiện tại
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    //lấy user hiện tại từ serverAuth
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser); //trả về user hiện tại
  } catch (error) {
    console.log(error);
  }
}
