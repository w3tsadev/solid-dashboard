import { action, redirect } from "@solidjs/router";

import { z } from "zod";
import { sql } from "./db";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1, { message: "Please select a customer." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater then $0." }),
  status: z.enum(["pending", "paid"], {
    message: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

type ActionResponse = {
  fieldErrors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  } | null;
  formError?: string | null;
  success?: boolean;
  message?: string;
};

export const createInvoice = action(async (formData: FormData) => {
  "use server";
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formError: null,
    } satisfies ActionResponse;
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    // throw new Error("Simulated database failure");
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    console.log("inserted new data.");
    return {
      success: true,
      message: "Invoice created successfully",
      fieldErrors: null,
      formError: null,
    } satisfies ActionResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create invoice. Please try again later.", {
      cause: error,
    });
  }

  // throw redirect("/dashboard/invoices");
}, "createInvoice");

export const updateInvoice = action(async (id: string, formData: FormData) => {
  "use server";

  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formError: null,
    } satisfies ActionResponse;
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount=${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    return {
      success: true,
      message: "Invoice updated successfully",
      fieldErrors: null,
      formError: null,
    } satisfies ActionResponse;
  } catch (error) {
    throw new Error("Failed to update invoice. Please try again later.", {
      cause: error,
    });
  }
  // throw redirect("/dashboard/invoices");
}, "updateInvoice");

export const deleteInvoice = action(async (id: string) => {
  "use server";
  try {
    await sql`
    DELETE FROM invoices WHERE id = ${id}`;
    return { success: true, message: "Invoice deleted successfully" };
  } catch (error) {
    console.error("Database Error:", error);
  }
}, "deleteInvoice");
