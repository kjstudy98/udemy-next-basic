"use client";

import React, { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState<number>(0);

  console.log("Client");
  return (
    <div>
      ClientComponent
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
