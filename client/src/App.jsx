import { useEffect, useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import BudgetSection from "./components/BudgetSection";
import ExpenseReport from "./components/ExpenseReport";
import ExpenseAnalytics from "./components/ExpenseAnalytics";
import BillSplitter from "./components/BillSplitter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import PdfReportButton from "./components/PdfReportButton";

function App() {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);

  const [currency, setCurrency] = useState("₹");

  // Bill splitting
  const [bill, setBill] = useState({
    title: "",
    amount: "",
    paidBy: "",
  });

  const [friends, setFriends] = useState("");

  const [splitResult, setSplitResult] = useState(null);

  const [editingId, setEditingId] = useState(null);

  // Budget
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");

    return savedBudget ? Number(savedBudget) : 10000;
  });

  const [budgetInput, setBudgetInput] = useState("");

  // Fetch expenses from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        return response.json();
      })
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  // Save budget to localStorage
  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  // Handle expense input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setExpense({
      ...expense,
      [name]: value,
    });
  }

  // Add or update expense
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !expense.title ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingId !== null) {
        // Update expense in backend
        const response = await fetch(
          `http://localhost:5000/api/expenses/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...expense,
              currency:
                currency === "₹"
                  ? "INR"
                  : currency === "$"
                  ? "USD"
                  : currency === "€"
                  ? "EUR"
                  : "GBP",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update expense");
        }

        // Update frontend state
        setExpenses(
          expenses.map((item) =>
            item.id === editingId
              ? {
                  ...expense,
                  id: editingId,
                  currency:
                    currency === "₹"
                      ? "INR"
                      : currency === "$"
                      ? "USD"
                      : currency === "€"
                      ? "EUR"
                      : "GBP",
                }
              : item
          )
        );

        setEditingId(null);
      } else {
        // Add expense to backend
        const response = await fetch(
          "http://localhost:5000/api/expenses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...expense,
              currency:
                currency === "₹"
                  ? "INR"
                  : currency === "$"
                  ? "USD"
                  : currency === "€"
                  ? "EUR"
                  : "GBP",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add expense");
        }

        const data = await response.json();

        // Add the new expense to frontend state
        setExpenses([
          ...expenses,
          {
            ...expense,
            id: data.expenseId,
            currency:
              currency === "₹"
                ? "INR"
                : currency === "$"
                ? "USD"
                : currency === "€"
                ? "EUR"
                : "GBP",
          },
        ]);
      }

      // Clear form
      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.error("Expense operation failed:", error);
      alert("Something went wrong. Please check the backend server.");
    }
  }

  // Delete expense
  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses(
        expenses.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete expense.");
    }
  }

  // Edit expense
  function handleEdit(item) {
    setExpense({
      title: item.title,
      amount: item.amount,
      category: item.category,
      date: item.date
        ? item.date.substring(0, 10)
        : "",
      description: item.description || "",
    });

    setEditingId(item.id);
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingId(null);

    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    });
  }

  // Set budget
  function handleBudgetSubmit(e) {
    e.preventDefault();

    if (!budgetInput || Number(budgetInput) <= 0) {
      alert("Please enter a valid budget");
      return;
    }

    setBudget(Number(budgetInput));
    setBudgetInput("");
  }

  // Split bill between friends
  function handleSplitBill(e) {
    e.preventDefault();

    const friendList = friends
      .split(",")
      .map((friend) => friend.trim())
      .filter((friend) => friend !== "");

    if (
      !bill.title ||
      !bill.amount ||
      !bill.paidBy ||
      friendList.length === 0
    ) {
      alert("Please fill all bill splitting details");
      return;
    }

    const totalPeople = friendList.length + 1;

    const amountPerPerson =
      Number(bill.amount) / totalPeople;

    setSplitResult({
      title: bill.title,
      amount: Number(bill.amount),
      paidBy: bill.paidBy,
      friends: friendList,
      amountPerPerson: amountPerPerson,
    });
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  // Current date
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate this month's expenses
  const monthlyExpenses = expenses.reduce(
    (total, item) => {
      const expenseDate = new Date(item.date);

      if (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        return total + Number(item.amount);
      }

      return total;
    },
    0
  );

  // Calculate this year's expenses
  const yearlyExpenses = expenses.reduce(
    (total, item) => {
      const expenseDate = new Date(item.date);

      if (expenseDate.getFullYear() === currentYear) {
        return total + Number(item.amount);
      }

      return total;
    },
    0
  );

  // Calculate category-wise expenses
  const categoryTotals = expenses.reduce(
    (totals, item) => {
      if (!totals[item.category]) {
        totals[item.category] = 0;
      }

      totals[item.category] += Number(item.amount);

      return totals;
    },
    {}
  );

  const maxCategoryAmount =
    Math.max(...Object.values(categoryTotals), 0);

  // Calculate remaining budget
  const remainingBudget = budget - totalExpenses;

  const budgetPercentage =
    budget > 0
      ? (totalExpenses / budget) * 100
      : 0;

  return (
    <div className="app">

      {/* Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
      />

      <main className="container">

        {/* Summary Cards */}
        <SummaryCards
          totalExpenses={totalExpenses}
          monthlyExpenses={monthlyExpenses}
          yearlyExpenses={yearlyExpenses}
          budget={budget}
          remainingBudget={remainingBudget}
          currency={currency}
        />

        {/* Budget Section */}
        <BudgetSection
          budget={budget}
          budgetInput={budgetInput}
          setBudgetInput={setBudgetInput}
          handleBudgetSubmit={handleBudgetSubmit}
          totalExpenses={totalExpenses}
          remainingBudget={remainingBudget}
          budgetPercentage={budgetPercentage}
          currency={currency}
        />

        {/* Expense Report */}
        <ExpenseReport
          monthlyExpenses={monthlyExpenses}
          yearlyExpenses={yearlyExpenses}
          totalExpenses={totalExpenses}
          currency={currency}
        />

        {/* PDF Report */}
        <PdfReportButton
          expenses={expenses}
          totalExpenses={totalExpenses}
          monthlyExpenses={monthlyExpenses}
          yearlyExpenses={yearlyExpenses}
          budget={budget}
          remainingBudget={remainingBudget}
          currency={currency}
        />

        {/* Expense Analytics */}
        <ExpenseAnalytics
          categoryTotals={categoryTotals}
          maxCategoryAmount={maxCategoryAmount}
          totalExpenses={totalExpenses}
          currency={currency}
        />

        {/* Bill Splitting */}
        <BillSplitter
          bill={bill}
          setBill={setBill}
          friends={friends}
          setFriends={setFriends}
          handleSplitBill={handleSplitBill}
          splitResult={splitResult}
          currency={currency}
        />

        {/* Add / Edit Expense */}
        <ExpenseForm
          expense={expense}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          handleCancelEdit={handleCancelEdit}
        />

        {/* Recent Expenses */}
        <ExpenseList
          expenses={expenses}
          currency={currency}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </main>

    </div>
  );
}

export default App;