import { z } from "zod";

export const signupSchema = z
  .object({
    // required, trimmed, 2-30 chars; whitespace-only must fail
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First name must be at least 2 characters." })
      .max(30, { message: "First name cannot exceed 30 characters." }),

    // same rules as firstName
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last name must be at least 2 characters." })
      .max(30, { message: "Last name cannot exceed 30 characters." }),

    // required, trimmed, valid format
    // message: "Please enter a valid email address."
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address." }),

    // required, at least 8 chars
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),

    // required; the match check below compares it to password
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  // password === confirmPassword, checked on the whole object
  // attach the error to confirmPassword so it shows under that input
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// form type, inferred from the schema
export type SignupFormData = z.infer<typeof signupSchema>;
