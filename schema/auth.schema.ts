import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});
export const authSchema = {
  content: schema,
  login: {
    request: schema.shape.email,
  },
  save: {
    request: schema
  }
};
