import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
});
export const authSchema = {
  content: schema,
  login: {
    request: schema.shape.email
  }
}