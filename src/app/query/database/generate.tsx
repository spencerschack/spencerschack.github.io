import sqlite from "sql.js/dist/sql-asm";
import { faker } from "@faker-js/faker";

export default async function generate() {
  faker.seed(42);
  const { Database } = await sqlite();
  const database = new Database();
  database.run(
    `
    CREATE TABLE users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name,
      last_name,
      email,
      join_date
    );
    CREATE TABLE products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name,
      price
    );
    CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id,
      product_id,
      quantity,
      date
    );
    `
  );
  for (let row = 0; row < 100; row++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const joinDate = faker.date.past({ years: 5 }).toDateString().slice(0, 10);
    database.run(
      `INSERT INTO users (first_name, last_name, email, join_date) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, joinDate]
    );
  }
  for (let row = 0; row < 20; row++) {
    const name = faker.commerce.product();
    const price = faker.commerce.price();
    database.run(`INSERT INTO products (name, price) VALUES (?, ?)`, [
      name,
      price,
    ]);
  }
  for (let row = 0; row < 200; row++) {
    const userId = faker.number.int(100);
    const productId = faker.number.int(20);
    const quantity = faker.number.int(5);
    const date = faker.date.past({ years: 5 }).toISOString().slice(0, 10);
    database.run(
      `INSERT INTO orders (user_id, product_id, quantity, date) VALUES (?, ?, ?, ?)`,
      [userId, productId, quantity, date]
    );
  }
  return database;
}
