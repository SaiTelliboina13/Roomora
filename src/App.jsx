
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Studio from "./Studio";
import LandingPage from "./LandingPage";

function App() {
  const [showStudio, setShowStudio] = useState(false);

  if (showStudio) {
    return (
      <>
        <Studio />
        <button
          className="back-to-home"
          onClick={() => setShowStudio(false)}
        >
          <ArrowLeft size={16} />
          Back to Roomora
        </button>
      </>
    );
  }

  return <LandingPage onStart={() => setShowStudio(true)} />;
}

export default App;
