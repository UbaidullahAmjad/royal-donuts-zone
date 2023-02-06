/* eslint-disable no-unused-vars */
import React, { useState, Fragment, useEffect, useRef } from "react";
import OrderDetails from "./Components/OrderDetails";
import Pizza from "./Components/Pizza";
import ToppingSelect from "./Components/ToppingSelect";
import { Toppings } from "./Components/ToppingData";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  incrementItemQuantity,
} from "../../../redux/CartPage/myCartAction";
import customerDonut from "../2D-configurator/images/simpleDonut.png";
import { useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import Footer from "../../../Components/Footer/Footer";
import CopyRight from "../../copy-right/CopyRight";
import Header from "../../../Components/Header/Header";
import { ArrowBack, ShoppingBasket } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { toast, ToastContainer } from "react-toastify";

import { DonutComparison } from "./Functions/DonutComparison";

const Pizza_Builder = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedGlaze, setSelectedGlaze] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState([]);
  const [selectedFilling, setSelectedFilling] = useState([]);
  const [basePrice, setBasePrice] = useState(3);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [tempArray, setTempArray] = useState([]);
  const [glazePrice, setGlazePrice] = useState(0);
  const [saucePrice, setSaucePrice] = useState(0);
  const [fillingPrice, setFillingPrice] = useState(0);
  const [toppingPrice, setToppingPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(1);

  const resetConfigurator = () => {
    setSelectedGlaze([]);
    setGlazePrice(0);

    setSelectedSauce([]);
    setSaucePrice(0);

    setSelectedFilling([]);
    setFillingPrice(0);

    setTempArray([]);
    setToppingPrice(0);
  };

  let baseTotal =
    basePrice + glazePrice + toppingPrice + saucePrice + fillingPrice;

  let confirmedOrder = {
    id: new Date().getUTCMilliseconds(),
    glaze: selectedGlaze,
    topping: tempArray,
    sauce: selectedSauce,
    filling: selectedFilling,
    singlePrice: baseTotal,
    total: baseTotal * totalQuantity,
    quantity: totalQuantity,
    donutType: "Customized donut",
    image: customerDonut,
  };

  let splitted = confirmedOrder.total.toString().split(".");

  const Typeahead_Glazing_Ref = useRef();
  const sauces_ref = useRef();
  const filling_ref = useRef();

  const glazeAddition = (data) => {
    if (selectedGlaze.length > 0) {
      if (data[0].name == selectedGlaze[0].name) {
        setSelectedGlaze([]);
        setGlazePrice(0);
      } else {
        // Typeahead_Glazing_Ref.current.state.selected = data;
        setSelectedGlaze(data);
        setGlazePrice(data[0].price);
      }
    } else {
      setSelectedGlaze(data);
      setGlazePrice(data[0].price);
    }
  };

  const setSauce = (data) => {
    if (selectedSauce.length > 0) {
      if (data[0].name == selectedSauce[0].name) {
        setSelectedSauce([]);
        setSaucePrice(0);
      } else {
        // sauces_ref.current.state.selected = data;
        if (data[0].unselect == undefined) {
          setSelectedSauce(data);
          setSaucePrice(data[0].price);
        } else {
          setSelectedSauce([]);
          setSaucePrice(0);
        }
      }
    } else {
      if (data[0].unselect == undefined) {
        setSelectedSauce(data);
        setSaucePrice(data[0].price);
      } else {
        setSelectedSauce([]);
        setSaucePrice(0);
      }
    }
  };

  const setFilling = (data) => {
    if (selectedFilling.length > 0) {
      if (data[0].name == selectedFilling[0].name) {
        setSelectedFilling([]);
        setFillingPrice(0);
      } else {
        if (data[0].unselect == undefined) {
          setSelectedFilling(data);
          setFillingPrice(data[0].price);
        } else {
          setSelectedFilling([]);
          setFillingPrice(0);
        }
      }
    } else {
      if (data[0].unselect == undefined) {
        setSelectedFilling(data);
        setFillingPrice(data[0].price);
      } else {
        setSelectedFilling([]);
        setFillingPrice(0);
      }
    }
  };

  const setArray = (data) => {
    let exist = tempArray.find((item) => item.name == data.name);
    if (tempArray.length < 3) {
      if (!exist) {
        setTempArray([...tempArray, data]);
        let array = tempArray;
        array.push(data);
        tempArray.map((item) => {
          setToppingPrice(toppingPrice + item.price);
        });
      }
      if (exist) {
        setTempArray(tempArray.filter((items) => items.name != exist.name));
        setToppingPrice(toppingPrice - exist.price);
      }
    } else if (tempArray.length >= 3 && exist) {
      setTempArray(tempArray.filter((items) => items.name != exist.name));
      setToppingPrice(toppingPrice - exist.price);
    } else if (tempArray.length >= 3 && !exist) {
      // alert("you can add maximum 3 toppings");
      toast.error(trans("You can add maximum 3 toppings"));
    }
  };

  const goBack = () => {
    navigate("/Dashboard");
  };

  const { cartItems } = useSelector((state) => state.myProductsCart);

  const Msg = () => {
    const handleClick = () => {
      navigate("/cart");
    };
    return (
      <div className="d-flex justify-content-between">
        {trans("Item added to cart")}
        <ShoppingBasket
          style={{ color: "#ff6295", marginRight: "30px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    );
  };

  const placeOrder = () => {
    const get_customized_donut_array = cartItems.filter(
      (item) => item.donutType == "Customized donut"
    );

    if (
      confirmedOrder.glaze.length == 0 &&
      confirmedOrder.topping.length == 0 &&
      confirmedOrder.sauce.length == 0 &&
      confirmedOrder.filling.length == 0
    ) {
      toast.error(trans("Donut_Layer_Required"));
    } else {
      const get_donut_item = DonutComparison(
        get_customized_donut_array,
        confirmedOrder
      );
      if (get_donut_item == null) {
        dispatch(addItemToCart(confirmedOrder));
      } else {
        confirmedOrder["id"] = get_donut_item.id;
        confirmedOrder["incremented_quantity"] = confirmedOrder.quantity;
        confirmedOrder["quantity"] =
          get_donut_item.quantity + confirmedOrder.quantity;
        confirmedOrder["price"] = confirmedOrder.singlePrice;
        dispatch(incrementItemQuantity(confirmedOrder));
      }
      // navigate("/cart");
      toast.success(<Msg></Msg>, {
        position: "top-right",
        autoClose: 10000,
      });
      setSelectedFilling([]);
      setSelectedSauce([]);
      setSelectedGlaze([]);
      setTempArray([]);
      setFillingPrice(0);
      setToppingPrice(0);
      setSaucePrice(0);
      setGlazePrice(0);
      setTotalQuantity(1);
    }
  };

  const clearOrder = () => {
    setSelectedFilling([]);
    setSelectedSauce([]);
    setSelectedGlaze([]);
    setTempArray([]);
    setFillingPrice(0);
    setToppingPrice(0);
    setSaucePrice(0);
    setGlazePrice(0);
  };

  const increaseQty = () => {
    setTotalQuantity(totalQuantity + 1);
  };

  const decreaseQty = () => {
    if (totalQuantity > 1) {
      setTotalQuantity(totalQuantity - 1);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="display_header">
        <Header />
      </div>
      <Fragment>
        <main>
          <div className="main_container">
            <div className=" d-flex col-12 justify-content-around  parent_cont">
              <div className="pizza_main">
                <div className="backBtn_config col-12">
                  <button className="arrow_back_btn">
                    <ArrowBack
                      onClick={() => navigate("/")}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </div>
                <Pizza
                  selectedGlaze={selectedGlaze}
                  selectedSauce={selectedSauce}
                  selectedFilling={selectedFilling}
                  tempArray={tempArray}
                  resetConfigurator={resetConfigurator}
                />
              </div>
              <div className="accordion_list_cont">
                <div className="col-lg-12 col-md-12 col-sm-12 p-0 topping_div">
                  <ToppingSelect
                    Toppings={Toppings}
                    setSelectedGlaze={setSelectedGlaze}
                    glazeAddition={glazeAddition}
                    setSelectedFilling={setSelectedFilling}
                    setSauce={setSauce}
                    setFilling={setFilling}
                    selectedGlaze={selectedGlaze}
                    selectedFilling={selectedFilling}
                    selectedSauce={selectedSauce}
                    toppingPrice={toppingPrice}
                    setToppingPrice={setToppingPrice}
                    tempArray={tempArray}
                    setTempArray={setTempArray}
                    setArray={setArray}
                    Typeahead_Glazing_Ref={Typeahead_Glazing_Ref}
                    sauces_ref={sauces_ref}
                    filling_ref={filling_ref}
                    trans={trans}
                  />
                  <div className="col-12 price_div">
                    {splitted.length > 1 ? (
                      <span>
                        € {splitted[0]}
                        {trans("dot")}
                        {splitted[1]}
                      </span>
                    ) : (
                      <span>€ {splitted[0]}</span>
                    )}
                  </div>
                  <div className="add_to_cart col-12">
                    <div className="col-4 incre_decre_btn">
                      <i
                        className="fa fa-minus"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={decreaseQty}
                      ></i>
                      <span className="cart_quantity">{totalQuantity}</span>
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={increaseQty}
                      ></i>
                    </div>

                    <Button
                      color="primary"
                      className="add_to_cart_btn"
                      onClick={placeOrder}
                    >
                      {trans("Add To Cart")}
                    </Button>
                  </div>

                  <div className="mobile_view_footer col-12">
                    <div className="col-4 m-0 p-0 mobile_price_div">
                      {splitted.length > 1 ? (
                        <span>
                          € {splitted[0]}
                          {trans("dot")}
                          {splitted[1]}
                        </span>
                      ) : (
                        <span>€ {splitted[0]}</span>
                      )}
                    </div>
                    <div className="col-4 mobile_view_incre_decre_btn">
                      <i
                        className="fa fa-minus"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={decreaseQty}
                      ></i>
                      <span className="cart_quantity">{totalQuantity}</span>
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={increaseQty}
                      ></i>
                    </div>
                    <div className="col-4 pe-1">
                      <Button
                        className="mobile_view_add_to_cart_btn"
                        variant="outline-primary"
                        onClick={placeOrder}
                      >
                        {" "}
                        {trans("Add To Cart")}
                      </Button>
                      {/* <button
                    className="mobile_view_add_to_cart_btn"
                    onClick={placeOrder}
                    disabled={
                      confirmedOrder.glaze.length == 0 &&
                      confirmedOrder.topping.length == 0 &&
                      confirmedOrder.sauce.length == 0 &&
                      confirmedOrder.filling.length == 0
                    }
                  >
                    {trans("Add To Cart")}
                  </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
      <div
        className="footer_div"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <CopyRight />
      </div>
    </>
  );
};

export default Pizza_Builder;
