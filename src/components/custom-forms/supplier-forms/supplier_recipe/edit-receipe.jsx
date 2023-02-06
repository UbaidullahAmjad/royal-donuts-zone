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

import { translate } from "react-switch-lang";

import * as actions from "../../../../redux/ProductReceipe/action";
import TypeAhead from "../../../TypeAhead/TypeAhead";

import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import axios from "axios";
import { URL } from "../../../../env";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { TypeAheadToggleButton } from "../../../CustomComponents";

let extra_ingredient_count = 0;

const receipe = (props) => {
  const trans = props.t;

  const { all_products, all_ingredients } = props;
  let count = 0;
  let count1 = 0;
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
      count = 0;
      count1 = 0;
      props.DispatchIngredients();
    }
    if (SelectedProduct == null || SelectedProduct.length == 0) {
      props.DispatchRemoveAddedIngredients();
    }
  }, []);

  const ChooseProduct = (product) => {
    console.log("PRODUCT -0-----------------", product);
    if (product.length > 0) {
      setSelectedProduct(product);
      setValue("product", product);
    }
    if (product.length == 0) {
      RefIngredientOptions.current.clear();
      setGetSelectedIngredient([]);
      setError("product", { type: "focus" }, { shouldFocus: true });
    }
  };

  const RefIngredientOptions = useRef();

  const [GetSelectedIngredient, setGetSelectedIngredient] = useState([]);

  const ChooseIngredients = (ingredient) => {
    console.log("INGREDIENT ---------", ingredient);
    setGetSelectedIngredient(ingredient);
    const all_selected_ingredients = SelectedIngredients;
    for (var i = 0; i < ingredient.length; i++) {
      if (
        !all_selected_ingredients.some(
          (item) => item.ingredient_id == ingredient[i]["id"]
        )
      ) {
        all_selected_ingredients.push(
          Object.assign(ingredient[i], { ingredient_id: ingredient[i]["id"] })
        );
      }
    }

    console.log("all_selected_ingredients --------", all_selected_ingredients);
    setSelectedIngredients(all_selected_ingredients);
  };

  const AddIngredientsSection = () => {
    props.DispatchAddIngredients(GetSelectedIngredient);
    RefIngredientOptions.current.clear();
    setGetSelectedIngredient([]);
  };

  const DeleteIngredient = (deleted_ingredient) => {
    props.DispatchDeleteIngredient(deleted_ingredient);
  };

  const AddExtraIngredients = () => {
    setExtraIngredientToggle(true);
    if (ExtraIngredientArray.length == 0) {
      extra_ingredient_count = extra_ingredient_count + 1;
    } else {
      extra_ingredient_count = ExtraIngredientArray.at(-1)["id"] + 1;
    }
    // setExtraIngredientArray(
    //   Array.from(
    //     { length: extra_ingredient_count },
    //     (_, i) => new Object({ id: i })
    //   )
    // );
    setExtraIngredientArray((prevState) => [
      ...prevState,
      { id: extra_ingredient_count },
    ]);
  };

  const AppendExtraIngredient = () => {
    extra_ingredient_count = ExtraIngredientArray.at(-1)["id"] + 1;
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
      array_item
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
    setError,
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    console.log("FORM DATA SUBMIT --------------- ", data);
    const extra_ingredient_name_array = [];
    const extra_ingredient_quantity_array = [];
    const extra_ingredient_unit_array = [];
    console.log(
      "ExtraIngredientArray -0-------------------",
      ExtraIngredientArray
    );
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

    console.log("SELECTED INGREDIENTs -----------", SelectedIngredients);

    const product_ingredients_ids = [];
    const product_ingredients_quantity = [];
    if (ExtraIngredientArray != null) {
      for (var i = 0; i < SelectedIngredients.length; i++) {
        product_ingredients_ids.push(SelectedIngredients[i]["ingredient_id"]);
        product_ingredients_quantity.push(
          data[SelectedIngredients[i]["ingredient_id"] + "-ingredient_quantity"]
        );
      }
    }

    console.log("product_ingredients_ids -----------", product_ingredients_ids);
    console.log(
      "product_ingredients_quantity -----------",
      product_ingredients_quantity
    );
    console.log(
      "extra_ingredient_name_array -----------",
      extra_ingredient_name_array
    );
    console.log(
      "extra_ingredient_quantity_array -----------",
      extra_ingredient_quantity_array
    );
    console.log(
      "extra_ingredient_unit_array -----------",
      extra_ingredient_unit_array
    );

    const formData = new FormData();
    formData.append("recipe_id", params.idd);
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

    formData.append("_method", "PATCH");
    axios({
      method: "POST",
      url: URL + "/recipe/" + params.idd,
      data: formData,
    })
      .then((response) => {
        console.log("RESPONSE -------------- ", response);
        toast.success(
          `${trans("Recipe")} ${trans("updated")} ${trans("successfully")}`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      })
      .catch((error) => {
        console.log("RECIPE CREATION ERROR ------- ", error);
        toast.error(trans(error.response.data.message), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const [EditIngredients, setEditIngredients] = useState([]);
  const [ExtraIngredient, setExtraIngredient] = useState([]);

  // let added_ingredients_data = [];
  const [AddedIngredientData, setAddedIngredientData] = useState([]);
  const [ExtraAddedIngredientData, setExtraAddedIngredientData] = useState([]);

  useEffect(() => {
    const GetRecipeandIngredients = async () => {
      axios
        .get(URL + "/recipe/" + params.idd + "/edit")
        .then((response) => {
          console.log("RESPONSE EDIT RECIPE-------------", response);
          // setValue("product", response.data.product);
          setSelectedProduct(response.data.product);
          setEditIngredients(response.data.product_ingredients);
          setExtraAddedIngredientData(response.data.product_extra_ingredients);
          console.log(
            "response.data.product_ingredient ----------",
            response.data.product_ingredients
          );

          if (response.data.product_ingredients.length > 0) {
            for (var i = 0; i < response.data.product_ingredients.length; i++) {
              console.log(
                "PROPS.ALLINGREDIENTs----------",
                props.all_ingredients
              );
              console.log(
                " props.all_ingredients.find -------- ",
                props.without_filter_ingredients.find(
                  (item) =>
                    item.id ==
                    response.data.product_ingredients[i].ingredient_id
                )
              );
              console.log(
                "ingredient_idingredient_id --------",
                response.data.product_ingredients[i].ingredient_id
              );
              console.log(
                "quantityquantity ---------- ",
                response.data.product_ingredients[i].quantity
              );
              if (
                props.without_filter_ingredients.some(
                  (item) =>
                    item.id ==
                    response.data.product_ingredients[i].ingredient_id
                )
              )
                setSelectedIngredients((prevState) => [
                  ...prevState,
                  Object.assign(
                    props.without_filter_ingredients.find(
                      (item) =>
                        item.id ==
                        response.data.product_ingredients[i].ingredient_id
                    ),
                    {
                      ingredient_id:
                        response.data.product_ingredients[i].ingredient_id,
                      quantity: response.data.product_ingredients[i].quantity,
                    }
                  ),
                ]);

              setAddedIngredientData((prevState) => [
                ...prevState,
                props.without_filter_ingredients.find(
                  (item) =>
                    item.id ==
                    response.data.product_ingredients[i].ingredient_id
                ),
              ]);
            }
            console.log(
              "ADDED INGREDIENT DATA -------------------",
              AddedIngredientData
            );
          }
        })
        .catch((error) => {
          console.log("EDIT RECIPE ERROR ------------------ ", error);
        });
    };
    // if (props.all_ingredients.length > 0) {
    count = count + 1;
    console.log("LENGTH INGGGGGGGGGGGGG", count);
    if (count == 1 && props.all_ingredients.length > 0) {
      GetRecipeandIngredients();
    }
    // }
  }, [props.without_filter_ingredients]);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  useEffect(() => {
    if (AddedIngredientData.length > 0) {
      count1 = count1 + 1;
      console.log("ISNIDE ADD ING DATA", count1);
      console.log(
        "ADDED INGREDIENT DATA  222222222-----------------",
        AddedIngredientData
      );
      if (EditIngredients.length == AddedIngredientData.length) {
        props.DispatchAddIngredients(AddedIngredientData);
      }
    }
  }, [AddedIngredientData]);

  useEffect(() => {
    if (ExtraAddedIngredientData.length > 0) {
      setExtraIngredientArray(ExtraAddedIngredientData);
    }
  }, [ExtraAddedIngredientData]);

  console.log("ADDED ING -----------", props.added_ingredients);
  console.log("INGREDIENTs 00000 -----------", SelectedProduct);
  // console.log("props.added_ingredients ----- ", props.all_ingredients);

  console.log("EXTRA INGREDIENTS --------------", EditIngredients);
  console.log(
    "SELECTED PRODUCT -------",
    SelectedProduct,
    "-------- Extra array ----------",
    ExtraIngredientArray,
    "ALL PRODUCTS --------------",
    all_products
  );

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Supplier")} title={trans("Edit Recipe")} /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
              {/* <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Edit Recipe")}</h5>
                <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader> */}
              <CardHeader className="p-0 pb-4 mb-4 d-flex" >
                 <Col md='12'>
                  <h5 >
                    {trans("Edit Recipe")}
                  </h5>
                  </Col>
              </CardHeader>
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
                        key={SelectedProduct?.length > 0 ? SelectedProduct : []}
                        defaultValue={
                          SelectedProduct?.length > 0 ? SelectedProduct : []
                        }
                        render={() => (
                          <TypeAhead
                            className="typehead_form_control"
                            // Key={all_products != null ? all_products : []}
                            Placeholder={trans("Choose Product")}
                            LabelKey={"name_fr"}
                            OptionList={
                              all_products != null ? all_products : []
                            }
                            ChangeOption={(product) => ChooseProduct(product)}
                            ClearButton={true}
                            MultipleOptions={false}
                            Key={
                              SelectedProduct != null &&
                              SelectedProduct.length > 0
                                ? SelectedProduct
                                : []
                            }
                            DefaultSelected={
                              SelectedProduct != null &&
                              SelectedProduct.length > 0
                                ? SelectedProduct
                                : []
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
                      />
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
                          />
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
                      {SelectedIngredients != null &&
                        SelectedIngredients.length > 0 &&
                        props.added_ingredients?.length > 0 &&
                        props.added_ingredients.map(
                          (item, index) =>
                            item != undefined && (
                              <Row>
                                <Col md="6" className="mb-3">
                                  <InputGroup>
                                    <InputGroupText>{item.name}</InputGroupText>
                                    <Input
                                      name={`${item.id}-ingredient_quantity`}
                                      type={"text"}
                                      placeholder={
                                        SelectedIngredients.some(
                                          (item2) =>
                                            item.id == item2.ingredient_id
                                        ) == true
                                          ? props.added_ingredients.find(
                                              (item2) =>
                                                item.id == item2.ingredient_id
                                            )["name"]
                                          : item.name
                                      }
                                      defaultValue={
                                        SelectedIngredients.some(
                                          (item2) =>
                                            item.id == item2.ingredient_id
                                        ) == true
                                          ? SelectedIngredients.find(
                                              (item2) =>
                                                item.id == item2.ingredient_id
                                            )["quantity"] != 0
                                            ? SelectedIngredients.find(
                                                (item2) =>
                                                  item.id == item2.ingredient_id
                                              )["quantity"]
                                            : ""
                                          : item.name
                                      }
                                      className="form-control"
                                      innerRef={register({
                                        required: true,
                                      })}
                                    />
                                    <InputGroupText>
                                      {SelectedIngredients.some(
                                        (item2) =>
                                          item.id == item2.ingredient_id
                                      ) == true
                                        ? SelectedIngredients.find(
                                            (item2) =>
                                              item.id == item2.ingredient_id
                                          )["unit"]["name"]
                                        : ""}
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
                            )
                        )}
                      <br></br>
                      {ExtraIngredientToggle == true && (
                        <Label>{trans("Extra Ingredients")}</Label>
                      )}
                      {SelectedProduct != null &&
                        SelectedProduct.length > 0 &&
                        ExtraIngredientArray.length > 0 &&
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
                                  defaultValue={item.name}
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
                                  defaultValue={item.quantity}
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
                                  defaultValue={item.unit}
                                />
                                <span className="text-danger">
                                  {errors[
                                    `${SelectedProduct[0].id}-extra_ingredient_unit-${item.id}`
                                  ] && trans("field is required")}
                                </span>
                              </Col>

                              <Col md="2 mb-3 d-flex  justify-content-center align-items-flex-start">
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
                          ExtraIngredientToggle == false &&
                          ExtraIngredientArray.length == 0 && (
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
                            ExtraIngredientArray.length == 0 &&
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
    without_filter_ingredients: state.recipe.all_ingredients,
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
