import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { username } = req.body;

    console.log("server username", username);
    try {
      const lessons = await prisma.lesson.findMany({
        where: {
          user: { username: username },
          bookings: { none: { status: "active" } },
          date: {
            gt: new Date(Date.now()),
          },
          available: true,
        },
      });

      return res.json(lessons);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: `Something went wrong` });
    }
  } else {
    return res.status(401).send({ message: "Method not allowed" });
  }
}
