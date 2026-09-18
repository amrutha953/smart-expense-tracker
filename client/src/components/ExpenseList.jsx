function ExpenseList({
  expenses,
  currency,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="expense-section">

      <h2>Recent Expenses</h2>

      {expenses.length === 0 ? (

        <p className="empty-message">
          No expenses added yet.
        </p>

      ) : (

        expenses.map((item) => (

          <div
            key={item.id}
            className="expense-item"
          >

            <div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.category}
              </p>

              <small>
                {item.date}
              </small>

              {item.description && (
                <p>
                  {item.description}
                </p>
              )}

            </div>

            <div>

              <strong>
                {currency}{item.amount}
              </strong>

              <button
                type="button"
                onClick={() =>
                  handleEdit(item)
                }
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))
      )}

    </section>
  );
}

export default ExpenseList;