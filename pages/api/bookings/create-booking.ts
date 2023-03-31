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
      const { lesson, attendeeName, attendeeEmail, stripePaymentIntent } =
        req.body;

      try {
        const booking = await prisma.booking.create({
          data: {
            name: attendeeName,
            email: attendeeEmail,
            stripePaymentIntent: stripePaymentIntent || undefined,
            lesson: {
              connect: {
                id: lesson,
              },
            },
          },
        });
        return res.json(booking);
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
