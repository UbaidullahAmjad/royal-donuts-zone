/* eslint-disable no-lone-blocks */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import Typeahead from "../../../components/TypeAhead/TypeAhead";
import { Controller, useForm } from "react-hook-form";
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
} from "reactstrap";
import {
  Produit,
  Catégorie,
  Image,
  Prix,
  Allergene,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SweetAlert from "sweetalert2";
import logo from "../../../assets/images/logo/logoo.png";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  ProductEditAction,
} from "../../../redux/Pages/ProductManagement/Products/actions";


const EditProduct = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const [content, setContent] = useState("");
  const [backBtn, setBackBtn] = useState(false);
  const [image, setImage] = useState(null);

  const [ProductData, setProductData] = useState(null);

  const ChangeFilling = (data_selected) => {
    // setValue('layer_id',data_selected)
    var data1 = data_selected;
    if (data_selected.length == 0) {
      setValue("fillings", []);
    } else {
      setValue("fillings", data_selected);
    }
  };

  const ChangeGlazing = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("glazes", []);
    } else {
      setValue("glazes", data_selected);
    }
  };

  const ChangeTopping = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("toppings", []);
    } else {
      setValue("toppings", data_selected);
    }
  };

  const ChangeSauce = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("sauces", []);
    } else {
      setValue("sauces", data_selected);
    }
  };

  const ChangeAllergens = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("allergens", "");
    } else {
      setValue("allergens", data_selected);
    }
  };

  const [layers, setLayers] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState(null);
  const [ProductSlug, setProductSlug] = useState(null);
  const [SeoProduct, setSeoProduct] = useState(null);
  const [ProductLayers, setProductLayers] = useState([]);
  const [ProductImage, setProductImage] = useState(null);
  const [ImageGallery, setImageGallery] = useState([]);
  const [ProductAllergens, setProductAllergens] = useState([]);
  const [zelty, setZelty] = useState(null);
  const [zeltyStatus, setZeltyStatus] = useState(0);

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
    {
      setError(
        "image",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB"),
        },
        {
          shouldFocus: true,
        }
      );
    }
    if (status == "done") {
      setValue("image", file);
      setError("image", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    const form_data = new FormData();
    const layer_id = [];
    if (data.fillings != undefined && data.fillings.length > 0) {
      data.fillings.map((item) => layer_id.push(item.id));
    }
    if (data.glazes != undefined && data.glazes.length > 0) {
      data.glazes.map((item) => layer_id.push(item.id));
    }
    if (data.toppings != undefined && data.toppings.length > 0) {
      data.toppings.map((item) => layer_id.push(item.id));
    }
    if (data.sauces != undefined && data.sauces.length > 0) {
      data.sauces.map((item) => layer_id.push(item.id));
    }
    const allergen_id = [];
    if (data.allergens != undefined && data.allergens.length > 0) {
      data.allergens.map((item) => allergen_id.push(item.id));
    }

    form_data.append("name_fr", data.name_fr);
    form_data.append("category_id", data.category_id);
    form_data.append("slug", data.slug);
    form_data.append("blank", data.blank);
    form_data.append("price_euro", parseFloat(data.price_euro));
    form_data.append("layer_id", JSON.stringify(layer_id));
    form_data.append("allergen_id", JSON.stringify(allergen_id));
    if (data.meta_title != undefined && data.meta_title != null) {
      form_data.append("meta_title", data.meta_title);
    }
    if (data.meta_description != undefined && data.meta_description != null) {
      form_data.append("meta_description", data.meta_description);
    }
    if (data.robots_meta != undefined && data.robots_meta != null) {
      form_data.append("robots_meta", data.robots_meta);
    }
    if (data.canonical_url != undefined && data.canonical_url) {
      form_data.append("canonical_url", data.canonical_url);
    }

    if (data.image != undefined && data.image != "undefined") {
      form_data.append("image", data.image);
    }
    form_data.append("_method", "PATCH");

    setProductSlug(data.slug);

    dispatch(ProductEditAction(form_data, params.idd, trans));
  };

  const goBack = () => {
    navigate(`/ecommerce/products/list`);
  };

  useEffect(() => {
    getData();
    getZeltyStatus();
  }, []);

  const getZeltyStatus = () => {
    axios
      .get(`${URL}/get_key_status`)
      .then((response) => {
        setZeltyStatus(response.data.zelti_status);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  };

  const getData = async () => {
    const response = await axios.get(`${URL}/product/` + params.idd + "/edit", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    setLayers(response.data.layers);
    setAllergens(response.data.allergens);
    setCategories(response.data.categories);
    setSelectedProduct(response.data.product);
    setProductSlug(response.data.product.slug);
    setSeoProduct(response.data.product_seo);
    setImage(response.data.product.image);
    setProductLayers(response.data.product_layers);
    setProductAllergens(response.data.product_allegens);
    setProductImage(response.data.product.image);
    setZelty(response.data.prod_zelty_key);
    setSlugText(response.data.product.slug);
    setProductData(response.data.product);
    reset(response.data.product);

    // }
    // else{
    //   const response = await axios.get(`${URL}/product/create`)
    //   setLayers(response.data.layers)
    //   setAllergens(response.data.allergens)
    //   setCategories(response.data.categories)
    // }
  };

  useEffect(() => {
    getData();
    getZeltyStatus();
  }, []);

  const deleteGalleryImage = (id, product_id) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await axios
          .get(`${URL}/product_gal_image/${product_id}/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then(() => {
            getData();

            SweetAlert.fire({
              icon: "success",
              title: trans("Deleted"),
              text: trans("Your item has been deleted."),
              confirmButtonText: trans("OK"),
            });
          });
      }
    });
  };

  if (ProductAllergens != null && ProductLayers != null) {
    console.log(
      "PAAA",
      ProductAllergens,
      "----PLLLL---",
      ProductLayers[0],
      " ------------ ImageGallery -------",
      ImageGallery
    );
  }

  const [slugTExt, setSlugText] = useState("");

  function convertToSlug(Text) {
    let slug = Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlugText(slug);
  }

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Product")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
                {/* <Col md="6">
          <h5>{trans("Edit Product")}</h5>
        </Col> */}
                {/* <Col md="6" className="text-right"> */}
                <Button onClick={goBack} className="mr-2">
                  {trans("Go Back")}
                </Button>
                {SelectedProduct != null && (
                  <Button
                    color="warning"
                    onClick={() =>
                      window.open(
                        "https://rd-beta.royaldonuts.xyz/produit/" + ProductSlug
                      )
                    }
                  >
                    {trans("View")}
                  </Button>
                )}
                {/* </Col> */}
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Catégorie)}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="category_id"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option value="" disabled={true} selected={true}>
                          {trans("Select Category")}
                        </option>
                        {categories !== [] &&
                          categories.map((item) => {
                            return (
                              <option
                                value={item.id}
                                selected={
                                  SelectedProduct != null &&
                                  SelectedProduct.category_id == item.id
                                }
                              >
                                {item.name_fr}
                              </option>
                            );
                          })}
                      </Input>
                      <span>
                        {errors.category_id && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Produit)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter the French name")}
                        onChange={(e) => {
                          convertToSlug(e.target.value);
                        }}
                        innerRef={register({
                          required: true,
                          maxLength: 60,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={SelectedProduct != null && SelectedProduct.name_fr}
                        defaultValue={
                          SelectedProduct ? SelectedProduct.name_fr : ""
                        }
                      />
                      <span>
                        {errors.name_fr?.type == "required" &&
                          trans("field is required")}
                        {errors.name_fr?.type == "maxLength" &&
                          trans("Maximum Length: ") + "60"}
                        {errors.name_fr?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Prix)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="price_euro"
                        type="number"
                        step="any"
                        placeholder={trans("Enter the price")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                          value:
                            SelectedProduct != null
                              ? SelectedProduct.price_euro
                              : "",
                        })}
                      // key={SelectedProduct != null ? SelectedProduct.price_euro : ''}
                      // defaultValue={SelectedProduct != null && SelectedProduct.price_euro}
                      />
                      <span>
                        {(errors.price_euro?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12") ||
                          (errors.price_euro?.type == "pattern" &&
                            trans("Number can not be a negative value")) ||
                          (errors.price_euro?.type == "required" &&
                            trans("field is required"))}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Slug")} <span className="text-danger">*</span>
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="slug"
                          type="text"
                          placeholder="Enter slug"
                          value={slugTExt}
                          onChange={(e) => {
                            convertToSlug(e.target.value);
                          }}
                          innerRef={register({
                            required: true,
                          })}
                          key={SelectedProduct != null && SelectedProduct.slug}
                          defaultValue={
                            SelectedProduct != null ? SelectedProduct.slug : ""
                          }
                        />
                      </InputGroup>
                      <span>
                        {errors.slug && errors.slug.type == "required"
                          ? trans("field is required")
                          : errors.slug && errors.slug.message}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Base")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="blank"
                        type="text"
                        step="any"
                        placeholder={trans("Enter base")}
                        key={SelectedProduct != null && SelectedProduct.blank}
                        defaultValue={
                          SelectedProduct ? SelectedProduct.blank : ""
                        }
                        innerRef={register({
                          required: true,
                          maxLength: 60,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.blank?.type == "required" &&
                          trans("field is required")}
                        {errors.blank?.type == "maxLength" &&
                          trans("Maximum Length: ") + "60"}
                        {errors.blank?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    {ProductAllergens != null && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Allergene)}
                        </Label>
                        <Controller
                          control={control}
                          name="allergens"
                          rules={{ required: false }}
                          defaultValue={
                            ProductAllergens != null ? ProductAllergens : []
                          }
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
                              id="multiple-typeahead"
                              clearButton
                              multiple
                              labelKey="name_fr"
                              placeholder={trans("Choose Allergens")}
                              onChange={(selected) => ChangeAllergens(selected)}
                              key={
                                ProductAllergens != null ? ProductAllergens : []
                              }
                              options={allergens}
                              defaultSelected={
                                ProductAllergens != null ? ProductAllergens : []
                              }
                            ></Typeahead>
                          )}
                        />
                        <span>
                          {errors.allergens && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    )}
                    {ProductLayers.length > 0 && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Filling")}
                        </Label>

                        <Controller
                          control={control}
                          name="fillings"
                          rules={{ required: false }}
                          key={ProductLayers != null ? ProductLayers[0] : []}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[0] : []
                          }
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
                              id="multiple-typeahead"
                              labelKey="name_fr"
                              multiple
                              clearButton
                              options={
                                layers.length > 0 &&
                                layers.filter(
                                  (item) => item.name_fr == "Remplissage"
                                )[0].layer_flavors
                              }
                              placeholder={trans("Choose Fillings")}
                              onChange={(selected) => ChangeFilling(selected)}
                              key={
                                ProductLayers.length > 0 ? ProductLayers[0] : []
                              }
                              defaultSelected={
                                ProductLayers.length > 0 ? ProductLayers[0] : []
                              }
                            />
                          )}
                        />
                        <span>
                          {errors.fillings && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    )}
                    {ProductLayers.length > 0 && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Glaze")}
                        </Label>
                        <Controller
                          control={control}
                          name="glazes"
                          rules={{ required: false }}
                          key={ProductLayers != null ? ProductLayers[1] : []}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[1] : []
                          }
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
                              id="multiple-typeahead"
                              labelKey="name_fr"
                              multiple
                              clearButton
                              options={
                                layers.length > 0 &&
                                layers.filter(
                                  (item) => item.name_fr == "Glaçage"
                                )[0].layer_flavors
                              }
                              placeholder={trans("Choose Glazes")}
                              // ref={register("glaze",{required:true})}
                              onChange={(selected) => ChangeGlazing(selected)}
                              key={
                                ProductLayers.length > 0 ? ProductLayers[1] : []
                              }
                              defaultSelected={
                                ProductLayers.length > 0 ? ProductLayers[1] : []
                              }
                            />
                          )}
                        />
                        <span>
                          {errors.glazes && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    )}
                    {ProductLayers != null && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Topping")}
                        </Label>
                        <Controller
                          control={control}
                          name="toppings"
                          rules={{ required: false }}
                          key={ProductLayers != null ? ProductLayers[2] : []}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[2] : []
                          }
                          render={() => (
                            <Typeahead
                              id="multiple-typeahead"
                              clearButton
                              multiple
                              labelKey="name_fr"
                              placeholder={trans("Choose Toppings")}
                              onChange={(selected) => ChangeTopping(selected)}
                              key={
                                ProductLayers.length > 0 ? ProductLayers[2] : []
                              }
                              options={
                                layers.length > 0 &&
                                layers.filter(
                                  (item) => item.name_fr == "Garniture"
                                )[0].layer_flavors
                              }
                              defaultSelected={
                                ProductLayers.length > 0 ? ProductLayers[2] : []
                              }
                            />
                          )}
                        />
                        <span>
                          {errors.toppings && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    )}
                    {ProductLayers.length > 0 && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Sauce")}
                        </Label>
                        <Controller
                          control={control}
                          name="sauces"
                          rules={{ required: false }}
                          key={ProductLayers != null ? ProductLayers[3] : []}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[3] : []
                          }
                          render={() => (
                            <Typeahead
                              id="multiple-typeahead"
                              clearButton
                              multiple
                              labelKey="name_fr"
                              placeholder={trans("Choose Sauces")}
                              onChange={(selected) => ChangeSauce(selected)}
                              key={
                                ProductLayers != null ? ProductLayers[3] : []
                              }
                              options={
                                layers.length > 0 &&
                                layers.filter(
                                  (item) => item.name_fr == "Sauce"
                                )[0].layer_flavors
                              }
                              defaultSelected={
                                ProductLayers != null ? ProductLayers[3] : []
                              }
                            />
                          )}
                        />
                        <span>
                          {errors.sauces && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    )}

                    {zeltyStatus == 1 && (
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Zelty key")}
                        </Label>
                        <Input
                          className="form-control"
                          name="prod_zelty_key"
                          type="text"
                          innerRef={register({ required: false })}
                          key={zelty != null ? zelty : ""}
                          defaultValue={zelty != null ? zelty : ""}
                          onChang={(e) => setZelty(e.target.value)}
                        ></Input>
                        <span>
                          {errors.prod_zelty_key && trans("field is required")}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    )}

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)}</Label>
                      <Dropzone
                        maxFiles={1}
                        multiple={false}
                        canCancel={false}
                        minSizeBytes={0}
                        maxSizeBytes={2000000}
                        inputContent={trans("Drop A File")}
                        // inputContent={(files, extra) => (extra.reject ? trans("Only Images accepted") : trans("Drop A File"))}
                        accept="image/*"
                        styles={{
                          dropzone: { height: 200 },
                          dropzoneActive: { borderColor: "green" },
                        }}
                        onChangeStatus={handleChangeStatus}
                        getUploadParams={({ meta }) => {
                          return { url: "https://httpbin.org/post" };
                        }}
                        {...register("image")}
                      />
                      <span className="text-danger">
                        {errors.image?.type == "required"
                          ? trans("field is required")
                          : errors.image && errors.image.message}
                      </span>
                      {ProductImage !== null &&
                        ProductImage != undefined &&
                        ProductImage != "undefined" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingTop: 10,
                            }}
                          >
                            <img
                              src={
                                SIMPLE_URL + `/images/Product/${ProductImage}`
                              }
                              width={100}
                              alt={ProductImage}
                              onError={(e) => {
                                e.currentTarget.src = logo;
                              }}
                            />
                          </div>
                        )}
                    </Col>
                  </div>
                  <Card>
                    <CardHeader>
                      <h1>{trans("SEO")}</h1>
                    </CardHeader>
                    <CardBody>
                      {/* <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Header")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="head"
                          type="textarea"
                          placeholder={trans("Add head")}
                          innerRef={register({ required: false })}
                          key={SeoProduct != null ? SeoProduct.head : ""}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.head : ""
                          }
                        />
                        <span className="text-danger">
                          {errors.head && trans("Header is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Body")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="body"
                          type="textarea"
                          placeholder={trans("Add body")}
                          innerRef={register({ required: false })}
                          key={SeoProduct != null ? SeoProduct.body : ""}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.body : ""
                          }
                        />
                        <span className="text-danger">
                          {errors.body && trans("Body is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col> */}
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Meta Title")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="meta_title"
                          type="text"
                          innerRef={register({ required: false })}
                          placeholder={trans("Add meta title")}
                          key={SeoProduct != null ? SeoProduct.meta_title : ""}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.meta_title : ""
                          }
                        />
                        <span className="text-danger">
                          {errors.meta_title && trans("Meta Title is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Meta Description")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="meta_description"
                          type="textarea"
                          placeholder={trans("Add meta description")}
                          innerRef={register({ required: false })}
                          key={
                            SeoProduct != null
                              ? SeoProduct.meta_description
                              : ""
                          }
                          defaultValue={
                            SeoProduct != null
                              ? SeoProduct.meta_description
                              : ""
                          }
                        />

                        <span className="text-danger">
                          {errors.meta_description &&
                            trans("Meta Description is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Robots Meta")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="robots_meta"
                          type="textarea"
                          placeholder={trans("Add robots meta")}
                          innerRef={register({ required: false })}
                          key={SeoProduct != null ? SeoProduct.robots_meta : ""}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.robots_meta : ""
                          }
                        />
                        <span className="text-danger">
                          {errors.robots_meta &&
                            trans("Robots Meta is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Canonical Url")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="canonical_url"
                          type="textarea"
                          placeholder={trans("Add cannonical url")}
                          innerRef={register({ required: false })}
                          key={
                            SeoProduct != null ? SeoProduct.canonical_url : ""
                          }
                          defaultValue={
                            SeoProduct != null ? SeoProduct.canonical_url : ""
                          }
                        />
                        <span className="text-danger">
                          {errors.canonical_url &&
                            trans("Canonical Url is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    </CardBody>
                  </Card>
                  <Button color="success">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditProduct;
