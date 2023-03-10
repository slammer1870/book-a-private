import { testApiHandler } from "next-test-api-route-handler";
// Import the handler under test from the pages/api directory
import endpoint, { config } from "@/pages/api/hello";
import type { PageConfig } from "next";

// Respect the Next.js config object if it's exported
const handler: typeof endpoint & { config?: PageConfig } = endpoint;
handler.config = config;

it("does what I want", async () => {
  await testApiHandler({
    handler,
    //requestPatcher: (req) => (req.headers = { key: process.env.SPECIAL_TOKEN }),
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST", body: "data" });
      await expect(res.json()).resolves.toStrictEqual({ name: "John Doe" }); // ◄ Passes!
    },
  });
});
