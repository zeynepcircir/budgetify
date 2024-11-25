const SummaryCard = ({
    title,
    amount,
    negative = false,
    currency = "₺",
  }: {
    title: string;
    amount: number;
    negative?: boolean;
    currency?: string;
  }) => {
    // Hata kontrolü
    const formattedAmount =
      typeof amount === "number" ? amount.toLocaleString("tr-TR") : "0";
  
    return (
      <div
        className={`p-4 rounded-lg shadow-md text-center transition-colors duration-300 ${
          negative
            ? "bg-red-50 dark:bg-red-900"
            : "bg-green-50 dark:bg-green-900"
        }`}
      >
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {title}
        </h3>
        <p
          className={`text-xl font-bold ${
            negative ? "text-red-600" : "text-green-600"
          }`}
        >
          {negative && "-"}
          {currency}
          {formattedAmount}
        </p>
      </div>
    );
  };
  
  export default SummaryCard;
  