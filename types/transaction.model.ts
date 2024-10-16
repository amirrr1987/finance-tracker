import type { z } from "zod";
import type { transactionSchema } from "~/schema/transaction.schema";

export type Transaction = z.input<typeof transactionSchema>;
