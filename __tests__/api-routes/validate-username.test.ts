import { testApiHandler } from "next-test-api-route-handler";
// Import the handler under test from the pages/api directory
import endpoint from "@/pages/api/users/validate-username";
import type { PageConfig } from "next";

import prisma from "../../lib/prisma";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

const user = {
  name: "John Does",
  email: "johndoes@gmail.com",
  username: "jdoes1",
};

describe("testing username validation for endpoint /api/validate-username/", () => {
  it("returns that username is available", async () => {
    await testApiHandler({
      handler,
      requestPatcher: (req) =>
        (req.headers = { "content-type": "application/json" }),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({ username: user.username }),
        });
        await expect(res.json()).resolves.toStrictEqual({
          message: "Username is available!",
        }); // ◄ Passes!
      },
    });
  });
  it("returns an error message saying that this username already exists", async () => {
    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });

    await testApiHandler({
      handler,
      requestPatcher: (req) =>
        (req.headers = { "content-type": "application/json" }),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({ username: user.username }),
        });
        await expect(res.json()).resolves.toStrictEqual({
          error: "Username already exists.",
        }); // ◄ Passes!
      },
    });
  });
});

afterAll(() => {
  return prisma.user.delete({
    where: {
      email: user.email,
    },
  });
});
