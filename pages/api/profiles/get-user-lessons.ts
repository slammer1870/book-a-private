import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { username } = req.body;

    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds

    try {
      const lessons = await prisma.lesson.findMany({
        where: {
          user: { username: username },
          bookings: { none: { status: "active" } },
          date: {
            gte: futureDate,
          },
          available: true,
        },
        orderBy: {
          date: "asc",
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
