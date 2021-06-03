import { useState } from "react";

export default function App() {
  const [run, setRun] = useState(false);

  return {
    run,
    setRun,
  };
}