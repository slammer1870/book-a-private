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
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    switch (user) {
      case null:
        res.status(401).send({ error: "User does not exist." });
        break;
      case user:
        res.status(200).send({ message: "User exists." });
        break;
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
