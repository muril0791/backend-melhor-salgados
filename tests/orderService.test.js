const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("../routes/orderRoutes");
const { orders } = require("../models/order");

const app = express();
app.use(bodyParser.json());
app.use("/api/orders", orderRoutes);

describe("Order Service", () => {
  beforeEach(() => {
    orders.length = 0; // Limpar pedidos antes de cada teste
  });

  test("should create an order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({ items: ["item1", "item2"] })
      .set("Authorization", "Bearer valid_token");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.items).toEqual(["item1", "item2"]);
  });

  test("should update order status", async () => {
    const orderId = "some-order-id";
    orders.push({ id: orderId, items: ["item1", "item2"], status: "pending" });

    const response = await request(app)
      .put("/api/orders/status")
      .send({ orderId, status: "accepted" })
      .set("Authorization", "Bearer valid_token");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("accepted");
  });

  test("should get order status", async () => {
    const orderId = "some-order-id";
    orders.push({ id: orderId, items: ["item1", "item2"], status: "pending" });

    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Authorization", "Bearer valid_token");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("pending");
  });
});
