/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { CKEditor } from "ckeditor4-react";
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
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  IngredientCreateAction,
} from "../../../redux/Pages/ProductManagement/Ingredients/actions";

const CreateSupplierProducts = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const [backBtn, setBackBtn] = useState(false);

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

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setContent(newContent);
      setValue("description", newContent);
    } else {
      setValue("description", "");
    }
  };

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm({ shouldFocusError: true });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("name", data.name);
    if (data.image != null && data.image != undefined) {
      formData.append("image", data.image);
    }
    formData.append("supplier_id", data.supplier_id);
    // formData.append("price", data.price);
    formData.append("package", data.package);
    if (data.description != null && data.description != undefined) {
      formData.append("description", data.description);
    }
    formData.append("unit_id", data.unit_id);
    formData.append("price_per_package", data.price_per_package);
    formData.append("unit_id", data.unit_id);
    formData.append("min_req_qty", data.min_req_qty);

    dispatch(IngredientCreateAction(formData, trans, setError))
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_product/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setCategories(response.data.categories);
      setSuppliers(response.data.suppliers);
      setUnits(response.data.units);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/supplier/products/list`);
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Supplier")} title={trans("Create Product")} /> */}
      <Breadcrumb
        breadcrumbtitle={trans("Create") + " " + trans("Ingredients")}
        parent={trans("Products Management")}
        title={trans("Ingredients")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <div className="form-row">
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <h5>{trans("Create Product")}</h5>
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
                          {trans(Category)}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="form-control"
                          name="category_id"
                          type="select"
                          placeholder={trans("choose a category")}
                          innerRef={register({ required: true })}
                        >
                          <option value="" selected="true" disabled>
                            {trans("choose a category")}
                          </option>
                          {categories !== [] &&
                            categories.map((item) => {
                              return (
                                <option value={item.id}>{item.name}</option>
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
                          {Supplier} <span className="text-danger">*</span>
                        </Label>
                        <InputGroup>
                          <Input
                            className="form-control"
                            name="supplier_id"
                            type="select"
                            placeholder={trans("Supplier")}
                            innerRef={register({ required: true })}
                          >
                            <option value="" selected="true" disabled>
                              {trans("Select Supplier")}
                            </option>
                            {suppliers !== [] &&
                              suppliers.map((item) => {
                                return (
                                  <option value={item.id}>{item.name}</option>
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
                          {trans(Name)} <span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="form-control"
                          name="name"
                          type="text"
                          placeholder={trans("Enter name")}
                          innerRef={register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9()\s]+$/,
                          })}
                        />
                        <span>
                          {errors.name?.type == "required" &&
                            trans("field is required")}
                          {errors.name?.type == "maxLength" &&
                            trans("Maximum Length: ") + "60"}
                          {errors.name?.type == "pattern" &&
                            "Please write alphanumeric values"}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>

                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(unit)} <span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="form-control"
                          name="unit_id"
                          type="select"
                          innerRef={register({ required: true })}
                        >
                          <option value="" selected="true" disabled>
                            {trans("Select")}
                          </option>
                          {units !== [] &&
                            units.map((item) => {
                              return (
                                <option value={item.id}>{item.name}</option>
                              );
                            })}
                        </Input>
                        <span className="text-danger">
                          {errors.unit_id && trans("field is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom04">
                          {trans(PackageItem)}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="form-control"
                          id="validationCustom04"
                          name="package"
                          type="number"
                          step="any"
                          placeholder={trans("Enter Package Item")}
                          innerRef={register({
                            required: true,
                            maxLength: 16,
                            pattern: /^[+]?\d+([.]\d+)?$/,
                          })}
                        />
                        <span>
                          {(errors.package?.type == "maxLength" &&
                            trans("Maximum Length: ") + "16") ||
                            (errors.package?.type == "pattern" &&
                              trans("Number can not be a negative value")) ||
                            (errors.package?.type == "required" &&
                              trans("Please provide Package Item."))}
                        </span>
                        <div className="invalid-feedback">
                          {/* {trans("Please provide Package Item.")} */}
                        </div>
                      </Col>
                      <Col md="6 mb-3">
                        <Label htmlFor="validationCustom04">
                          {`${trans("Package price")} €`}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="form-control"
                          id="validationCustom04"
                          name="price_per_package"
                          type="number"
                          step="any"
                          placeholder={trans("Package price")}
                          innerRef={register({
                            required: true,
                            maxLength: 16,
                            pattern: /^[+]?\d+([.]\d+)?$/,
                          })}
                        />
                        <span>
                          {(errors.price_per_package?.type == "required" &&
                            trans("field is required.")) ||
                            (errors.price_per_package?.type == "maxLength" &&
                              trans("Maximum Length: ") + "16") ||
                            (errors.price_per_package?.type == "pattern" &&
                              trans("Number can not be a negative value"))}
                        </span>
                        <div className="invalid-feedback">
                          {/* {trans("please provide field.")} */}
                        </div>
                      </Col>

                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Image)}
                        </Label>
                        <Controller
                          control={control}
                          name="image"
                          rules={{ required: false }}
                          render={() => (
                            <Dropzone
                              maxFiles={1}
                              multiple={false}
                              canCancel={false}
                              minSizeBytes={0}
                              maxSizeBytes={2000000}
                              inputContent={trans("Drop A File")}
                              styles={{
                                dropzone: { height: 200 },
                                dropzoneActive: { borderColor: "green" },
                              }}
                              accept="image/*"
                              onChangeStatus={handleChangeStatus}
                            />
                          )}
                        />
                        <span className="text-danger">
                          {errors.image?.type == "required"
                            ? trans("field is required")
                            : errors.image && errors.image.message}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans(Description)}
                        </Label>
                        <Controller
                          control={control}
                          name="description"
                          rules={{ required: false }}
                          render={() => (
                            <CKEditor
                              activeclassName="p10"
                              element={content}
                              onChange={(e) => onChange(e)}
                            />
                          )}
                        />

                        <span>
                          {errors.description &&
                            trans("description is required")}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </Col>
                    </div>
                    <Button color="success">{trans("Save")}</Button>
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

export default CreateSupplierProducts;
