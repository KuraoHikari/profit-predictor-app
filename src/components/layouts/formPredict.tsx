import IconDollar from "@/components/atoms/icon/incoDollar";
import IconLocation from "@/components/atoms/icon/iconLocation";

type FormPredictProps = {
  isLoading: boolean;
  handlePredict: (e: React.FormEvent<HTMLFormElement>) => void;
  administration: string;
  marketingSpend: string;
  rdSpend: string;
  setAdministration: (value: string) => void;
  setMarketingSpend: (value: string) => void;
  setRdSpend: (value: string) => void;
  setState: (value: string) => void;
  state: string;
};

const FormPredict = ({
  isLoading,
  handlePredict,
  administration,
  marketingSpend,
  rdSpend,
  setAdministration,
  setMarketingSpend,
  setRdSpend,
  setState,
  state,
}: FormPredictProps) => {
  return (
    <>
      <form
        onSubmit={handlePredict}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Input R&D Spend */}
        <div className="col-span-1">
          <label
            htmlFor="rdSpend"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="administration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="marketingSpend"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
    </>
  );
};

export default FormPredict;
