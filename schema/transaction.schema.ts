import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number(),
  type: z.string(),
  description: z.string(),
  category: z.string(),
});

export type TransactionDto = z.input<typeof transactionSchema>;
