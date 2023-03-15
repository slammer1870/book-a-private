import { testApiHandler } from "next-test-api-route-handler";
// Import the handler under test from the pages/api directory
import endpoint from "@/pages/api/users/register";
import type { PageConfig } from "next";

import prisma from "../../lib/prisma";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;

const user = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  username: "jdoe1",
};

describe("testing user registration for endpoint /api/register/", () => {
  it("creates a user", async () => {
    await testApiHandler({
      handler,
      requestPatcher: (req) =>
        (req.headers = { "content-type": "application/json" }),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify(user),
        });
        await expect(res.json()).resolves.toEqual(
          expect.objectContaining(user)
        ); // ◄ Passes!
      },
    });
  });
  it("returns an error message saying that this user already exists", async () => {
    await testApiHandler({
      handler,
      requestPatcher: (req) =>
        (req.headers = { "content-type": "application/json" }),
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify(user),
        });
        await expect(res.json()).resolves.toStrictEqual({
          error: "User with this username or email already exists",
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
