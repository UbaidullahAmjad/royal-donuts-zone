/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import { connect, useDispatch } from "react-redux";

import * as actions from "../../../../redux/ProductReceipe/action";
import TypeAhead from "../../../TypeAhead/TypeAhead";

import { translate } from "react-switch-lang";

import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import axios from "axios";
import { URL } from "../../../../env";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { TypeAheadToggleButton } from "../../../CustomComponents";

let extra_ingredient_count = 0;

const receipe = (props) => {
  const trans = props.t;
  const { all_products, all_ingredients } = props;

  const [SelectedProduct, setSelectedProduct] = useState(null);
  const [SelectedIngredients, setSelectedIngredients] = useState([]);
  const [ExtraIngredientToggle, setExtraIngredientToggle] = useState(false);
  const [ExtraIngredientArray, setExtraIngredientArray] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/supplier/recipe/list/RD`);
  };

  useEffect(() => {
    if (all_products == undefined || all_products.length == 0) {
      props.DispatchProducts();
    }
    if (all_ingredients == undefined || all_ingredients.length == 0) {
      props.DispatchIngredients();
    }
    if (SelectedProduct == null || SelectedProduct.length == 0) {
      props.DispatchRemoveAddedIngredients();
    }
  }, []);

  const ChooseProduct = (product) => {
    setValue("product", product);
    console.log("PRODUCT -0-----------------", product);
    setSelectedProduct(product);
    if (product.length == 0) {
      RefIngredientOptions.current.clear();
      setSelectedIngredients([]);
    }
  };

  const RefIngredientOptions = useRef();

  const ChooseIngredients = (ingredient) => {
    setSelectedIngredients(ingredient);
  };

  const AddIngredientsSection = () => {
    props.DispatchAddIngredients(SelectedIngredients);
    // setSelectedIngredients([]);
    RefIngredientOptions.current.clear();
  };

  const DeleteIngredient = (deleted_ingredient) => {
    props.DispatchDeleteIngredient(deleted_ingredient);
  };

  const AddExtraIngredients = () => {
    setExtraIngredientToggle(true);
    extra_ingredient_count = extra_ingredient_count + 1;
    setExtraIngredientArray((prevState) => [
      ...prevState,
      { id: extra_ingredient_count },
    ]);
  };

  const AppendExtraIngredient = () => {
    extra_ingredient_count = extra_ingredient_count + 1;
    console.log(" extra_ingredient_count ------ ", extra_ingredient_count);
    setExtraIngredientArray((prevState) => [
      ...prevState,
      { id: extra_ingredient_count },
    ]);
    // );
  };

  const DeleteExtraIngredient = (array_item, array_index) => {
    console.log(
      "array_index ---------- ",
      array_index,
      " --------------- ",
      array_item,
      " ------ EXTRA ----",
      ExtraIngredientArray
    );
    setExtraIngredientArray(
      ExtraIngredientArray.filter((item, index) => item.id != array_item.id)
    );
    if (
      ExtraIngredientArray.filter((item, index) => item.id != array_item.id)
        .length == 0
    ) {
      setExtraIngredientToggle(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    console.log("FORM DATA SUBMIT --------------- ", data);
    const extra_ingredient_name_array = [];
    const extra_ingredient_quantity_array = [];
    const extra_ingredient_unit_array = [];
    for (var i = 0; i < ExtraIngredientArray.length; i++) {
      extra_ingredient_name_array.push(
        data[
          SelectedProduct[0].id +
            "-extra_ingredient_name-" +
            ExtraIngredientArray[i]["id"]
        ]
      );
      extra_ingredient_quantity_array.push(
        data[
          SelectedProduct[0].id +
            "-extra_ingredient_quantity-" +
            ExtraIngredientArray[i]["id"]
        ]
      );
      extra_ingredient_unit_array.push(
        data[
          SelectedProduct[0].id +
            "-extra_ingredient_unit-" +
            ExtraIngredientArray[i]["id"]
        ]
      );
    }
    const product_ingredients_ids = [];
    const product_ingredients_quantity = [];
    for (var i = 0; i < SelectedIngredients.length; i++) {
      product_ingredients_ids.push(SelectedIngredients[i]["id"]);
      product_ingredients_quantity.push(
        data[SelectedIngredients[i]["id"] + "-ingredient_quantity"]
      );
 
    }

    console.log('ingreients array', SelectedIngredients)
    console.log('products ingredients ids', product_ingredients_ids)
    console.log(
      "product_ingredients_quantity -----------",
      product_ingredients_quantity
    );
    console.log(
      "extra_ingredient_name_array -----------",
      extra_ingredient_name_array
    );

    const formData = new FormData();
    formData.append("product_id", SelectedProduct[0]["id"]);
    formData.append(
      "product_ingredients",
      JSON.stringify(product_ingredients_ids)
    );
    formData.append(
      "product_ingredients_qty",
      JSON.stringify(product_ingredients_quantity)
    );
    formData.append(
      "extra_product_ingredients_name",
      JSON.stringify(extra_ingredient_name_array)
    );
    formData.append(
      "extra_product_ingredients_qty",
      JSON.stringify(extra_ingredient_quantity_array)
    );
    formData.append(
      "extra_product_ingredients_unit",
      JSON.stringify(extra_ingredient_unit_array)
    );

    axios({
      method: "POST",
      url: URL + "/recipe",
      data: formData,
    })
      .then((response) => {
        // console.log("RESPONSE -------------- ", response);
        toast.success(
          `${trans("Recipe")} ${trans("created")} ${trans("successfully")}`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      })
      .catch((error) => {
        console.log("RECIPE CREATION ERROR ------- ", error);
      });
  };

  console.log("INGREDIENTs 00000 -----------", props.all_ingredients);
  // console.log("props.added_ingredients ----- ", props.added_ingredients);

  console.log("EXTRA INGREDIENTS --------------", ExtraIngredientArray);

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Supplier")} title={trans("Create Recipe")} /> */}

      {/* <Container fluid={true}> */}
        {/* <Row>
          <Col sm="12">
            <Card> */}
            <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("Create Recipe")}</h5>
                </CardHeader>
              {/* <CardBody> */}
                <div>
                  <Row>
                    <Col md="6">
                      <Label htmlFor="validationCustom02">
                        {trans("Select Product")}
                      </Label>
                      <Controller
                        control={control}
                        name="product"
                        rules={{ required: true }}
                        render={() => (
                          <TypeAhead
                            className="typehead_form_control"
                            Key={all_products != null ? all_products : []}
                            Placeholder={trans("Choose Product")}
                            LabelKey={"name_fr"}
                            OptionList={
                              all_products != null ? all_products : []
                            }
                            ChangeOption={(product) => ChooseProduct(product)}
                            ClearButton={true}
                            MultipleOptions={false}
                          >
                            {({ isMenuShown, toggleMenu }) => (
                              <TypeAheadToggleButton
                                isOpen={isMenuShown}
                                onClick={(e) => toggleMenu()}
                              />
                            )}
                            dfrsr
                          </TypeAhead>
                        )}
                      ></Controller>
                      <span>
                        {errors.product && trans("field is required")}
                      </span>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Label className="ml-3" htmlFor="validationCustom02">
                          {trans("Select Ingredients")}
                        </Label>
                        <Col md="9">
                          <Controller
                            control={control}
                            name="ingredients"
                            rules={{ required: false }}
                            render={() => (
                              <TypeAhead
                                className="typehead_form_control"
                                Ref={RefIngredientOptions}
                                Key={
                                  all_ingredients != null ? all_ingredients : []
                                }
                                Placeholder={trans("Choose Ingredients")}
                                LabelKey={"name"}
                                OptionList={
                                  all_ingredients != null ? all_ingredients : []
                                }
                                ChangeOption={(ingredient) =>
                                  ChooseIngredients(ingredient)
                                }
                                ClearButton={true}
                                MultipleOptions={true}
                                Disabled={
                                  SelectedProduct == null ||
                                  SelectedProduct.length == 0
                                }
                              >
                                {({ isMenuShown, toggleMenu }) => (
                                  <TypeAheadToggleButton
                                    isOpen={isMenuShown}
                                    onClick={(e) => toggleMenu()}
                                  />
                                )}
                              </TypeAhead>
                            )}
                          ></Controller>
                          <span>
                            {errors.ingredients && trans("field is required")}
                          </span>
                        </Col>
                        <Col md="2">
                          <Button
                            color="success"
                            onClick={AddIngredientsSection}
                          >
                            {trans("Add")}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <br />
                  <div>
                    <Form
                      className="needs-validation"
                      noValidate=""
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {props.added_ingredients?.length > 0 &&
                        props.added_ingredients.map((item, index) => (
                          <Row>
                            <Col md="6" className="mb-3">
                              <InputGroup>
                                <InputGroupText>{item.name}</InputGroupText>
                                <Input
                                  name={`${item.id}-ingredient_quantity`}
                                  type={"text"}
                                  placeholder={"Quantity"}
                                  className="form-control"
                                  innerRef={register({
                                    required: true,
                                  })}
                                />
                                <InputGroupText>
                                  {item.unit.name}
                                </InputGroupText>
                              </InputGroup>
                              <span className="text-danger">
                                {errors[`${item.id}-ingredient_quantity`] &&
                                  trans("field is required")}
                              </span>
                            </Col>
                            <Col md="1">
                              <Button
                                color="danger"
                                outline
                                onClick={() => DeleteIngredient(item)}
                              >
                                <i className="fa fa-trash"></i>
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      <br></br>
                      {ExtraIngredientToggle == true && (
                        <Label>{trans("Extra Ingredients")}</Label>
                      )}
                      {SelectedProduct != null &&
                        SelectedProduct.length > 0 &&
                        ExtraIngredientArray.map((item, index) => (
                          <div key={item.id}>
                            <Row>
                              <Col md="3" className="mb-3">
                                <Input
                                  type="text"
                                  name={`${SelectedProduct[0].id}-extra_ingredient_name-${item.id}`}
                                  placeholder={trans("Extra ingredient name")}
                                  className="form-control"
                                  innerRef={register({
                                    required: true,
                                  })}
                                />
                                <span className="text-danger">
                                  {errors[
                                    `${SelectedProduct[0].id}-extra_ingredient_name-${item.id}`
                                  ] && trans("field is required")}
                                </span>
                              </Col>
                              <Col md="3">
                                <Input
                                  type="number"
                                  step={"any"}
                                  name={`${SelectedProduct[0].id}-extra_ingredient_quantity-${item.id}`}
                                  placeholder={trans(
                                    "Extra ingredient quantity"
                                  )}
                                  className="form-control"
                                  innerRef={register({
                                    required: true,
                                  })}
                                />
                                <span className="text-danger">
                                  {errors[
                                    `${SelectedProduct[0].id}-extra_ingredient_quantity-${item.id}`
                                  ] && trans("field is required")}
                                </span>
                              </Col>
                              <Col md="3">
                                <Input
                                  type="text"
                                  name={`${SelectedProduct[0].id}-extra_ingredient_unit-${item.id}`}
                                  placeholder={trans(
                                    "Extra ingredient unit name"
                                  )}
                                  className="form-control"
                                  innerRef={register({
                                    required: true,
                                  })}
                                />
                                <span className="text-danger">
                                  {errors[
                                    `${SelectedProduct[0].id}-extra_ingredient_unit-${item.id}`
                                  ] && trans("field is required")}
                                </span>
                              </Col>

                              <Col md="2 d-flex mb-3 justify-content-center align-items-center">
                                {ExtraIngredientArray.at(-1) == item && (
                                  <Button
                                    color="success"
                                    outline
                                    onClick={AppendExtraIngredient}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </Button>
                                )}

                                <Button
                                  className="ml-3"
                                  color="danger"
                                  outline
                                  onClick={() =>
                                    DeleteExtraIngredient(item, index)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        ))}

                      <br></br>
                      <div>
                        {SelectedProduct != null &&
                          SelectedProduct.length > 0 &&
                          ExtraIngredientToggle == false && (
                            <Button
                              color="info"
                              outline
                              onClick={AddExtraIngredients}
                            >
                              <i className="fa fa-plus mr-2"></i>
                              {trans("Add Extra")}
                            </Button>
                          )}
                        <Button
                          color="success"
                          type="submit"
                          className={`${
                            ExtraIngredientToggle == false &&
                            SelectedProduct != null &&
                            SelectedProduct.length > 0 &&
                            "ml-3"
                          }`}
                        >
                          {trans("Save")}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

const MapStateToProps = (state) => {
  return {
    all_products: state.recipe.products,
    all_ingredients: state.recipe.ingredients,
    added_ingredients: state.recipe.added_ingredients,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    DispatchProducts: () => dispatch(actions.GetProducts()),
    DispatchIngredients: () => dispatch(actions.GetIngredients()),
    DispatchAddIngredients: (SelectedIngredients) =>
      dispatch(actions.AddIngredients(SelectedIngredients)),
    DispatchDeleteIngredient: (deleted_ingredient) =>
      dispatch(actions.DeleteIngredient(deleted_ingredient)),
    DispatchRemoveAddedIngredients: () =>
      dispatch(actions.RemoveAllAddedIngredients()),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(translate(receipe));
// export default receipe;
