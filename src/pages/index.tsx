import { useState } from "react";
import viteLogo from "/vite.svg";
import "./index.css";
import { DatePicker } from "antd";
import { useGet } from "../hooks";

interface get {
  Hello: string;
}

function Homepage() {
  const [count, setCount] = useState(0);

  const { data, refetch } = useGet<get>("");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <DatePicker />
      <p>{data?.Hello}</p>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            refetch();
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Homepage;
