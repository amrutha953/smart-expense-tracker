import SummaryCard from "./SummaryCard";

function SummaryCards({
  totalExpenses,
  monthlyExpenses,
  yearlyExpenses,
  budget,
  remainingBudget,
  currency,
}) {
  return (
    <section className="summary">

      <SummaryCard
        title="Total Expenses"
        value={totalExpenses}
        currency={currency}
      />

      <SummaryCard
        title="This Month"
        value={monthlyExpenses}
        currency={currency}
      />

      <SummaryCard
        title="This Year"
        value={yearlyExpenses}
        currency={currency}
      />

      <SummaryCard
        title="Budget"
        value={budget}
        currency={currency}
      />

      <SummaryCard
        title="Remaining"
        value={remainingBudget}
        currency={currency}
      />

    </section>
  );
}

export default SummaryCards;