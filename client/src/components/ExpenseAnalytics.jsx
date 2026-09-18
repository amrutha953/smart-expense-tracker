function ExpenseAnalytics({
  categoryTotals,
  maxCategoryAmount,
  totalExpenses,
  currency,
}) {
  return (
    <section className="expense-section">

      <h2>Expense Analytics</h2>

      {Object.keys(categoryTotals).length === 0 ? (

        <p className="empty-message">
          Add expenses to view analytics.
        </p>

      ) : (

        Object.entries(categoryTotals).map(
          ([category, amount]) => {

            const percentage =
              maxCategoryAmount > 0
                ? (amount / maxCategoryAmount) * 100
                : 0;

            const totalPercentage =
              totalExpenses > 0
                ? (amount / totalExpenses) * 100
                : 0;

            return (
              <div
                key={category}
                className="category-analytics"
              >

                <div className="category-header">

                  <strong>
                    {category}
                  </strong>

                  <span>
                    {currency}
                    {amount} (
                    {totalPercentage.toFixed(1)}%
                    )
                  </span>

                </div>

                <div className="progress-background">

                  <div
                    className="progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>

                </div>

              </div>
            );
          }
        )

      )}

    </section>
  );
}

export default ExpenseAnalytics;