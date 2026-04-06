const http = require("http");
const { add, subtract, multiply, divide } = require("./calculator");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const result = {
    message: "Hello, CI/CD!",
    examples: {
      "add(2, 3)": add(2, 3),
      "subtract(10, 4)": subtract(10, 4),
      "multiply(3, 5)": multiply(3, 5),
      "divide(15, 3)": divide(15, 3),
    },
  };

  res.end(JSON.stringify(result, null, 2));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
