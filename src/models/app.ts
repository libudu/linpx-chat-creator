import { useState } from "react";

export default function() {
  const [run, setRun] = useState(false);

  return {
    run,
    setRun,
  };
}