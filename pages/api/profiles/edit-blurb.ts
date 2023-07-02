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
      const { blurb } = req.body;

      if (blurb.length > 180) {
        res
          .status(401)
          .send({ error: "Must be less than 180 characters." });
      }

      try {
        const user = await prisma.user.update({
          where: {
            username: session.user.username as string,
          },
          data: {
            blurb: blurb,
          },
        });
        return res.json(user);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          res.status(401).send({
            error,
          });
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
