import { z } from "zod";

export const schema = z.object({
  amount: z.number().positive("Amount needs to be more than 0"),
  type: z.string(),
  description: z.string(),
  category: z.string(),
  id: z.number(),
  createdAt: z.string(),
});

export const transactionSchema = {
  content: schema,
  createOne: {
    request: schema.omit({ id: true }),
  },
  getAll: {
    response: z.array(schema),
  },
  getOneById: {
    request: schema.pick({ id: true }),
    response: schema,
  },
  updateOneById: {
    request: schema,
    response: schema,
  },
  deleteOneById: {
    request: schema.pick({ id: true }),
  },
};
