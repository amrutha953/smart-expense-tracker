function BillSplitter({
  bill,
  setBill,
  friends,
  setFriends,
  handleSplitBill,
  splitResult,
  currency,
}) {
  return (
    <section className="expense-section">

      <h2>Split a Bill</h2>

      <form
        className="expense-form"
        onSubmit={handleSplitBill}
      >

        <input
          type="text"
          placeholder="Bill title"
          value={bill.title}
          onChange={(e) =>
            setBill({
              ...bill,
              title: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Total bill amount"
          value={bill.amount}
          onChange={(e) =>
            setBill({
              ...bill,
              amount: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Paid by"
          value={bill.paidBy}
          onChange={(e) =>
            setBill({
              ...bill,
              paidBy: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Friends (comma separated)"
          value={friends}
          onChange={(e) =>
            setFriends(e.target.value)
          }
        />

        <button type="submit">
          Split Bill
        </button>

      </form>

      {/* Split Result */}
      {splitResult && (

        <div className="split-result">

          <h3>
            {splitResult.title}
          </h3>

          <p>
            Total Bill: {currency}
            {splitResult.amount}
          </p>

          <p>
            Paid by: {splitResult.paidBy}
          </p>

          <p>
            Each person's share:
            <strong>
              {" "}
              {currency}
              {splitResult.amountPerPerson.toFixed(2)}
            </strong>
          </p>

          <h4>Friends' Shares</h4>

          {splitResult.friends.map((friend, index) => (

            <div
              key={index}
              className="expense-item"
            >

              <span>
                {friend}
              </span>

              <strong>
                {currency}
                {splitResult.amountPerPerson.toFixed(2)}
              </strong>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default BillSplitter;