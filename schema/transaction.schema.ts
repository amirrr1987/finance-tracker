import { z } from "zod";

export const schema = z.object({
  amount: z.number().positive("Amount needs to be more than 0"),
  type: z.string(),
  description: z.string(),
  category: z.string(),
  id: z.number(),
  // user_id: z.string(),
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
    request: schema.shape.id,
    response: schema,
  },
  updateOneById: {
    request: schema,
    response: schema,
  },
  deleteOneById: {
    request: schema.shape.id,
  },
};
