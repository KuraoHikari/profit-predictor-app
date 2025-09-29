import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import UsePredictForm from "./usePredictionForm";
import UsePredictionModel from "./usePredictionModel";

const UsePredict = () => {
  const [predictedProfit, setPredictedProfit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionRange, setPredictionRange] = useState<{
    lower: number;
    upper: number;
  } | null>(null);

  const { state, rdSpend, administration, marketingSpend } = UsePredictForm();
  const { model } = UsePredictionModel();

  const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!model) {
      alert("Model is not loaded yet.");
      return;
    }

    setIsLoading(true);
    setPredictedProfit(null);
    setPredictionRange(null);

    // Simulasi loading agar terlihat lebih interaktif
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 1. Menyiapkan input state (one-hot encoding)
    let stateVector = [0, 0, 0]; // [Florida, New York, California]
    if (state === "Florida") {
      stateVector = [1, 0, 0];
    } else if (state === "New York") {
      stateVector = [0, 1, 0];
    } else if (state === "California") {
      stateVector = [0, 0, 1];
    }

    // 2. Menggabungkan semua input menjadi satu array
    const inputData = [
      ...stateVector,
      parseFloat(rdSpend) || 0,
      parseFloat(administration) || 0,
      parseFloat(marketingSpend) || 0,
    ];

    // 3. Membuat tensor dari data input
    const inputTensor = tf.tensor2d([inputData], [1, 6]);

    // 4. Melakukan prediksi dengan model
    const prediction = model.predict(inputTensor);
    const profit = Array.isArray(prediction)
      ? prediction[0].dataSync()[0]
      : prediction.dataSync()[0];
    // Menghitung rentang prediksi berdasarkan nilai RMSE yang diberikan
    const marginOfError = profit * 0.06; // Menggunakan nilai RMSE
    setPredictionRange({
      lower: profit - marginOfError,
      upper: profit + marginOfError,
    });

    // 5. Menyimpan hasil prediksi ke state
    setPredictedProfit(profit);
    setIsLoading(false);
  };
  return { isLoading, predictedProfit, predictionRange, handlePredict };
};

export default UsePredict;
