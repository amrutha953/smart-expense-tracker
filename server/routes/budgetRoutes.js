const express = require("express");
const db = require("../db");

const router = express.Router();

// GET current budget
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM budgets
    ORDER BY year DESC, month DESC, id DESC
    LIMIT 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching budget:", err.message);

      return res.status(500).json({
        message: "Failed to fetch budget",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.json(null);
    }

    res.json(results[0]);
  });
});

// POST /api/budgets
router.post("/", (req, res) => {
  const {
    amount,
    month,
    year,
    currency,
  } = req.body;

  if (!amount || !month || !year) {
    return res.status(400).json({
      message: "Please provide amount, month and year",
    });
  }

  const sql = `
    INSERT INTO budgets
    (amount, month, year, currency)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    amount,
    month,
    year,
    currency || "INR",
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding budget:", err.message);

      return res.status(500).json({
        message: "Failed to add budget",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Budget saved successfully",
      budgetId: result.insertId,
    });
  });
});
// ==========================================
// DASHBOARD SUMMARY
// GET /api/budgets/summary
// ==========================================
router.get("/summary", (req, res) => {

  const expenseSql = `
    SELECT
      COALESCE(SUM(amount), 0) AS totalExpenses,
      COUNT(*) AS expenseCount
    FROM expenses
  `;

  const budgetSql = `
    SELECT
      COALESCE(SUM(amount), 0) AS totalBudget
    FROM budgets
  `;

  db.query(expenseSql, (err, expenseResults) => {

    if (err) {
      return res.status(500).json({
        message: "Failed to fetch expense summary",
        error: err.message
      });
    }

    db.query(budgetSql, (err, budgetResults) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to fetch budget summary",
          error: err.message
        });
      }

      const totalExpenses =
        Number(expenseResults[0].totalExpenses);

      const totalBudget =
        Number(budgetResults[0].totalBudget);

      const remainingBudget =
        totalBudget - totalExpenses;

      res.json({
        totalBudget,
        totalExpenses,
        remainingBudget,
        expenseCount: expenseResults[0].expenseCount
      });

    });

  });

});
// ==========================================
// CATEGORY-WISE EXPENSE SUMMARY
// GET /api/budgets/category-summary
// ==========================================
router.get("/category-summary", (req, res) => {

  const sql = `
    SELECT
      category,
      SUM(amount) AS totalAmount
    FROM expenses
    GROUP BY category
    ORDER BY totalAmount DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error(
        "Error fetching category summary:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch category summary",
        error: err.message
      });
    }

    res.json(results);

  });

});

module.exports = router;