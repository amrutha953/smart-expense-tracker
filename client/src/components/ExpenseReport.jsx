function ExpenseReport({
  monthlyExpenses,
  yearlyExpenses,
  totalExpenses,
  currency,
}) {
  return (
    <section className="expense-section">

      <h2>Expense Report</h2>

      <div className="summary">

        <div className="card">
          <h3>Monthly Spending</h3>
          <p>
            {currency}{monthlyExpenses}
          </p>
        </div>

        <div className="card">
          <h3>Yearly Spending</h3>
          <p>
            {currency}{yearlyExpenses}
          </p>
        </div>

        <div className="card">
          <h3>Total Spending</h3>
          <p>
            {currency}{totalExpenses}
          </p>
        </div>

      </div>

    </section>
  );
}

export default ExpenseReport;