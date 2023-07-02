import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { name, email, username } = req.body;

    const blurb =
      "Hello and welcome to my profile. Each lesson is 1 hour long. Booking are refundable up to 24 hours in advance.";

    try {
      //creates the user in the db
      const result: User = await prisma.user.create({
        data: {
          name: name,
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          blurb: blurb,
        },
      });

      res.json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2002") {
          res.status(401).send({
            error: "User with this username or email already exists",
          });
        }
      } else {
        res.status(401).send({
          error: "Something went wrong.",
        });
      }
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
