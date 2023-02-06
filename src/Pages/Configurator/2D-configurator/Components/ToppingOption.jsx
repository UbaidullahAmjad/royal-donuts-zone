import ToppingIcon from "./ToppingIcon";

const ToppingOption = ({ topping, toppingIcons }) => {
  return (
    <div className="topping-option">
      <div className="card" style = {{height:'115px', justifyContent:'center' }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToppingOption;
