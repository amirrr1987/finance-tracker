import type { ZodSchema, z } from "zod";

type ValidationResult = {
  valid: boolean;
  issues?: z.ZodIssue[];
};

export const useValidator = async <T>(
  schema: ZodSchema<T>,
  value: T
): Promise<ValidationResult> => {
  const result = await schema.safeParseAsync(value);
  if (!result.success) {
    const obj = { valid: false, issues: result.error.issues };
    console.log(obj);
    return obj;
  }
  return { valid: true };
};
