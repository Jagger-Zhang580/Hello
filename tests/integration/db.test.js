const { Client } = require("pg");

describe("Database Integration", () => {
  let client;

  beforeAll(async () => {
    const baseUrl = process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace(/\/[^/]+$/, "/postgres")
      : "postgresql://postgres:postgres@localhost:5432/postgres";

    const setupClient = new Client({ connectionString: baseUrl });
    await setupClient.connect();

    try {
      await setupClient.query("CREATE DATABASE test_db");
    } catch (err) {
      // Database may already exist
    }
    await setupClient.end();

    client = new Client({
      connectionString:
        process.env.DATABASE_URL ||
        "postgresql://postgres:postgres@localhost:5432/test_db",
    });
    await client.connect();

    await client.query(
      "CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name TEXT NOT NULL)"
    );
  });

  afterAll(async () => {
    if (client) {
      await client.query("DROP TABLE IF EXISTS items");
      await client.end();
    }
  });

  beforeEach(async () => {
    await client.query("DELETE FROM items");
  });

  test("inserts and retrieves a record", async () => {
    await client.query("INSERT INTO items (name) VALUES ($1)", ["test-item"]);
    const result = await client.query(
      "SELECT * FROM items WHERE name = $1",
      ["test-item"]
    );
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].name).toBe("test-item");
  });

  test("handles multiple inserts", async () => {
    await client.query("INSERT INTO items (name) VALUES ($1)", ["item-1"]);
    await client.query("INSERT INTO items (name) VALUES ($1)", ["item-2"]);
    const result = await client.query(
      "SELECT * FROM items ORDER BY name"
    );
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0].name).toBe("item-1");
    expect(result.rows[1].name).toBe("item-2");
  });

  test("deletes a record", async () => {
    await client.query("INSERT INTO items (name) VALUES ($1)", ["to-delete"]);
    await client.query("DELETE FROM items WHERE name = $1", ["to-delete"]);
    const result = await client.query(
      "SELECT * FROM items WHERE name = $1",
      ["to-delete"]
    );
    expect(result.rows).toHaveLength(0);
  });
});
