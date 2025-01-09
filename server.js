const express = require("express");
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Import employees API
const employeesAPI = require("./api/employees");

// Use the employees router
app.use("/employees", employeesAPI);

// Home route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found." });
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
