import { useState } from "react";
const UsePredictForm = () => {
  const [rdSpend, setRdSpend] = useState("165349");
  const [administration, setAdministration] = useState("136897");
  const [marketingSpend, setMarketingSpend] = useState("471784");
  const [state, setState] = useState("California");

  return {
    rdSpend,
    setRdSpend,
    administration,
    setAdministration,
    marketingSpend,
    setMarketingSpend,
    state,
    setState,
  };
};

export default UsePredictForm;
