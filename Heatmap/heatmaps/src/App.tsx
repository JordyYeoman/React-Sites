import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BarGraph from "./BarGraph";
import HeatMapV1 from "./Heatmap_v1";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <div>TIP TOP HeatMap</div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
          <BarGraph />
        </a>
      </div>
      <HeatMapV1 width={800} height={800} />
    </div>
  );
}

export default App;
