import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { name, email, username } = req.body;

    try {
      const result = await prisma.user.create({
        data: {
          name: name,
          email: email,
          username: username,
        },
      });
      res.json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2002") {
          res.status(401).send({
            message: "User with this username or email already exists",
          });
        }
      }
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
