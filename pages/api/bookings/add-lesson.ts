import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "../../../lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const { date, location, price } = req.body;
      const lesson = await prisma.lesson.create({
        data: {
          date: date,
          location: location,
          price: price,
          userId: session?.user.id as string,
        },
      });
      return res.json(lesson);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
