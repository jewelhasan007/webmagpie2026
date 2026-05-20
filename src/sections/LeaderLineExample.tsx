// @ts-ignore
import LeaderLine from "leader-line-new";
import React, { useEffect, useRef } from "react";

export default function GridFlow() {
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item3Ref.current && item4Ref.current) {
      const line = new LeaderLine(
        item3Ref.current,
        item4Ref.current,
        {
          path: "arc",
          color: "red",
          size: 4,
          startSocket: "bottom",
          endSocket: "top",
          endPlug: "arrow"
        }
      );

      return () => line.remove();
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,120px)",
        gap: "20px",
        padding: "100px"
      }}
    >
      <div style={box}>1</div>
      <div style={box}>2</div>

      {/* Row 1 last */}
      <div ref={item3Ref} style={box}>
        3
      </div>

      {/* Row 2 first */}
      <div ref={item4Ref} style={box}>
        4
      </div>

      <div style={box}>5</div>
      <div style={box}>6</div>
    </div>
  );
}

const box = {
  background: "#4CAF50",
  color: "white",
  padding: "30px",
  textAlign: "center" as const,
  fontSize: "20px"
};