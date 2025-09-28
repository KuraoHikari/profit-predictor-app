"use client";

import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// Komponen Ikon untuk memperjelas input
const IconDollar = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
 </svg>
);

const IconLocation = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
);

export default function Home() {
 // State untuk menyimpan model dan input dari pengguna
 const [model, setModel] = useState<tf.Sequential | null>(null);
 const [rdSpend, setRdSpend] = useState("165349");
 const [administration, setAdministration] = useState("136897");
 const [marketingSpend, setMarketingSpend] = useState("471784");
 const [state, setState] = useState("California");
 const [predictedProfit, setPredictedProfit] = useState<number | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [predictionRange, setPredictionRange] = useState<{ lower: number; upper: number } | null>(null);

 // Fungsi untuk membuat dan menginisialisasi model regresi linier
 const createAndSetModel = async () => {
  const linearModel = tf.sequential();
  linearModel.add(tf.layers.dense({ units: 1, inputShape: [6] }));

  // Bobot (weights) dan bias ini adalah contoh.
  // Dalam aplikasi nyata, nilai-nilai ini didapatkan dari proses training model
  // dengan dataset historis (misalnya 50_Startups.csv).
  // Urutan input: Florida, New York, California, R&D Spend, Administration, Marketing Spend
  const weightsData = [[86.63836917604276], [-872.6457908770802], [786.007421704322], [0.7734671927327668], [0.0328845975362313], [0.03661002586397899]];
  const biasData = [42467.52924853278];

  const weights = tf.tensor2d(weightsData, [6, 1]);
  const bias = tf.tensor1d(biasData);
  // const weights = tf.tensor2d([[252.33], [798.15], [-959.34], [0.805], [ -0.026], [0.027]], [6, 1]);
  // const bias = tf.tensor1d([50122.19]);

  linearModel.setWeights([weights, bias]);
  setModel(linearModel);
 };

 // useEffect untuk membuat model saat komponen pertama kali dirender
 useEffect(() => {
  createAndSetModel();
 }, []);

 // Fungsi untuk menangani proses prediksi
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
  const inputData = [...stateVector, parseFloat(rdSpend) || 0, parseFloat(administration) || 0, parseFloat(marketingSpend) || 0];

  // 3. Membuat tensor dari data input
  const inputTensor = tf.tensor2d([inputData], [1, 6]);

  // 4. Melakukan prediksi dengan model
  const prediction = model.predict(inputTensor);
  const profit = Array.isArray(prediction) ? prediction[0].dataSync()[0] : prediction.dataSync()[0];
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

 // Fungsi untuk format angka sebagai mata uang
 const formatCurrency = (value: number | null) => {
  if (value === null) return "";
  return new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   minimumFractionDigits: 2,
  }).format(value);
 };

 return (
  <>
   <main className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
     {/* Header */}
     <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">Prediktor Profit Startup</h1>
      <p className="text-gray-500 mt-2">Masukkan data pengeluaran untuk memprediksi potensi profit.</p>
     </div>

     <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Input R&D Spend */}
      <div className="col-span-1">
       <label htmlFor="rdSpend" className="block text-sm font-medium text-gray-700 mb-1">
        Biaya R&D
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <IconDollar />
        </div>
        <input
         type="number"
         id="rdSpend"
         value={rdSpend}
         onChange={(e) => setRdSpend(e.target.value)}
         className="text-gray-600 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
         placeholder="e.g., 165349"
         required
        />
       </div>
      </div>

      {/* Input Administration */}
      <div className="col-span-1">
       <label htmlFor="administration" className="block text-sm font-medium text-gray-700 mb-1">
        Biaya Administrasi
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <IconDollar />
        </div>
        <input
         type="number"
         id="administration"
         value={administration}
         onChange={(e) => setAdministration(e.target.value)}
         className="text-gray-600 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
         placeholder="e.g., 136897"
         required
        />
       </div>
      </div>

      {/* Input Marketing Spend */}
      <div className="md:col-span-2">
       <label htmlFor="marketingSpend" className="block text-sm font-medium text-gray-700 mb-1">
        Biaya Pemasaran
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <IconDollar />
        </div>
        <input
         type="number"
         id="marketingSpend"
         value={marketingSpend}
         onChange={(e) => setMarketingSpend(e.target.value)}
         className="text-gray-600 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
         placeholder="e.g., 471784"
         required
        />
       </div>
      </div>

      {/* Input State */}
      <div className="md:col-span-2">
       <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
        Lokasi State
       </label>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <IconLocation />
        </div>
        <select
         id="state"
         value={state}
         onChange={(e) => setState(e.target.value)}
         className="text-gray-600 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none"
        >
         <option>California</option>
         <option>Florida</option>
         <option>New York</option>
        </select>
       </div>
      </div>

      {/* Tombol Prediksi */}
      <div className="md:col-span-2">
       <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
        disabled={isLoading}
       >
        {isLoading ? "Memprediksi..." : "Prediksi Profit"}
       </button>
      </div>
     </form>

     {/* Hasil Prediksi */}
     {(predictedProfit !== null || isLoading) && (
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
     )}
    </div>
   </main>
  </>
 );
}
