import simpleDonut from "../images/simpleDonut.png";
import { Button } from "reactstrap";

const Pizza = ({
  selectedGlaze,
  tempArray,
  selectedSauce,
  selectedFilling,
  resetConfigurator,
}) => {
  return (
    <div className="pizza-container">
      <div className="pizza_reset_button_box">
        <Button
          color="primary"
          className="pizza_reset_button"
          onClick={resetConfigurator}
        >
          Reset Configurator
        </Button>
      </div>
      <img className="donut" src={simpleDonut} alt="alt" />
      {selectedGlaze.length > 0 && (
        <img className="layers" src={selectedGlaze[0].image} alt="alt" />
      )}
      {selectedSauce.length > 0 && selectedSauce[0].unselect == undefined && (
        <img className="topp" src={selectedSauce[0].image} alt="alt" />
      )}
      {tempArray.length > 0 &&
        tempArray.map((item, i) => {
          if (i == 0) {
            return <img className="topp" src={item.image1} alt="alt" />;
          }
          if (i == 1) {
            return <img className="topp" src={item.image2} alt="alt" />;
          }
          if (i == 2) {
            return <img className="topp" src={item.image3} alt="alt" />;
          }
        })}

      {selectedFilling.length > 0 &&
        selectedFilling[0].unselect == undefined && (
          <img className="sauce" src={selectedFilling[0].image} alt="alt" />
        )}

    </div>
  );
};

export default Pizza;
