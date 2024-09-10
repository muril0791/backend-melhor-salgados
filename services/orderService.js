const Order = require("../models/order");

exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  await order.save();
  return order;
};

exports.getOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  order.status = status;
  await order.save();
  return order;
};
