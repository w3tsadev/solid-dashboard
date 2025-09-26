import { query } from "@solidjs/router";
import { sql } from "./db";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";

export const fetchCardData = query(async () => {
  "use server";
  try {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices;
      `;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    // console.log(data);

    const numberOfInvoices = Number(data[0][0].count ?? "0");
    const numberOfCustomers = Number(data[1][0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);

    throw new Error("Failed to fetch card data.");
  }
}, "cardData");

export const fetchRevenue = query(async () => {
  "use server";
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}, "revenues");

export const fetchLatestInvoices = query(async () => {
  "use server";
  try {
    console.log("Fetching latest invoice data...");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
      `;
    console.log("Datå fetch completed after 4 seconds.");

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest invoices.");
  }
}, "latestInvoices");

const ITEMS_PER_PAGE = 6;

export const fetchFilteredInvoices = query(
  async (query: string, currentPage: number) => {
    "use server";
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));

      const invoices = await sql<InvoicesTable[]>`
        SELECT invoices.id, invoices.amount, invoices.date, invoices.status, customers.name, customers.email,customers.image_url
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE
          customers.name ILIKE ${`%${query}%`} OR
          customers.email ILIKE ${`%${query}%`} OR
          invoices.amount::text ILIKE ${`%${query}%`} OR
          invoices.date::text ILIKE ${`%${query}%`} OR
          invoices.status ILIKE ${`%${query}%`}
        ORDER BY invoices.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

      // console.log("filtered invoices is fetching...");

      return invoices;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch filtered invoices.");
    }
  },
  "filteredIvoices",
);

export const fetchInvoicesPages = query(async (searchTerm: string) => {
  "use server";
  try {
    // await new Promise((resolve) => setTimeout(resolve, 4000));

    const data = await sql`
        SELECT COUNT(*)
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE
        customers.name ILIKE ${`%${searchTerm}%`} OR
        customers.email ILIKE ${`%${searchTerm}%`} OR
        invoices.amount::text ILIKE ${`%${searchTerm}%`} OR
        invoices.date::text ILIKE ${`%${searchTerm}%`} OR
        invoices.status ILIKE ${`%${searchTerm}%`}
      `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}, "totalPages");

export const fetchCustomers = query(async () => {
  "use server";
  try {
    const customers = await sql<CustomerField[]>`
      SELECT id, name FROM customers ORDER BY name ASC
      `;
    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all customers.");
  }
}, "customers");

export const fetchInvoiceById = query(async (id: string) => {
  "use server";
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status FROM invoices
        WHERE invoices.id = ${id}
      `;
    const invoice = data.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch invoice.");
  }
}, "invoiceById");

export const fetchFilteredCustomers = query(async (searchTerm: string) => {
  "use server";
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${searchTerm}%`} OR
				customers.email ILIKE ${`%${searchTerm}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;
    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
    return customers;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch customers.");
  }
}, "filteredCustomers");
