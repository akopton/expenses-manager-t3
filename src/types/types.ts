import { Prisma } from "@prisma/client";

export type BillWithProducts = Prisma.BillGetPayload<{
  include: { items: true };
}>;
