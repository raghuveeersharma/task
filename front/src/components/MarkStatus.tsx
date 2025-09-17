import React from "react";
type MarkStatusProps = {
  age: number | null;
};
const MarkStatus: React.FC<MarkStatusProps> = ({ age }) => {
  if (age === null) return "N/A";
  return age > 18 ? (age > 60 ? "old" : "adult") : "teen";
};

export default React.memo(MarkStatus);
