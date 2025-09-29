const useFormatCurrency = () => {
  const formatCurrency = (value: number | null) => {
    if (value === null) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };
  return { formatCurrency };
};

export default useFormatCurrency;
