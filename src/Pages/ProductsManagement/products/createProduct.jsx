/* eslint-disable no-unused-vars */
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
  InputGroupText,
  InputGroup,
} from "reactstrap";
import {
  Produit,
  Catégorie,
  Image,
  Prix,
  Remplissage,
  glaçage,
  Garniture,
  sauce,
  Couche,
  Allergene,
  LaDescription,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { useDispatch, } from "react-redux";
import {
  ProductCreateAction,
} from "../../../redux/Pages/ProductManagement/Products/actions";


const CreateProduct = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [ContentMetaTitle, setContentMetaTitle] = useState(null);
  const [zelty, setZelty] = useState(null);
  const [zeltyStatus, setZeltyStatus] = useState(0);

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);

  const [GalleryImages, setGalleryImages] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const ChangeFilling = (data_selected) => {
    // setValue('layer_id',data_selected)
    var data1 = data_selected;
    if (data_selected.length == 0) {
      setValue("fillings", "");
    } else {
      setValue("fillings", data_selected);
    }
  };

  const ChangeGlazing = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("glazes", "");
    } else {
      setValue("glazes", data_selected);
    }
  };

  const ChangeTopping = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("toppings", "");
    } else {
      setValue("toppings", data_selected);
    }
  };

  const ChangeSauce = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("sauces", "");
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
    const formData = new FormData();
    if (data.image != undefined) {
      formData.append("image", data.image);
    }

    formData.append("category_id", data.category_id);
    // formData.append("quantity", data.quantity);
    formData.append("name_fr", data.name_fr);
    formData.append("slug", data.slug);
    formData.append("blank", data.blank);
    formData.append("price_euro", data.price_euro);
    formData.append("prod_zelty_key", data.prod_zelty_key);
    formData.append("layer_id", JSON.stringify(layer_id));
    formData.append("allergen_id", JSON.stringify(allergen_id));
    // if (data.head != undefined && data.head != null) {
    //   formData.append("head", data.head);
    // }
    // if (data.body != undefined && data.body != null) {
    //   formData.append("body", data.body);
    // }
    if (
      data.meta_title != undefined &&
      data.meta_title != null &&
      data.meta_title != ""
    ) {
      formData.append("meta_title", data.meta_title);
    }
    if (data.meta_description != undefined && data.meta_description != null) {
      formData.append("meta_description", data.meta_description);
    }
    if (data.robots_meta != undefined && data.robots_meta != null) {
      formData.append("robots_meta", data.robots_meta);
    }
    if (data.canonical_url != undefined && data.canonical_url) {
      formData.append("canonical_url", data.canonical_url);
    }

    dispatch(ProductCreateAction(formData, trans));
  };

  const goBack = () => {
    navigate(`/ecommerce/products/list`);
  };

  const getZeltyStatus = () => {
    axios
      .get(`https://ecco.royaldonuts.xyz/api/get_key_status`)
      .then((response) => {
        setZeltyStatus(response.data.zelti_status);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/product/create`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      setLayers(response.data.layers);
      setAllergens(response.data.allergens);
      setCategories(response.data.categories);
      getZeltyStatus();
    };
    getData();
  }, []);

  const [slugTExt, setSlugText] = useState("");

  function convertToSlug(Text) {
    let slug = Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlugText(slug);
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <button
        type="button"
        className="btn btn-link"
        color="default"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Create Product")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
                {/* <Col md="6">
                  <h5>{trans("Create Product")}</h5>
                </Col>
                <Col md="6" className="text-right"> */}
                <Button onClick={goBack}>{trans("Go Back")}</Button>
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
                        <option value="" selected={true} disabled={true}>
                          {trans("Select category")} *
                        </option>
                        {categories !== [] &&
                          categories.map((item) => {
                            return (
                              <option value={item.id}>{item.name_fr}</option>
                            );
                          })}
                      </Input>
                      <span className="text-danger">
                        {errors.category_id?.type == "required" &&
                          trans("field is required")}
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
                        placeholder={trans("Enter name")}
                        onChange={(e) => {
                          convertToSlug(e.target.value);
                        }}
                        innerRef={register({
                          required: true,
                          maxLength: 60,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
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
                        className="form-control"
                        name="price_euro"
                        type="number"
                        step="any"
                        placeholder={trans("Enter the price")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {(errors.price_euro?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12") ||
                          (errors.price_euro?.type == "pattern" &&
                            trans("Number can not be a negative value")) ||
                          (errors.price_euro?.type == "required" &&
                            trans("Please provide Package Item."))}
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
                        />
                      </InputGroup>

                      <span className="text-danger">
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
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Allergene)}
                      </Label>
                      {allergens !== [] && (
                        <Controller
                          control={control}
                          name="allergens"
                          rules={{ required: false }}
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
                              id="multiple-typeahead"
                              clearButton
                              multiple
                              labelKey="name_fr"
                              placeholder={trans("Choose Allergens")}
                              onChange={(selected) => ChangeAllergens(selected)}
                              options={allergens}
                            ></Typeahead>
                          )}
                        />
                      )}
                      <span>
                        {errors.allergens && trans("field is required")}
                      </span>
                    </Col>

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
                          onChange={(e) => setZelty(e.target.value)}
                        ></Input>
                        <span>
                          {errors.prod_zelty_key && trans("field is required")}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    )}
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Filling")}
                      </Label>
                      <Controller
                        control={control}
                        name="fillings"
                        rules={{ required: false }}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            id="multiple-typeahead"
                            labelKey="name_fr"
                            multiple
                            clearButton
                            options={
                              layers.length > 0
                                ? layers.filter(
                                  (item) => item.name_fr == "Remplissage"
                                )[0].layer_flavors
                                : []
                            }
                            placeholder={trans("Choose Fillings")}
                            onChange={(selected) => ChangeFilling(selected)}
                          ></Typeahead>
                        )}
                      />

                      <span>
                        {errors.fillings && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Glaze")}
                      </Label>
                      <Controller
                        control={control}
                        name="glazes"
                        rules={{ required: false }}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            id="multiple-typeahead"
                            labelKey="name_fr"
                            multiple
                            clearButton
                            options={
                              layers.length > 0
                                ? layers.filter(
                                  (item) => item.name_fr == "Glaçage"
                                )[0].layer_flavors
                                : []
                            }
                            placeholder={trans("Choose Glazes")}
                            // ref={register("glaze",{required:true})}
                            onChange={(selected) => ChangeGlazing(selected)}
                          ></Typeahead>
                        )}
                      />

                      <span>{errors.glazes && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Topping")}
                      </Label>

                      <Controller
                        control={control}
                        name="toppings"
                        rules={{ required: false }}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            id="multiple-typeahead"
                            clearButton
                            multiple
                            labelKey="name_fr"
                            placeholder={trans("Choose Toppings")}
                            onChange={(selected) => ChangeTopping(selected)}
                            options={
                              layers.length > 0
                                ? layers.filter(
                                  (item) => item.name_fr == "Garniture"
                                )[0].layer_flavors
                                : []
                            }
                          ></Typeahead>
                        )}
                      />
                      <span>
                        {errors.toppings && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Sauce")}
                      </Label>

                      <Controller
                        control={control}
                        name="sauces"
                        rules={{ required: false }}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            id="multiple-typeahead"
                            clearButton
                            multiple
                            labelKey="name_fr"
                            placeholder={trans("Choose Sauces")}
                            onChange={(selected) => ChangeSauce(selected)}
                            options={
                              layers.length > 0
                                ? layers.filter(
                                  (item) => item.name_fr == "Sauce"
                                )[0].layer_flavors
                                : []
                            }
                          ></Typeahead>
                        )}
                      />
                      <span>{errors.sauces && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {Image} <span className="text-danger">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: true }}
                        render={() => (
                          <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            minSizeBytes={0}
                            maxSizeBytes={2000000}
                            inputContent={trans("Drop A File")}
                            accept="image/*"
                            styles={{
                              dropzone: { height: 200 },
                              dropzoneActive: { borderColor: "green" },
                            }}
                            onChangeStatus={handleChangeStatus}
                            getUploadParams={({ meta }) => {
                              return { url: "https://httpbin.org/post" };
                            }}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.image?.type == "required"
                          ? trans("field is required")
                          : errors.image && errors.image.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  {/* ----------- SEO ------- */}
                  <Card>
                    <CardHeader>
                      <h1>{trans("SEO")}</h1>
                    </CardHeader>
                    <CardBody>
                      {/* <Col md="12 mb-4 mt-4">
              <Accordion defaultActiveKey="-1">
                <div className="default-according" id="accordion">
                  <Card>
                    <CardHeader style={{ border: '1px solid #ced4da' }}>
                      <h4 className="mb-0">
                        <CustomToggle eventKey="0">
                          {trans("Short Codes")}
                        </CustomToggle>
                      </h4>
                    </CardHeader>
                    <Accordion.Collapse eventKey="0" style={{ border: '1px solid #ced4da' }}>
                      <CardBody>
                        <h6>{trans("Product")}</h6>
                        <p>
                          {"{product_category}"}, {"{product_name}"}, {"product_slug"}, {"product_price"}, {"{mobile_number}"},
                          {"product_description}"}, {"{address}"}, {"{email}"}
                        </p>
                        <h6>{trans("Extras")}</h6>
                        <p>
                          {"{allergen}"}, {"{filling}"}, {"{glaze}"}, {"{topping}"}, {"{sauce}"}
                        </p>
                      </CardBody>
                    </Accordion.Collapse>
                  </Card>
                </div>
              </Accordion>
            </Col> */}
                      {/* <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Header")}</h6>
                        </Label>
                        <Controller
                          control={control}
                          name="head"
                          rules={{ required: false }}
                          render={({ onChange }) => (
                            <textarea
                              name="head"
                              className="form-control"
                              placeholder={trans("Add head")}
                              onChange={onChange}
                            />
                          )}
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
                        <Controller
                          control={control}
                          name="body"
                          rules={{ required: false }}
                          render={({ onChange }) => (
                            <textarea
                              className="form-control"
                              placeholder={trans("Add body")}
                              onChange={onChange}
                            />
                          )}
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
                        <Controller
                          control={control}
                          name="meta_description"
                          rules={{ required: false }}
                          render={({ onChange, value }) => (
                            <textarea
                              className="form-control"
                              placeholder={trans("Add meta description")}
                              onChange={onChange}
                              value={value}
                            />
                          )}
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
                        <Controller
                          control={control}
                          name="robots_meta"
                          rules={{ required: false }}
                          render={({ onChange }) => (
                            <textarea
                              className="form-control"
                              placeholder={trans("Add robots meta")}
                              onChange={onChange}
                            />
                          )}
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
                        <Controller
                          control={control}
                          name="canonical_url"
                          rules={{ required: false }}
                          render={({ onChange }) => (
                            <textarea
                              className="form-control"
                              placeholder={trans("Add cannonical url")}
                              onChange={onChange}
                            />
                          )}
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
                  <Button type="submit" color="success">
                    {trans("Save")}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateProduct;
