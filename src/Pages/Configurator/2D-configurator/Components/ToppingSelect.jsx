/* eslint-disable no-unused-vars */
import { createRef, forwardRef, useState, useRef, Fragment } from "react";
import { Accordion, Carousel, CarouselItem } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { Typeahead } from "react-bootstrap-typeahead";
import Slider from "react-slick";
import { useTranslation, } from "react-i18next";
// import layersImg from "../images/glazes/chocLayer.webp";
import layersImg from "../images/glazes/layer-chocolat au lait.png";
import toppingImg from "../images/toppings/icon_waffeln.webp";
import sauceImg from "../images/sauces/layer-chocolat au lait.png";
import fillingImg from "../images/fillings/icon_blueberryFilling.webp";
import { useEffect } from "react";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const ToppingSelect = ({
  Toppings,
  glazeAddition,
  selectedGlaze,
  selectedFilling,
  selectedSauce,
  setFilling,
  setSauce,
  setToppingPrice,
  toppingPrice,
  tempArray,
  setTempArray,
  setArray,
  Typeahead_Glazing_Ref,
  sauces_ref,
  filling_ref,
  trans,
}) => {
  const typeaheadRef = useRef();

  const glazeSlider = useRef(null);
  const ToppingSlider = useRef(null);
  const SauceSlider = useRef(null);
  const FillingSlider = useRef(null);

  const TypeHeadChanged = (selected) => {
    if (selected.length != 0) {
      let index = Toppings.glazes.findIndex(
        (item) => item.name == selected[0].name
      );
      glazeSlider.current.slickGoTo(index);
      glazeAddition(selected);
    }
  };

  const ToppingChanged = (selected) => {
    if (selected.length != 0) {
      selected.map((itm) => {
        let index = Toppings.topping.findIndex((item) => item.name == itm.name);
        ToppingSlider.current.slickGoTo(index);
      });

      if (selected.length <= 3) {
        let sum = 0;
        setTempArray(selected);
        selected.map((item) => {
          return (sum = sum + item.price);
        });
        setToppingPrice(sum);
      }
      if (selected.length > 3) {
        alert("you can add maximum 3 toppings");
        let last = selected[selected.length - 1];
        let selectedList = selected.filter((item) => item != last);
        typeaheadRef.current.state.selected = selectedList;
      }
    }
    if (selected.length == 0) {
      setTempArray([]);
      setToppingPrice(0);
    }
  };

  const SaucesChanged = (selected) => {
    if (selected.length != 0) {
      let index = Toppings.sauces.findIndex(
        (item) => item.name == selected[0].name
      );
      SauceSlider.current.slickGoTo(index);
      setSauce(selected);
    }
  };

  const FillingChanged = (selected) => {
    if (selected.length != 0) {
      let index = Toppings.fillings.findIndex(
        (item) => item.name == selected[0].name
      );
      FillingSlider.current.slickGoTo(index);
      setFilling(selected);
    }
  };

  const fillingRef = useRef();
  const [activeEventKey, setActiveEventKey] = useState("");

  const viewFilling = (eventKey) => {
    if (eventKey === activeEventKey) {
      setActiveEventKey("");
    } else {
      setActiveEventKey(eventKey);
      //Handle Scroll here when opening
      setTimeout(() => {
        fillingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 400);
    }
  };

  const sauceRef = useRef();

  const viewSauce = (eventKey) => {
    if (eventKey === activeEventKey) {
      setActiveEventKey("");
    } else {
      setActiveEventKey(eventKey);
      //Handle Scroll here when opening
      setTimeout(() => {
        sauceRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 400);
    }
  };

  const toppingRef = useRef();

  const viewTopping = (eventKey) => {
    if (eventKey === activeEventKey) {
      setActiveEventKey("");
    } else {
      setActiveEventKey(eventKey);
      //Handle Scroll here when opening
      setTimeout(() => {
        toppingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 400);
    }
  };

  const glazeRef = useRef();

  const viewGlazing = (eventKey) => {
    if (eventKey === activeEventKey) {
      setActiveEventKey("");
    } else {
      setActiveEventKey(eventKey);
      //Handle Scroll here when opening
      setTimeout(() => {
        glazeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 400);
    }
  };

  const glaze_header_ref = useRef();

  useEffect(() => {
    glaze_header_ref.current.scrollIntoView({
      // behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return (
    <div className="topping-select">
      <Accordion defaultselectedKey={"0"}>
        <AccordionItem eventKey="0" className="Accordion_list_items">
          <AccordionHeader
            className="accordion_header"
            onClick={() => viewGlazing("0")}
            ref={glaze_header_ref}
          >
            <div className="titleImg_div col-2">
              <img src={layersImg} className="titlebar_images" alt=""></img>
            </div>
            <div className="title_name_div col-8">
              <span className="col-12 main_title">{trans("Glazes")}</span>
              <span className="col-12 subtitle">
                {selectedGlaze.length > 0 && selectedGlaze[0].name}
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody style={{ padding: "5px" }} ref={glazeRef}>
            <div className="layers_parent_cont">
              {Toppings.glazes.map((item) => {
                return (
                  <div
                    className={
                      selectedGlaze.length > 0 &&
                        selectedGlaze[0].name == item.name
                        ? "card cardstyle selected"
                        : "card cardstyle"
                    }
                    onClick={() => glazeAddition([item])}
                  >
                    <img
                      src={item.logo}
                      className="card-img-top cardImage"
                      alt="..."
                    />
                    <div className="card-body px-2 pt-2 mt-2_ d-flex flex-column align-items-center justify-content-center">
                      <span className="cardbody_font">
                        <span>{item.name}</span>
                      </span>
                      <span className="cardbody_font">
                        <span className="cardbody_font_price">
                          € {item.price}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="1" className="Accordion_list_items">
          <AccordionHeader
            className="accordion_header"
            onClick={() => viewTopping("1")}
          >
            <div className="titleImg_div col-2">
              <img src={toppingImg} className="titlebar_images" alt=""></img>
            </div>
            <div className="title_name_div col-8">
              <span className="col-12 main_title">{trans("Toppings")}</span>
              <span className="col-12 subtitle">
                {tempArray.length > 0 &&
                  tempArray.map((top) => top.name + "," + " ")}
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody style={{ padding: "5px" }} ref={toppingRef}>
            <div className="layers_parent_cont">
              {Toppings.topping.map((item) => {
                return (
                  <div
                    className={
                      tempArray.some((itm) => itm.name == item.name)
                        ? "card cardstyle selected"
                        : "card cardstyle"
                    }
                    onClick={() => setArray(item)}
                  >
                    <img
                      src={item.logo}
                      className="card-img-top cardImage"
                      alt="..."
                    />
                    <div className="card-body p-1 px-2 pt-2 mt-2_ d-flex flex-column align-items-center justify-content-center">
                      <span className="cardbody_font">
                        <span>{item.name}</span>
                      </span>
                      <span className="cardbody_font">
                        <span className="cardbody_font_price">
                          € {item.price}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="2" className="Accordion_list_items">
          <AccordionHeader
            className="accordion_header"
            onClick={() => viewSauce("2")}
          >
            <div className="titleImg_div col-2">
              <img src={sauceImg} className="titlebar_images" alt=""></img>
            </div>
            <div className="title_name_div col-8">
              <span className="col-12 main_title">{trans("Sauces")}</span>
              <span className="col-12 subtitle">
                {selectedSauce.length > 0 && selectedSauce[0].name}
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody style={{ padding: "5px" }} ref={sauceRef}>
            <Fragment></Fragment>
            <div className="layers_parent_cont">
              {Toppings.sauces.map((item) => {
                return (
                  <div
                    className={
                      selectedSauce.length > 0 &&
                        selectedSauce[0].name == item.name &&
                        selectedSauce[0].unselect == undefined
                        ? "card cardstyle selected"
                        : "card cardstyle"
                    }
                    onClick={() => setSauce([item])}
                  >
                    <img
                      src={item.logo}
                      className="card-img-top cardImage"
                      alt="..."
                    />
                    <div className="card-body p-1 px-2 pt-2 mt-2_ d-flex flex-column align-items-center justify-content-center">
                      <span className="cardbody_font">
                        <span>{item.name}</span>
                      </span>
                      <span className="cardbody_font">
                        <span className="cardbody_font_price">
                          € {item.price}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem eventKey="3" className="Accordion_list_items">
          <AccordionHeader
            className="accordion_header"
            onClick={() => viewFilling("3")}
          >
            <div className="titleImg_div col-2">
              <img src={fillingImg} className="titlebar_images" alt=""></img>
            </div>
            <div className="title_name_div col-8">
              <span className="col-12 main_title">{trans("Fillings")}</span>
              <span className="col-12 subtitle">
                {selectedFilling.length > 0 && selectedFilling[0].name}
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody style={{ padding: "5px" }} ref={fillingRef}>
            <div className="layers_parent_cont">
              {Toppings.fillings.map((item) => {
                return (
                  <div
                    className={
                      selectedFilling.length > 0 &&
                        selectedFilling[0].name == item.name &&
                        selectedFilling[0].unselect == undefined
                        ? "card cardstyle selected"
                        : "card cardstyle"
                    }
                    onClick={() => setFilling([item])}
                  >
                    <img
                      src={item.logo}
                      className="card-img-top cardImage"
                      alt="..."
                    />
                    <div className="card-body p-1 px-2 pt-2 mt-2_ d-flex flex-column align-items-center justify-content-center">
                      <span className="cardbody_font">
                        <span>{item.name}</span>
                      </span>
                      <span className="cardbody_font">
                        <span className="cardbody_font_price">
                          € {item.price}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ToppingSelect;
