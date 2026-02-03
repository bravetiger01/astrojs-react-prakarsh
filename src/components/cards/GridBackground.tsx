import React from "react";

const GridBackground: React.FC = () => {
  return (
    <div
      aria-hidden
      className="home-grid absolute inset-0 -z-10 pointer-events-none"
    >
      <div className="grid-floor" />
    </div>
  );
};

export default GridBackground;
