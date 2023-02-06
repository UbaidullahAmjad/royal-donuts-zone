import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { Typeahead } from "react-bootstrap-typeahead";
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
  InputGroup
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SweetAlert from "sweetalert2";
import logo from '../../../assets/images/logo/logoo.png'
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import { async } from "@firebase/util";
import { TypeAheadToggleButton } from "../../CustomComponents";

const EditProduct = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });;

  const [content, setContent] = useState('');
  const [backBtn, setBackBtn] = useState(false);
  const [image, setImage] = useState(null);
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description_fr", "");
    } else {
      setValue("description_fr", newContent);
    }
  };


  const ChangeFilling = (data_selected) => {
    // setValue('layer_id',data_selected)
    console.log("DATA SELECTED", data_selected);
    var data1 = data_selected;
    console.log("DATA!!!", data1);
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
  const [SeoProduct, setSeoProduct] = useState(null);
  const [ProductLayers, setProductLayers] = useState([]);
  const [ProductImage, setProductImage] = useState(null);
  const [ImageGallery, setImageGallery] = useState([]);
  const [ProductAllergens, setProductAllergens] = useState([]);
  const [zelty, setZelty] = useState(null)
  const [zeltyStatus, setZeltyStatus] = useState(0)

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if (status == 'error_file_size')
      allFiles.forEach(f => f.remove())
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
      setError(
        "image",
        {
          shouldFocus: false
        },
      )
    }
  };

  const handleGalleryImages = ({ meta, file }, status, allFiles) => {
    if (status == 'error_file_size') {
      let files_size_error = allFiles.find((item) => item.file.name == file.name);
      files_size_error.remove();
      let files_array = allFiles.filter((item) => item.file.name != file.name);
      setValue("imagegallery", files_array);
      setError(
        "imagegallery",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB for each file."),
        },
        {
          shouldFocus: true,
        }
      );
    }

    if (status == "done") {
      setValue("imagegallery", allFiles);
      setError(
        "imagegallery",
        {
          shouldFocus: false
        },
      )
    }
  };




  const onSubmit = (data) => {
    console.log("this is submitted data", data);
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
    // form_data.append("quantity", data.quantity);
    form_data.append("price_euro", parseFloat(data.price_euro));
    form_data.append("prod_zelty_key", data.prod_zelty_key);
    form_data.append("layer_id", JSON.stringify(layer_id));
    form_data.append("allergen_id", JSON.stringify(allergen_id));
    if (data.head != undefined || data.head != null) {
      form_data.append("head", data.head);
    }
    if (data.body != undefined || data.body != null) {
      form_data.append("body", data.body);
    }
    if (data.meta_title != undefined || data.meta_title != null) {
      form_data.append("meta_title", data.meta_title);
    }
    if (data.meta_description != undefined || data.meta_description != null) {
      form_data.append("meta_description", data.meta_description);
    }
    if (data.robots_meta != undefined || data.robots_meta != null) {
      form_data.append("robots_meta", data.robots_meta);
    }
    if (data.canonical_url != undefined || data.canonical_url) {
      form_data.append("canonical_url", data.canonical_url);
    }
    if (data.description_fr != null && data.description_fr != undefined) {
      form_data.append("description_fr", data.description_fr);
    }

    form_data.append("_method", "PATCH");
    if (data.image != undefined || data.image != "undefined") {
      form_data.append("image", data.image);
    }
    if (data.imagegallery != undefined && data.imagegallery.length > 0) {
      data.imagegallery.map((item) => {
        console.log(" data.imagegallery - item.file", item.file);
        form_data.append("imagegallery[]", item.file);
      });
    }
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/product/${params.id}`,
      data: form_data,
    }).then((response) => {
      console.log('response ssss', response)
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setProductImage(response.data.data.image)
        setBackBtn(true)
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };


  const goBack = () => {
    navigate(`/ecommerce/products/list/RD`);
  };

  const getZeltyStatus = () => {
    axios.get(`https://ecco.royaldonuts.xyz/api/get_key_status`)
      .then((response) => {
        console.log('responssss', response)
        setZeltyStatus(response.data.zelti_status)
      }).catch((error) => {
        console.log('erorror', error)
      })
  }



  const getData = async () => {
    // if(params != null && params.idd != undefined){
    const response = await axios.get(`${URL}/product/` + params.id + "/edit", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("resp11", response);
    setLayers(response.data.layers);
    setAllergens(response.data.allergens);
    setCategories(response.data.categories);
    setSelectedProduct(response.data.product);
    setSeoProduct(response.data.product_seo);
    setImage(response.data.product.image);
    setProductLayers(response.data.product_layers);
    setProductAllergens(response.data.product_allegens);
    setProductImage(response.data.product.image);
    setZelty(response.data.prod_zelty_key)
    setSlugText(response.data.product.slug)
    const gal_images = response.data.product_gallery_images;
    setImageGallery(gal_images);
    setContent(response.data.product.description_fr);
    //  setValue("description",content);
    reset(response.data.product);
    // }
    // else{
    //   const response = await axios.get(`${URL}/product/create`)
    //   console.log('resp22', response)
    //   setLayers(response.data.layers)
    //   setAllergens(response.data.allergens)
    //   setCategories(response.data.categories)
    // }
  };

  useEffect(() => {
    getData();
    getZeltyStatus();
  }, []);

  console.log('product layer', ProductLayers)

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
        console.log("result-value", result);
        console.log("image id", id);
        console.log("product id", product_id);
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
    console.log("PAAA", ProductAllergens, "----PLLLL---", ProductLayers[0]);
  }

  const [slugTExt, setSlugText] = useState('')

  function convertToSlug(Text) {
    let slug = Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      ;
    setSlugText(slug)
  }

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Product")} /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
            <CardHeader className="p-0 pb-4 mb-4 d-flex" >
                 <Col md='6'>
                  <h5 >
                    {trans("Edit Product")}
                  </h5>
                  </Col>
                <Col md='6' className="text-right">
                <Button onClick={goBack}>{trans("Go Back")}</Button>
                </Col>
              </CardHeader>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Catégorie)} *
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
                        {trans(Produit)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter the French name")}
                        onChange={(e) => { convertToSlug(e.target.value) }}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                        key={SelectedProduct != null && SelectedProduct.name_fr}
                        defaultValue={
                          SelectedProduct ? SelectedProduct.name_fr : ""
                        }
                      />
                      <span>
                        {errors.name_fr?.type == "required" && trans("field is required")}
                        {errors.name_fr?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                        {errors.name_fr?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Quantity")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="quantity"
                        type="number"
                        step="any"
                        placeholder={trans("Enter Quantity")}
                        innerRef={register({
                          required: true, maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                          value: SelectedProduct != null ? SelectedProduct.quantity : '',
                        })}

                      // innerRef={register({
                      //   required: false,
                      //   value:
                      //     SelectedProduct != null && SelectedProduct.quantity,
                      // })}
                      />
                      <span>
                        {errors.quantity?.type == "maxLength" && trans("Maximum Length: ") + "12" ||
                          errors.quantity?.type == "pattern" && trans("Number can not be a negative value") ||
                          errors.quantity?.type == "required" && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Prix)} *</Label>
                      <Input
                        name="price_euro"
                        type="number"
                        step="any"
                        placeholder={trans("Enter the price")}
                        innerRef={register({
                          required: true,
                          maxLength: 12, pattern: /^[+]?\d+([.]\d+)?$/,
                          value:
                            SelectedProduct != null ?
                              SelectedProduct.price_euro : '',
                        })}
                      // key={SelectedProduct != null ? SelectedProduct.price_euro : ''}
                      // defaultValue={SelectedProduct != null && SelectedProduct.price_euro}
                      />
                      <span>
                        {errors.price_euro?.type == "maxLength" && trans("Maximum Length: ") + "12" ||
                          errors.price_euro?.type == "pattern" && trans("Number can not be a negative value") ||
                          errors.price_euro?.type == "required" && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Slug")} *</Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="slug"
                          type="text"
                          placeholder="Enter slug"
                          value={slugTExt}
                          onChange={(e) => { convertToSlug(e.target.value) }}
                          innerRef={register({
                            required: true,

                          })}
                          key={SelectedProduct != null && SelectedProduct.slug}
                          defaultValue={SelectedProduct != null ? SelectedProduct.slug : ""}
                        />
                      </InputGroup>
                      <span>
                        {errors.slug && errors.slug.type == "required"
                          ? trans("field is required")
                          : errors.slug && errors.slug.message}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Base")} *</Label>
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
                    <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Allergene)}
                        </Label>
                        {allergens.length > 0 && (
                         
                          <Controller
                            control={control}
                            name="allergens"
                            rules={{ required: false }}
                           defaultValue={
                              ProductAllergens.length > 0 ? ProductAllergens : []
                            }
                            render={() => (
                              <Typeahead
                                className="typehead_form_control"
                                id="multiple-typeahead"
                                clearButton
                                multiple
                                labelKey="name_fr"
                                placeholder={trans("Choose Allergens")}
                                onChange={(selected) =>
                                  ChangeAllergens(selected)
                                }
                                key={
                                  ProductAllergens.length > 0
                                    ? ProductAllergens
                                    : []
                                }
                                options={allergens}
                                defaultSelected={
                                  ProductAllergens.length > 0
                                    ? ProductAllergens
                                    : []
                                }
                              >
                                {({ isMenuShown, toggleMenu }) => (
                                  <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
                                )}
                              </Typeahead>
                            )}
                          />
                        )}
                        <span>
                          {errors.allergens && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    {ProductLayers.length > 0 && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Filling")}
                        </Label>

                        <Controller
                          control={control}
                          name="fillings"
                          rules={{ required: false }}
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
                            >
                              {({ isMenuShown, toggleMenu }) => (
                                <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
                              )}
                            </Typeahead>
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
                            >
                              {({ isMenuShown, toggleMenu }) => (
                                <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
                              )}
                            </Typeahead>
                          )}
                        />
                        {/* <Typeahead
                        id="multiple-typeahead"
                        labelKey="name_fr"
                        multiple
                        options={layers.length > 0 && layers.filter((item)=>item.name_fr=="Glaze")[0].layer_flavors}
                        placeholder="Choose Glazes"
                        // ref={register("glaze",{required:true})}
                        onChange={(selected)=>ChangeGlazing(selected)}
                        key={ProductLayers != null ? ProductLayers[1] : []}
                        defaultSelected={ProductLayers != null ? ProductLayers[1] : []}
                        
                        {...register('glazes')}
                    /> */}
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
                        {/* <Typeahead
                        id="multiple-typeahead"
                        labelKey="name_fr"
                        multiple
                        options={layers.length > 0 && layers.filter((item)=>item.name_fr=="Topping")[0].layer_flavors}
                        placeholder="Choose Toppings"
                        // ref={register("topping",{required:true})}
                        onChange={(selected)=>ChangeTopping(selected)}
                        key={ProductLayers != null ? ProductLayers[2] : []}
                        defaultSelected={ProductLayers != null ? ProductLayers[2] : []}
                        {...register('toppings')}
                    /> */}
                        <Controller
                          control={control}
                          name="toppings"
                          rules={{ required: false }}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[2] : []
                          }
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
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
                            >
                              {({ isMenuShown, toggleMenu }) => (
                                <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
                              )}
                            </Typeahead>
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
                    {ProductLayers.length> 0 && (
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Sauce")}
                        </Label>
                        {/* <Typeahead
                        id="multiple-typeahead"
                        labelKey="name_fr"
                        multiple
                        options={layers.length > 0 && layers.filter((item)=>item.name_fr=="Sauce")[0].layer_flavors}
                        placeholder="Choose Sauces"
                        // ref={register("sauce",{required:true})}
                        onChange={(selected)=>ChangeSauce(selected)}
                        key={ProductLayers != null ? ProductLayers[3] : []}
                        defaultSelected={ProductLayers != null ? ProductLayers[3] : []}
                        {...register('sauces')}
                    /> */}
                        <Controller
                          control={control}
                          name="sauces"
                          rules={{ required: false }}
                          defaultValue={
                            ProductLayers.length > 0 ? ProductLayers[3] : []
                          }
                          render={() => (
                            <Typeahead
                              className="typehead_form_control"
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
                            >
                              {({ isMenuShown, toggleMenu }) => (
                                <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
                              )}
                            </Typeahead>
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

                    {zeltyStatus == 1 &&

                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Zelty key")}
                        </Label>
                        <Input
                          className="form-control"
                          name="prod_zelty_key"
                          type="text"
                          innerRef={register({ required: false })}
                          key={zelty != null ? zelty : ''}
                          defaultValue={zelty != null ? zelty : ''}
                          onChang={(e) => setZelty(e.target.value)}
                        >
                        </Input>
                        <span>
                          {errors.prod_zelty_key && trans("field is required")}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    }

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Description")}
                      </Label>
                      <Controller
                        as={CKEditors}
                        control={control}
                        name="description_fr"
                        rules={{ required: false }}
                        activeclassName="p10"
                        content={content}
                        events={{
                          change: onChange,
                        }}
                        key={
                          SelectedProduct != null
                            ? SelectedProduct.description_fr
                            : ""
                        }
                        defaultValue={
                          SelectedProduct != null
                            ? SelectedProduct.description_fr
                            : ""
                        }
                      />
                      <span>
                        {errors.description && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

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
                        {errors.image?.type == 'required' ? trans("field is required") :
                          errors.image && errors.image.message
                        }
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
                              src={`https://ecco.royaldonuts.xyz/images/Product/${ProductImage}`}
                              width={100}
                              alt={ProductImage}
                              onError={e => { e.currentTarget.src = logo }}
                            />
                          </div>
                        )}

                    </Col>

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Image Gallery")}
                      </Label>
                      <Dropzone
                        maxFiles={8}
                        multiple={true}
                        canCancel={false}
                        minSizeBytes={0}
                        maxSizeBytes={2000000}
                        accept="image/*"
                        inputContent={trans("Drop Gallery Images")}
                        styles={{
                          dropzone: { height: 300 },
                          dropzoneActive: { borderColor: "green" },
                        }}
                        getUploadParams={({ meta }) => {
                          return { url: "https://httpbin.org/post" };
                        }}
                        onChangeStatus={handleGalleryImages}
                        {...register("imagegallery")}
                      />
                      <span>
                        {errors.imagegallery && errors.imagegallery.message}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          paddingTop: 10,
                        }}
                      >
                        {ImageGallery &&
                          ImageGallery.length > 0 &&
                          ImageGallery.map((gallery, i) => {
                            return (
                              <div
                                className="mx-1"
                                style={{
                                  position: "relative",
                                  padding: 10,
                                  border: "1px solid lightgray",
                                }}
                              >
                                <img
                                  src={`https://ecco.royaldonuts.xyz/images/EccomerceProductGallery/${gallery.image}`}
                                  width={100}
                                  alt={gallery.image}
                                />
                                <span
                                  className="fa fa-trash"
                                  style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    background: "white",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteGalleryImage(
                                      gallery.id,
                                      gallery.product_id
                                    )
                                  }
                                ></span>
                              </div>
                            );
                          })}
                      </div>
                    </Col>

                    
                  
                  </div>
                  <Card>
                    <CardHeader className="d-flex justify-content-start card-header px-2">
                      <h1>SEO</h1>
                    </CardHeader>
                    <CardBody className="p-0">
                      {/* <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          <h6 className="mb-0">{trans("Header")}</h6>
                        </Label>
                        <Input
                          className="form-control"
                          name="head"
                          type="textarea"
                          placeholder="Enter header"
                          innerRef={register({ required: true })}
                          key={SeoProduct != null ? SeoProduct.head : ''}
                          defaultValue={SeoProduct != null ? SeoProduct.head : ''}
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
                          placeholder="Enter body"
                          innerRef={register({ required: true })}
                          key={SeoProduct != null ? SeoProduct.body : ''}
                          defaultValue={SeoProduct != null ? SeoProduct.body : ''}
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
                          placeholder="Enter Title"
                          key={SeoProduct != null ? SeoProduct.meta_title : ''}
                          defaultValue={SeoProduct != null ? SeoProduct.meta_title : ''}

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
                          placeholder="Enter description"
                          innerRef={register({ required: false })}
                          key={
                            SeoProduct != null ? SeoProduct.meta_description : ''
                          }
                          defaultValue={
                            SeoProduct != null ? SeoProduct.meta_description : ''
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
                          placeholder="Enter robots"
                          innerRef={register({ required: false })}
                          key={SeoProduct != null ? SeoProduct.robots_meta : ''}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.robots_meta : ''
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
                          placeholder="Enter url"
                          innerRef={register({ required: false })}
                          key={SeoProduct != null ? SeoProduct.canonical_url : ''}
                          defaultValue={
                            SeoProduct != null ? SeoProduct.canonical_url : ''
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
                  <Button color="primary">{trans("Save")}</Button>
                </Form>
              {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(EditProduct);
