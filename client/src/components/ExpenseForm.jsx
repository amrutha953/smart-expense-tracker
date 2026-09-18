function ExpenseForm({
  expense,
  handleChange,
  handleSubmit,
  editingId,
  handleCancelEdit,
}) {
  return (
    <section className="expense-section">

      <h2>
        {editingId !== null
          ? "Edit Expense"
          : "Add Expense"}
      </h2>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={expense.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
        />

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
        >

          <option value="">
            Select Category
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId !== null
            ? "Update Expense"
            : "Add Expense"}
        </button>

        {editingId !== null && (

          <button
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>

        )}

      </form>

    </section>
  );
}

export default ExpenseForm;