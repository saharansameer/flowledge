import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { DATABASE_URL } from "@/env";

const migrationPool = new Pool({
  connectionString: DATABASE_URL,
  max: 1,
});

async function runMigration() {
  try {
    const db = drizzle({ client: migrationPool });

    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations Completed");
  } catch {
    console.error("Migrations Failed");
    process.exit(1);
  } finally {
    await migrationPool.end();
    console.log("Migration Pool Closed");
  }
}

runMigration();
