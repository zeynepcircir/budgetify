import React from "react";
import jsPDF from "jspdf";

interface FinancialReportProps {
  expenses: { date: string; description: string; amount: number; type: string }[];
  totalIncome: number;
  totalExpense: number;
}

const FinancialReportComponent: React.FC<FinancialReportProps> = ({
  expenses,
  totalIncome,
  totalExpense,
}) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Finansal Rapor", 10, 10);
    doc.text(`Toplam Gelir: ${totalIncome} TL`, 10, 20);
    doc.text(`Toplam Gider: ${totalExpense} TL`, 10, 30);
    doc.text("Gelir ve Giderler:", 10, 40);

    expenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. ${expense.date} - ${expense.description} - ${expense.amount} TL (${expense.type})`,
        10,
        50 + index * 10
      );
    });

    doc.save("finansal-rapor.pdf");
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={downloadPDF}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
       Finansal Raporları PDF Formatında İndir
      </button>
    </div>
  );
};

export default FinancialReportComponent;
