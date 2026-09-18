const express = require("express");
const db = require("../db");

const router = express.Router();


// ==========================================
// GET ALL EXPENSES
// GET /api/expenses
// ==========================================
router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM expenses
    ORDER BY date DESC, id DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error("Error fetching expenses:", err.message);

      return res.status(500).json({
        message: "Failed to fetch expenses",
        error: err.message,
      });
    }

    res.json(results);
  });
});


// ==========================================
// POST NEW EXPENSE
// POST /api/expenses
// ==========================================
router.post("/", (req, res) => {

  const {
    title,
    amount,
    category,
    date,
    description,
    currency,
  } = req.body;


  // Validate required fields
  if (!title || !amount || !category || !date) {

    return res.status(400).json({
      message: "Please provide title, amount, category and date",
    });

  }


  const sql = `
    INSERT INTO expenses
    (title, amount, category, date, description, currency)
    VALUES (?, ?, ?, ?, ?, ?)
  `;


  const values = [
    title,
    amount,
    category,
    date,
    description || null,
    currency || "INR",
  ];


  db.query(sql, values, (err, result) => {

    if (err) {

      console.error("Error adding expense:", err.message);

      return res.status(500).json({
        message: "Failed to add expense",
        error: err.message,
      });

    }


    res.status(201).json({
      message: "Expense added successfully",
      expenseId: result.insertId,
    });

  });

});


// ==========================================
// PUT / UPDATE EXPENSE
// PUT /api/expenses/:id
// ==========================================
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    title,
    amount,
    category,
    date,
    description,
    currency,
  } = req.body;


  // Validate required fields
  if (!title || !amount || !category || !date) {

    return res.status(400).json({
      message: "Please provide title, amount, category and date",
    });

  }


  const sql = `
    UPDATE expenses
    SET
      title = ?,
      amount = ?,
      category = ?,
      date = ?,
      description = ?,
      currency = ?
    WHERE id = ?
  `;


  const values = [
    title,
    amount,
    category,
    date,
    description || null,
    currency || "INR",
    id,
  ];


  db.query(sql, values, (err, result) => {

    if (err) {

      console.error("Error updating expense:", err.message);

      return res.status(500).json({
        message: "Failed to update expense",
        error: err.message,
      });

    }


    // Check whether expense exists
    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Expense not found",
      });

    }


    res.json({
      message: "Expense updated successfully",
    });

  });

});
// PUT / UPDATE EXPENSE
router.put("/:id", (req, res) => {
  // your existing PUT code
});


// DELETE EXPENSE
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM expenses
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error("Error deleting expense:", err.message);

      return res.status(500).json({
        message: "Failed to delete expense",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
    });

  });

});
// ==========================================
// SEARCH / FILTER EXPENSES
// GET /api/expenses/filter
// ==========================================
router.get("/filter", (req, res) => {

  const { category, search, date } = req.query;

  let sql = `
    SELECT *
    FROM expenses
    WHERE 1 = 1
  `;

  const values = [];

  if (category) {
    sql += ` AND category = ?`;
    values.push(category);
  }

  if (search) {
    sql += ` AND title LIKE ?`;
    values.push(`%${search}%`);
  }

  if (date) {
    sql += ` AND date = ?`;
    values.push(date);
  }

  sql += ` ORDER BY date DESC, id DESC`;

  db.query(sql, values, (err, results) => {

    if (err) {
      console.error("Error filtering expenses:", err.message);

      return res.status(500).json({
        message: "Failed to filter expenses",
        error: err.message
      });
    }

    res.json(results);

  });

});

module.exports = router;