import { test, expect } from "@jest/globals";
import { appRouter, type AppRouter } from "../../root";
import { prisma } from "../../../db";
import { inferProcedureInput } from "@trpc/server";
import { session } from "./mockSession";
import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { data } from "cypress/types/jquery";

test("bills router add/delete test", async () => {
  const prismaMock = mockDeep<PrismaClient>();
  const caller = appRouter.createCaller({
    session: session,
    prisma: prismaMock,
  });

  type Input = inferProcedureInput<AppRouter["bills"]["addBill"]>;
  const input: Input = {
    name: "test",
    value: 0,
    added_at: new Date(),
    updated_at: new Date(),
    paymentDate: new Date(),
    isPaid: true,
    items: [],
    category: "test",
  };
  prismaMock.bill.create.mock;

  const result = await caller.bills.addBill(input);
  console.log(result);
  expect(result).toHaveProperty("name");

  // await caller.bills.deleteOneById({ id: result.id });
});
