import useFormatCurrency from "@/hooks/useFormatCurrency";

type PredictionResultProps = {
 isLoading: boolean;
 predictedProfit: number | null;
 predictionRange: {
  lower: number;
  upper: number;
 } | null;
};

const PredictionResult = ({ isLoading, predictedProfit, predictionRange }: PredictionResultProps) => {
 const { formatCurrency } = useFormatCurrency();
 return (
  <>
   <div className="text-center bg-gray-50 rounded-lg p-6 mt-8 border border-gray-200">
    <h2 className="text-lg font-medium text-gray-600">Hasil Prediksi Profit</h2>
    {isLoading ? (
     <div className="animate-pulse h-12 w-48 bg-gray-300 rounded-md mx-auto mt-2"></div>
    ) : (
     <>
      <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mt-2">{formatCurrency(predictedProfit)}</p>
      {predictionRange && (
       <div className="mt-4">
        <p className="text-sm text-gray-500">Perkiraan Rentang Profit (6.96%)</p>
        <p className="text-md font-semibold text-gray-800">
         {formatCurrency(predictionRange.lower)} - {formatCurrency(predictionRange.upper)}
        </p>
       </div>
      )}
     </>
    )}
   </div>
   ;
  </>
 );
};

export default PredictionResult;
