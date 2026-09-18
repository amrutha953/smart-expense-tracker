function SummaryCard({ title, value, currency }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>
        {currency}
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;