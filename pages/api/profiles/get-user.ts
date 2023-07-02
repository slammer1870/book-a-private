import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { username } = req.body;
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          username: username.toLowerCase(),
        },
        select: {
          name: true,
          username: true,
          blurb: true,
        },
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ error: `Unable to find user with username ${username}` });
    }
  } else {
    return res.status(401).send({ message: "Method not allowed" });
  }
}
