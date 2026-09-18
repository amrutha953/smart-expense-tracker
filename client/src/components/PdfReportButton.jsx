import jsPDF from "jspdf";

function PdfReportButton({
  expenses,
  totalExpenses,
  monthlyExpenses,
  yearlyExpenses,
  budget,
  remainingBudget,
  currency,
}) {
  function generatePDF() {
    const doc = new jsPDF();

    // PDF-safe currency
    const pdfCurrency =
      currency === "₹"
        ? "INR "
        : currency;

    // Title
    doc.setFontSize(20);
    doc.text("Smart Expense Tracker", 20, 20);

    doc.setFontSize(14);
    doc.text("Expense Report", 20, 32);

    // Summary
    doc.setFontSize(11);

    doc.text(
      `Total Expenses: ${pdfCurrency}${totalExpenses.toFixed(2)}`,
      20,
      48
    );

    doc.text(
      `Monthly Expenses: ${pdfCurrency}${monthlyExpenses.toFixed(2)}`,
      20,
      58
    );

    doc.text(
      `Yearly Expenses: ${pdfCurrency}${yearlyExpenses.toFixed(2)}`,
      20,
      68
    );

    doc.text(
      `Budget: ${pdfCurrency}${budget.toFixed(2)}`,
      20,
      78
    );

    doc.text(
      `Remaining Budget: ${pdfCurrency}${remainingBudget.toFixed(2)}`,
      20,
      88
    );

    // Expense details
    doc.setFontSize(14);
    doc.text("Expense Details", 20, 105);

    let y = 118;

    expenses.forEach((item, index) => {
      // Create a new page when the current page is full
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);

      doc.text(
        `${index + 1}. ${item.title}`,
        20,
        y
      );

      doc.text(
        `Category: ${item.category}`,
        25,
        y + 7
      );

      doc.text(
        `Amount: ${pdfCurrency}${Number(item.amount).toFixed(2)}`,
        25,
        y + 14
      );

      doc.text(
        `Date: ${item.date}`,
        25,
        y + 21
      );

      if (item.description) {
        doc.text(
          `Description: ${item.description}`,
          25,
          y + 28
        );

        y += 38;
      } else {
        y += 31;
      }
    });

    // Download PDF
    doc.save("smart-expense-report.pdf");
  }

  return (
    <button
      type="button"
      className="pdf-button"
      onClick={generatePDF}
    >
      Export PDF Report
    </button>
  );
}

export default PdfReportButton;