import { z } from "zod";

export const schema = z.object({
  amount: z.number().positive("Amount needs to be more than 0"),
  type: z.string(),
  description: z.string(),
  category: z.string(),
  id: z.number(),
  createdAt: z.string(),
});
export const schemaCreateOne = schema.omit({ id: true });
export const schemaUpdateOne = schema;
export const schemaGetOne = schema.pick({ id: true });
export const schemaGetAll = z.array(schema);
export const schemaDeleteById = schema.pick({ id: true });
