/* eslint-disable no-lone-blocks */
import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
} from "reactstrap";
import { CustomStyles, Category, Image } from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import logo from "../../../assets/images/logo/logoo.png";
import { useDispatch, } from "react-redux";
import {
  IngredientsCategoriesEditAction,
} from "../../../redux/Pages/ProductManagement/IngredientsCategories/actions";

const EditSupplierCategory = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const params = useParams();
  const navigate = useNavigate();
  const id = params.idd;

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

  const [category, setCategory] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const [image, setImage] = useState(null);
  const onSubmit = (data) => {

    const formData = new FormData();
    if (data.image !== undefined) {
      formData.append("image", data.image);
    }
    formData.append("name", data.name);
    formData.append("_method", "PATCH");

    dispatch(IngredientsCategoriesEditAction(formData, id, trans, setError))
  };

  const goBack = () => {
    navigate(`/supplier/categories/list`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_category/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setCategory(response.data.category);
      setImage(response.data.category.image);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={
          trans("Edit") + " " + trans("Ingredients") + " " + trans("Category")
        }
        parent={trans("Products Management")}
        title={trans("Ingredients Categories")}
        subtitle={trans("Edit")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(Category)}</h5>
                <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Category)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={category != null && category.name}
                        defaultValue={category != null && category.name}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)}</Label>
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
                      {image &&
                        image !== null &&
                        image !== undefined &&
                        image !== "undefined" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 10,
                          }}
                        >
                          <img
                            src={`${SIMPLE_URL}/images/Category/${image}`}
                            width={100}
                            alt={image}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 10,
                          }}
                        >
                          <img src={`${logo}`} width={100} alt={image} />
                        </div>
                      )}
                    </Col>
                  </div>
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

export default EditSupplierCategory;
