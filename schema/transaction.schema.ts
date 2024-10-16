import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number(),
  type: z.string(),
  description: z.string(),
  category: z.string(),
  id: z.number(),
  createdAt: z.string(),
});
export const transactionSchemaOnCreate = transactionSchema.omit({ id: true, createdAt: true });


