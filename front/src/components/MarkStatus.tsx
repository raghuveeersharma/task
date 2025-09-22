import React from "react";
type MarkStatusProps = {
  age: number | null;
};
const MarkStatus: React.FC<MarkStatusProps> = ({ age }) => {
  if (age === null) return "N/A";
  return age > 18 ? (
    age > 60 ? (
      <div className="text-red-500">old</div>
    ) : (
      <div className="text-yellow-400">adult</div>
    )
  ) : (
    <div className="text-green-500">teen</div>
  );
};

export default React.memo(MarkStatus);
