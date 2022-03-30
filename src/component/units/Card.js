const Card = ({ header, ActionFooter, children }) => {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body card-block">{children}</div>
      <div className="card-footer">{ActionFooter}</div>
    </div>
  );
};

export default Card;
