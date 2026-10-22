import { z } from "zod";
import { budgets, contactForm, projectTypes } from "@/data/contact";

const { validation: v } = contactForm;

/** Schéma partagé : validation en direct côté client et revalidation dans la Server Action (D9). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, v.name).max(100, v.tooLong),
  email: z.string().trim().max(200, v.tooLong).pipe(z.email(v.email)),
  phone: z
    .string()
    .trim()
    .max(30, v.tooLong)
    .regex(/^[+\d\s().-]*$/, v.phone),
  projectType: z.enum(projectTypes, v.projectType),
  budget: z.union([z.enum(budgets), z.literal("")], v.budget),
  message: z.string().trim().min(10, v.message).max(5000, v.tooLong),
});

export type ContactValues = z.input<typeof contactSchema>;
export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactFields: ContactField[] = ["name", "email", "phone", "projectType", "budget", "message"];

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "" as ContactValues["projectType"],
  budget: "",
  message: "",
};

/** Première erreur de chaque champ invalide. */
export function validateContact(values: unknown): ContactErrors {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    errors[field] ??= issue.message;
  }
  return errors;
}

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "error" };
