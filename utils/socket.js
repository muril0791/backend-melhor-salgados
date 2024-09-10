const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("joinOrderRoom", (orderId) => {
      socket.join(orderId);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { initializeSocket };
