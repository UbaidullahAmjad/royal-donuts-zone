import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useNavigate, useParams } from "react-router-dom";
import CKEditors from "react-ckeditor-component";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
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
  CustomStyles,
  Category,
  Name,
  minQuantity,
  Supplier,
  unit,
  Price,
  PackageItem,
  Description,
  Image,
  Product,
  Quantity,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import logo from '../../../assets/images/logo/logoo.png'
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const EditSupplierProducts = (props) => {
  const trans = props.t;
  const param = useParams();
  const navigate = useNavigate();
  const id = param.idd;

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [product, setProduct] = useState(null);
  const [Unit, setUnit] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const [image, setImage] = useState(null)

  const [content, setContent] = useState(null);

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

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description", "");
    } else {
      setValue("description", newContent);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    setValue,
  } = useForm({ shouldFocusError: true });



  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("name", data.name);
    if (data.image !== undefined) {
      formData.append("image", data.image);
    }
    formData.append("supplier_id", data.supplier_id);
    // formData.append("price", data.price);
    formData.append("package", data.package);
    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    formData.append("unit_id", data.unit_id);
    formData.append("price_per_package", data.price_per_package);
    formData.append("unit_id", data.unit_id);
    formData.append("min_req_qty", data.min_req_qty);
    formData.append("_method", "PATCH");

    console.log("this is submitted data", data);
    await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/supplier_product/${id}`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setImage(response.data.data.image)
        setBackBtn(true);
        // navigate.goBack();
      } else {
        if (response.data.type == "name") {
          setError(
            "name",
            {
              type: "string",
              message: trans("Name_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Name_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_product/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("prods", response);
      setCategories(response.data.categories);
      setSuppliers(response.data.suppliers);
      setProduct(response.data.product);
      setImage(response.data.product.image)
      setContent(response.data.product.description);
      setUnit(response.data.units);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/supplier/products/list/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Edit Product")} />

      <Container fluid={true}>
        <Row>
          <div className="form-row">
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <h5>{trans("Edit Product")}</h5>
                  <Button onClick={goBack}>{trans("Go Back")}</Button>
                </CardHeader>
                <CardBody>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-row">
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom01">
                          {trans("Select Category")} *
                        </Label>
                        <Input
                          className="form-control"
                          name="category_id"
                          type="select"
                          placeholder={trans("Enter Category")}
                          innerRef={register({ required: true })}
                        >
                          {categories !== [] &&
                            categories.map((item) => {
                              return (
                                <option
                                  value={item.id}
                                  selected={
                                    product !== null &&
                                    product.category_id === item.id
                                  }
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </Input>
                        <span className="text-danger">
                          {errors.category_id && trans("Category is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustomUsername">
                          {trans(Supplier)} *
                        </Label>
                        <InputGroup>
                          <Input
                            className="form-control"
                            name="supplier_id"
                            type="select"
                            innerRef={register({ required: true })}
                          >
                            <option value="" selected disabled>
                              {trans("Select")}
                            </option>
                            {suppliers !== [] &&
                              suppliers.map((item) => {
                                return (
                                  <option
                                    value={item.id}
                                    selected={
                                      product !== null &&
                                      product.supplier_id === item.id
                                    }
                                  >
                                    {item.name}
                                  </option>
                                );
                              })}
                          </Input>
                        </InputGroup>
                        <span className="text-danger">
                          {errors.supplier_id && trans("Select Supplier")}
                        </span>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Name)} *
                        </Label>
                        <Input
                          className="form-control"
                          name="name"
                          type="text"
                          key={product != null && product.name}
                          defaultValue={product != null && product.name}
                          innerRef={
                            register({
                              required: true,
                              maxLength: 30,
                              pattern: /^[a-zA-Z0-9()\s]+$/
                            })
                          }
                        />
                        <span>
                          {errors.name?.type == "required" && trans("field is required")}
                          {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                          {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>

                      {/* <Col md="6 mb-3">
                        <Label htmlFor="validationCustom03">
                          {trans(Price)}
                        </Label>
                        <Input
                          className="form-control"
                          name="price"
                          type="number"
                          step="any"
                          key={product != null && product.price}
                          defaultValue={product != null && product.price}
                          innerRef={register({ required: false })}
                        />
                        <span>
                          {errors.price && trans("Please provide a Price")}
                        </span>
                        <div className="invalid-feedback">
                          {trans("Please provide a Price")}
                        </div>
                      </Col> */}

                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(unit)} *
                        </Label>
                        <Input
                          className="form-control"
                          name="unit_id"
                          type="select"
                          innerRef={register({ required: true })}
                        >
                          {Unit != null &&
                            Unit.map((item) => (
                              <option
                                value={item.id}
                                selected={
                                  product != null && item.id == product.unit_id
                                }
                              >
                                {item.name}
                              </option>
                            ))}
                        </Input>
                        <span>
                          {errors.unit_id && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom04">
                          {trans(PackageItem)} *
                        </Label>
                        <Input
                          className="form-control"
                          id="validationCustom04"
                          name="package"
                          type="number"
                          step="any"
                          key={product != null && product.package}
                          defaultValue={product != null && product.package}
                          innerRef={register({ required: true, maxLength: 16, pattern: /^[+]?\d+([.]\d+)?$/, })}
                        />
                        <span>
                          {errors.package?.type == "required" &&
                            trans("Please provide Package Item.")}
                          {errors.package?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                          {errors.package?.type == "pattern" && trans("Number can not be a negative value")}
                        </span>
                        <div className="invalid-feedback">
                          {trans("Please provide Package Item.")}
                        </div>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom04">
                          {`${trans("Package price")} €`} *
                        </Label>
                        <Input
                          className="form-control"
                          id="validationCustom04"
                          name="price_per_package"
                          type="number"
                          step="any"
                          key={product != null && product.price_per_package}
                          defaultValue={
                            product != null && product.price_per_package
                          }
                          innerRef={register({ required: true, maxLength: 16, pattern: /^[+]?\d+([.]\d+)?$/, })}
                        />
                        <span>
                          {errors.price_per_package?.type == "required" &&
                            trans("field is required.")}
                          {errors.price_per_package?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                          {errors.price_per_package?.type == "pattern" && trans("Number can not be a negative value")}
                        </span>
                        <div className="invalid-feedback">
                          {trans("please provide field.")}
                        </div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Image)}
                        </Label>
                        <Dropzone
                          maxFiles={1}
                          multiple={false}
                          canCancel={false}
                          minSizeBytes={0}
                          maxSizeBytes={2000000}
                          inputContent="Drop A File"
                          styles={{
                            dropzone: { height: 200 },
                            dropzoneActive: { borderColor: "green" },
                          }}
                          accept="image/*"
                          onChangeStatus={handleChangeStatus}
                          {...register("image")}
                        />
                          <span className="text-danger">
                        {errors.image?.type == 'required' ? trans("field is required"):
                        errors.image && errors.image.message
                        }
                      </span>
                        {image &&
                          image !== null &&
                          image !== undefined &&
                          image !== "undefined" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: 10,
                              }}
                            >
                              <img
                                src={`https://ecco.royaldonuts.xyz/images/Product/${image}`}
                                width={100}
                                alt={image}
                                onError={e => { e.currentTarget.src = logo }}
                              />
                            </div>
                          )}
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Description)}
                        </Label>
                        <Controller
                          control={control}
                          name="description"
                          rules={{ required: false }}
                          key={product != null && product.description}
                          defaultValue={product != null && product.description}
                          render={() => (
                            <CKEditors
                              activeclassName="p10"
                              content={content}
                              key={product != null && product.description}
                              defaultValue={
                                product != null && product.description
                              }
                              events={{
                                change: onChange,
                              }}
                            />
                          )}
                        />

                        <span>
                          {errors.description && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>

                        <span>
                          {errors.description &&
                            trans("description is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    </div>
                    <Button color="primary">{trans("Save")}</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(EditSupplierProducts);
