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
    const { username } = req.body;

    if (username.length < 4) {
      res
        .status(401)
        .send({ error: "Username must be greater than 4 characters." });
    }

    if (username.length > 24) {
      res
        .status(401)
        .send({ error: "Username must be less than 24 characters." });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    switch (user) {
      case null:
        res.status(200).send({ message: "Username is available!" });
        break;
      case user:
        res.status(401).send({ error: "Username already exists." });
        break;
    }
  } else {
    res.status(401).send({ message: "Method not allowed" });
  }
}
