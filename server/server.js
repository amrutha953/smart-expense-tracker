const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Smart Expense Tracker API is running",
  });
});


// Test database connection
app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 AS result", (err, results) => {
    if (err) {
      console.error(
        "Database query failed:",
        err.message
      );

      return res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
    }

    res.json({
      message: "MySQL database connected successfully",
      result: results[0].result,
    });
  });
});


// Expense routes
app.use(
  "/api/expenses",
  expenseRoutes
);


// Budget routes
app.use(
  "/api/budgets",
  budgetRoutes
);


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});