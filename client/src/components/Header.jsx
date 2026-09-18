function Header({ currency, setCurrency }) {
  return (
    <header className="header">
      <h1>Smart Expense Tracker</h1>

      <p>
        Track your expenses and manage your budget
      </p>

      <div className="currency-selector">
        <label>Currency: </label>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="₹">INR (₹)</option>
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
        </select>
      </div>
    </header>
  );
}

export default Header;