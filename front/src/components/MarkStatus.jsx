const MarkStatus = ({ age }) => {
  return age > 18 ? (age > 60 ? "old" : "adult") : "teen";
};

export default MarkStatus;
