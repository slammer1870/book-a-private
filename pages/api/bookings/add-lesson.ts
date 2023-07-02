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
      const { id, date, location, price, available } = req.body;

      if (location.length > 84) {
        res
          .status(401)
          .send({ error: "Location must be less than 84 characters." });
      }

      try {
        const lesson = await prisma.lesson.upsert({
          where: {
            userId_date: {
              userId: session.user.id as string,
              date: date,
            },
          },
          update: {
            date: date,
            location: location,
            price: Number(price) || undefined,
            available: true,
          },
          create: {
            date: date,
            location: location,
            price: Number(price),
            userId: session?.user.id as string,
          },
        });
        return res.json(lesson);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === "P2002") {
            res.status(401).send({
              error: "Lesson at this date and time already exists",
            });
          }
        } else {
          console.log(error);
          res.status(401).send({
            error: "Something went wrong.",
          });
        }
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
