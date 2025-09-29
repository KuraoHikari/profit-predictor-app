"use client";

import UsePredictForm from "@/hooks/usePredictionForm";
import UsePredict from "@/hooks/usePredict";
import PredictionResult from "@/components/molecules/predictionResult";
import FormPredict from "@/components/layouts/formPredict";
import Header from "@/components/molecules/header";

export default function Home() {
  const { isLoading, handlePredict, predictedProfit, predictionRange } =
    UsePredict();

  const {
    administration,
    marketingSpend,
    rdSpend,
    setAdministration,
    setMarketingSpend,
    setRdSpend,
    setState,
    state,
  } = UsePredictForm();

  return (
    <>
      <main className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <Header />

          <FormPredict
            administration={administration}
            handlePredict={handlePredict}
            isLoading={isLoading}
            marketingSpend={marketingSpend}
            rdSpend={rdSpend}
            setAdministration={setAdministration}
            setMarketingSpend={setMarketingSpend}
            setRdSpend={setRdSpend}
            setState={setState}
            state={state}
          />

          {/* Hasil Prediksi */}
          {(predictedProfit !== null || isLoading) && (
            <PredictionResult
              isLoading={isLoading}
              predictedProfit={predictedProfit}
              predictionRange={predictionRange}
            />
          )}
        </div>
      </main>
    </>
  );
}
