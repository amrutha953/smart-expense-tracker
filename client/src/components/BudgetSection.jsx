function BudgetSection({
  budget,
  budgetInput,
  setBudgetInput,
  handleBudgetSubmit,
  totalExpenses,
  budgetPercentage,
  currency,
}) {
  return (
    <section className="expense-section">

      <h2>Set Monthly Budget</h2>

      <form
        className="expense-form"
        onSubmit={handleBudgetSubmit}
      >

        <input
          type="number"
          placeholder="Enter monthly budget"
          value={budgetInput}
          onChange={(e) =>
            setBudgetInput(e.target.value)
          }
        />

        <button type="submit">
          Set Budget
        </button>

      </form>

      <div className="budget-progress">

        <div className="category-header">

          <strong>
            Budget Used
          </strong>

          <span>
            {budgetPercentage.toFixed(1)}%
          </span>

        </div>

        <div className="progress-background">

          <div
            className="progress-bar"
            style={{
              width: `${Math.min(budgetPercentage, 100)}%`,
            }}
          ></div>

        </div>

        <p>
          {currency}{totalExpenses} spent out of{" "}
          {currency}{budget}
        </p>

      </div>

    </section>
  );
}

export default BudgetSection;