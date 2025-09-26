import postgress from "postgres";

export const sql = postgress(process.env.DATABASE_URL);
