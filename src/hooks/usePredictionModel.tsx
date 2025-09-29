import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const UsePredictionModel = () => {
  const [model, setModel] = useState<tf.Sequential | null>(null);
  useEffect(() => {
    const createAndSetModel = async () => {
      const linearModel = tf.sequential();
      linearModel.add(tf.layers.dense({ units: 1, inputShape: [6] }));

      // Bobot (weights) dan bias ini adalah contoh.
      // Dalam aplikasi nyata, nilai-nilai ini didapatkan dari proses training model
      // dengan dataset historis (misalnya 50_Startups.csv).
      // Urutan input: Florida, New York, California, R&D Spend, Administration, Marketing Spend
      const weightsData = [
        [86.63836917604276],
        [-872.6457908770802],
        [786.007421704322],
        [0.7734671927327668],
        [0.0328845975362313],
        [0.03661002586397899],
      ];
      const biasData = [42467.52924853278];

      const weights = tf.tensor2d(weightsData, [6, 1]);
      const bias = tf.tensor1d(biasData);
      // const weights = tf.tensor2d([[252.33], [798.15], [-959.34], [0.805], [ -0.026], [0.027]], [6, 1]);
      // const bias = tf.tensor1d([50122.19]);

      linearModel.setWeights([weights, bias]);
      setModel(linearModel);
    };

    createAndSetModel();
  }, []);

  return { model };
};

export default UsePredictionModel;
