/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { CKEditor } from "ckeditor4-react";
import { useForm, Controller } from "react-hook-form";
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
import {
  Image,
  Price,
  Description,
  Name,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/images/logo/logoo.png";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  LayerEditAction
} from "../../../redux/Pages/ProductManagement/Layers/actions";

const Couches = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const params = useParams();
  const [content, setContent] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const navigate = useNavigate();
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description_fr", "");
    } else {
      setValue("description_fr", newContent);
    }
  };

  const [LayerData, setLayerData] = useState(null);
  const [layer, setLayers] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/layers/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setLayerData(response.data.layer);
      setLayers(response.data.layers);
      setContent(response.data.layer.description_fr);
      setImage(response.data.layer.image);
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({ shouldFocusError: true });

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
    const formData = new FormData();
    if (data.image != undefined) {
      formData.append("image", data.image);
    }
    formData.append("layer_id", data.layer_id);
    formData.append("name_fr", data.name_fr);
    formData.append("price_euro", data.price_euro);
    if (data.description_fr != undefined || data.description_fr != "") {
      formData.append("description_fr", data.description_fr);
    }
    formData.append("_method", "PATCH");

    dispatch(LayerEditAction(formData, params.idd, trans))
  };

  const goBack = () => {
    navigate(`/layers/list`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Edit") + " " + trans("Layer")}
        parent={trans("Products Management")}
        title={trans("Layer")}
        subtitle={trans("Edit")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
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
                        {trans("Donut Layers")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="layer_id"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option value="" selected={true} disabled={true}>
                          {trans("Select Couches Donut")}
                        </option>
                        {layer !== [] &&
                          layer.map((item) => {
                            return (
                              <option
                                value={item.id}
                                selected={
                                  LayerData != null &&
                                  LayerData.layer_id == item.id
                                }
                                key={item.id}
                              >
                                {item.name_fr}
                              </option>
                            );
                          })}
                      </Input>
                      <span>
                        {errors.layer_id && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Name)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder="Enter name"
                        key={LayerData != null && LayerData.name_fr}
                        defaultValue={LayerData != null && LayerData.name_fr}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.name_fr?.type == "required" &&
                          trans("field is required")}
                        {errors.name_fr?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name_fr?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Price)} {" €"}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="price_euro"
                        type="number"
                        step="any"
                        placeholder={trans("Enter Price")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                        key={LayerData != null && LayerData.price_euro}
                        defaultValue={LayerData != null && LayerData.price_euro}
                      />
                      <span>
                        {errors.price_euro?.type == "required" &&
                          trans("price is required")}
                        {errors.price_euro?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
                        {errors.price_euro?.type == "pattern" &&
                          trans("Number can not be a negative value")}
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
                      <span className="text-danger">
                        {errors.image?.type == "required"
                          ? trans("field is required")
                          : errors.image && errors.image.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                      <div className="container d-flex justify-content-center align-items-center mt-3">
                        {image != null &&
                          image != undefined &&
                          image != "undefined" && (
                            <img
                              width={100}
                              height={100}
                              src={`https://ecco.royaldonuts.xyz/images/layers/${image}`}
                              alt={"alt"}
                              onError={(e) => {
                                e.currentTarget.src = logo;
                              }}
                            ></img>
                          )}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Description)}
                      </Label>
                      <Controller
                        // as={CKEditor}
                        control={control}
                        name="description_fr"
                        rules={{ required: false }}
                        key={LayerData != null && LayerData.description_fr}
                        defaultValue={
                          LayerData != null && LayerData.description_fr
                        }
                        render={() => (
                          <CKEditor
                            activeclassName="p10"
                            element={content}
                            initData={LayerData != null ? LayerData.description_fr : ""}
                            onChange={onChange}
                          />
                        )}
                      />

                      <span>
                        {errors.description && trans("field is required")}
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
        </Row>
      </Container>
    </Fragment>
  );
};

export default Couches
