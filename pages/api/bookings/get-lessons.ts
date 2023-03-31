import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { user_id } = req.body;

    const lessons = await prisma.lesson.findMany({
      where: {
        userId: user_id,
        date: {
          gt: new Date(Date.now()),
        },
        available: true,
      },
      include: {
        bookings: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return res.json(lessons);
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
