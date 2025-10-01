# Profit Predictor App

A **Next.js web application** that predicts business profit using a **linear regression model** built with TensorFlow.js. Users can input operational parameters to receive an instant profit prediction.

## 🚀 Try Our App

You can try the live application here:

- ➡️ Live Demo Link: [Prediktor Profit Startup](https://profit-predictor-app.vercel.app/)

## 📋 Description

Profit Predictor App implements a client-side machine learning model to forecast business profitability. By inputting key financial data and business location, users can obtain a projected profit value with a confidence range, aiding in rapid financial decision-making and planning.

## 📁 Directory Structure

Here is the main directory structure of this project:

```
/
├── app/                    # Main directory for pages and layouts (Next.js App Router)
├── components/             # Reusable React UI components
├── hooks/                  # Custom hooks for application logic
│   ├── UsePredict.ts
│   └── UsePredictionModel.ts
├── public/                 # Static assets to be served (images, icons, etc.)
├── src/
│   └── dataset/
│       └── 50_Startups.csv # The dataset used for model training
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.mjs         # Configuration file for Next.js
```

## 🚀 Requirement & Instalasi

### Prerequisites

- **Node.js** (Version 22 or higher recommended)
- **npm** (Typically bundled with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KuraoHikari/profit-predictor-app.git
   cd profit-predictor-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🧠 How It Works

The core of this application is a **Linear Regression model** implemented using TensorFlow.js. This model does not perform training in the browser; instead, it loads existing weights and biases to make predictions.

This logic is split into two custom hooks: `UsePredictionModel` and `UsePredict`.

### 1. Model Initialization (`UsePredictionModel.ts`)

This hook is responsible for creating and configuring the TensorFlow.js model.

- A **sequential model** (`tf.sequential`) is created.
- A **dense layer** is added, which is the implementation of the linear regression equation.
  - `inputShape: [6]`: Indicates that the model accepts 6 features as input.
  - `units: 1`: Indicates that the model will produce 1 value as output (the profit prediction).
- The model's **weights and biases** are set manually using `.setWeights()`. These values are the result of training the model on the `50_Startups.csv` dataset.

### The Linear Regression Model

The linear regression formula used is:
$$ \text{Profit} = (\sum\_{i=1}^{6} w_i \cdot x_i) + b $$

Where:

- \( x_i \) is the value of the 6 input features.
- \( w_i \) is the weight for each feature.
- \( b \) is the bias.

The input features and their corresponding weights are as follows:

```javascript
// Input order: Florida, New York, California, R&D Spend, Administration, Marketing Spend
const weightsData = [[86.63], [-872.64], [786.01], [0.77], [0.03], [0.04]];
const biasData = [42467.52];
```

### 2. Making a Prediction (`UsePredict.ts`)

This hook handles the prediction process when a user submits the form.

1. **Input Processing**: The user's form input (state and spends) is processed into a feature array. The `state` is converted into a **one-hot encoded vector**.
2. **Tensor Creation**: The input array is converted into a TensorFlow.js tensor.
3. **Prediction Execution**: The tensor is fed into the model using `model.predict()`.
4. **Result Calculation**: The predicted value is extracted, and a confidence range is calculated (e.g., ±6%).

### 3. The Linear Regression Model

The core of the application is a single-layer, feedforward neural network (a linear regression model) defined in `UsePredictionModel`. The model has an input shape of `[6]`, corresponding to the six features derived from the user's input.

- **Model Architecture**: A `tf.sequential` model with one `dense` layer containing a single neuron (`units: 1`).
- **Weights and Bias**: The model's knowledge comes from its **weights** and **bias**. These coefficients were determined during a previous training process on a dataset like `50_Startups.csv` and represent the relationship between each input feature and the final profit.

### 4. Model Coefficients Interpretation

The model's prediction is calculated as a weighted sum of inputs plus a bias: `Profit = (Bias) + (Feature1 * Weight1) + (Feature2 * Weight2) + ...`

The weights and bias used in the application are:

```javascript
const weightsData = [[86.63], [-872.64], [786.01], [0.77], [0.03], [0.04]];
const biasData = [42467.52];
```

| Feature                | Weight    | Interpretation                                                                            |
| :--------------------- | :-------- | :---------------------------------------------------------------------------------------- |
| **Bias (Base Profit)** | 42,467.52 | The starting point for the prediction before considering any input features.              |
| **Florida**            | 86.63     | A business in Florida adds a small, positive amount to the profit.                        |
| **New York**           | -872.64   | A business in New York has a significant negative impact on the predicted profit.         |
| **California**         | 786.01    | A business in California has a strong positive impact on the predicted profit.            |
| **R&D Spend**          | 0.77      | **Most influential positive factor.** Every dollar spent on R&D returns ~$0.77 in profit. |
| **Administration**     | 0.03      | Administration spending has a very minor, near-neutral effect on profit.                  |
| **Marketing Spend**    | 0.04      | Marketing spending has a small positive effect on profit.                                 |

### 5. The Prediction Process (`UsePredict` Hook)

1. **Input Processing**: The user's form input (state and spends) is processed into a feature array.

   - The `state` is converted into a **one-hot encoded vector** (e.g., `[1, 0, 0]` for Florida).
   - The spending values (`rdSpend`, `administration`, `marketingSpend`) are combined with the state vector to form a final input array of length 6.

2. **Tensor Creation**: This input array is converted into a 2D TensorFlow.js tensor with the shape `[1, 6]`.

3. **Prediction Execution**: The tensor is fed into the model using `model.predict()`. The model performs a matrix multiplication of the input features by the pre-defined weights and adds the bias to compute the final profit value.

4. **Result and Confidence Range**: The predicted value is extracted from the output tensor. A confidence range is calculated as **±6%** of the predicted value to provide a margin of error for the estimate.

## 📊 Dataset

The model was trained on the "50 Startups" dataset, which is included in this repository at `src/dataset/50_Startups.csv`. This dataset contains data from 50 startups across three states and tracks their spending and resulting profit.

The columns in the dataset are:

- **R&D Spend**: The amount spent on Research and Development.
- **Administration**: The amount spent on administrative tasks.
- **Marketing Spend**: The amount spent on marketing.
- **State**: The location of the startup (New York, California, Florida).
- **Profit**: The total profit (this is the target variable to be predicted).

For a detailed look at the data exploration, preprocessing, and model training process, please refer to the Google Colab notebook: [Model Training on Google Colab](https://colab.research.google.com/drive/1F8JOmqcFh9-5tWJ-1u1x9X7Z7Q0Q9Q9Q?usp=sharing)

## 📦 Packages Used

### Dependencies

| Package               | Version   | Description                                                                                                |
| :-------------------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `next`                | `15.5.4`  | The React Framework for Production, with features like Server-Side Rendering.                              |
| `react` & `react-dom` | `19.1.0`  | A JavaScript library for building user interfaces.                                                         |
| `@tensorflow/tfjs`    | `^4.22.0` | An open-source hardware-accelerated JavaScript library for training and deploying machine learning models. |

### DevDependencies

| Package                               | Description                                             |
| :------------------------------------ | :------------------------------------------------------ |
| `typescript`                          | A superset of JavaScript that adds static types.        |
| `@tailwindcss/postcss`, `tailwindcss` | A utility-first CSS framework for rapid UI development. |
| `eslint`, `eslint-config-next`        | A linter to analyze and maintain code quality.          |

## 🙏 Acknowledgement

- The machine learning concepts and TensorFlow.js API usage were inspired by the **Google Codelabs tutorial** on training regression models with TensorFlow.js.
- This project is built upon the **Next.js** framework, which provides a robust foundation for modern web development.

## 👨‍💻 Author

**Kurao Hikari**

- GitHub: [KuraoHikari](https://github.com/KuraoHikari)
- GitHub: [DekAdi](https://github.com/dekadi136)
