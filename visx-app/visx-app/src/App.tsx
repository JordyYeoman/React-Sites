import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BarGraphExample from "./utils/BarGraph";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button />
      </div>
      <div>
        <BarGraphExample width={5000} height={400} />
      </div>
    </div>
  );
}

const Button = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
};

export default App;
