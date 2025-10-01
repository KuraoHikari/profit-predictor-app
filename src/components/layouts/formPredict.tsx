import IconDollar from "@/components/atoms/icon/incoDollar";
import IconLocation from "@/components/atoms/icon/iconLocation";
import { Label, Input, Select, Button } from "@/components/ui";

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

const FormPredict = ({ isLoading, handlePredict, administration, marketingSpend, rdSpend, setAdministration, setMarketingSpend, setRdSpend, setState, state }: FormPredictProps) => {
 return (
  <>
   <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Input R&D Spend */}
    <div className="col-span-1">
     <Label htmlFor="rdSpend">Biaya R&D</Label>
     <Input type="number" id="rdSpend" value={rdSpend} onChange={(e) => setRdSpend(e.target.value)} placeholder="e.g., 165349" icon={<IconDollar />} required />
    </div>

    {/* Input Administration */}
    <div className="col-span-1">
     <Label htmlFor="administration">Biaya Administrasi</Label>
     <Input type="number" id="administration" value={administration} onChange={(e) => setAdministration(e.target.value)} placeholder="e.g., 136897" icon={<IconDollar />} required />
    </div>

    {/* Input Marketing Spend */}
    <div className="md:col-span-2">
     <Label htmlFor="marketingSpend">Biaya Pemasaran</Label>
     <Input type="number" id="marketingSpend" value={marketingSpend} onChange={(e) => setMarketingSpend(e.target.value)} placeholder="e.g., 471784" icon={<IconDollar />} required />
    </div>

    {/* Input State */}
    <div className="md:col-span-2">
     <Label htmlFor="state">Lokasi State</Label>
     <Select id="state" value={state} onChange={(e) => setState(e.target.value)} icon={<IconLocation />}>
      <option>California</option>
      <option>Florida</option>
      <option>New York</option>
     </Select>
    </div>

    {/* Tombol Prediksi */}
    <div className="md:col-span-2">
     <Button type="submit" className="w-full" isLoading={isLoading} loadingText="Memprediksi...">
      Prediksi Profit
     </Button>
    </div>
   </form>
  </>
 );
};

export default FormPredict;
