import type { NextApiRequest, NextApiResponse } from "next";

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
      const { date } = req.body;
      try {
        const lesson = await prisma.lesson.update({
          where: {
            userId_date: {
              userId: session.user.id as string,
              date: date,
            },
          },
          data: {
            available: false,
          },
        });
        return res.json(lesson);
      } catch (error) {
        console.log(error);
        res.status(401).send({
          error: "Something went wrong.",
        });
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
