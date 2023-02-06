import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
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
import {
  CustomStyles,
  Category,
  Image,
  CouchesDonut,
  Couche,
  Price,
  Description,
  Name,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";
import { useNavigate } from "react-router-dom";
import { translate } from "react-switch-lang";

const Couches = (props) => {
  const trans = props.t;
  const [content, setContent] = useState(null);
  const [backBtn, setBackBtn] = useState(false);

  const navigate = useNavigate();
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    setValue("description_fr", newContent);
  };

  const [layer, setLayers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/layers/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setLayers(response.data.layers);
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if(status =='error_file_size')
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
    if(status == "done") {
      setValue("image", file);
      setError(
        "image",
        {
          shouldFocus: false
        },
    )
    }
    
  };


  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    if (data.image != undefined) {
      formData.append("image", data.image);
    }
    formData.append("layer_id", data.layer_id);
    formData.append("name_fr", data.name_fr);
    formData.append("price_euro", data.price_euro);
    if (
      data.description_fr != undefined &&
      data.description_fr != "undefined" &&
      data.description_fr != ""
    ) {
      formData.append("description_fr", data.description_fr);
    }

    axios({
      method: "post",
      url: `${URL}/layers`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBackBtn(true);
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const goBack = () => {
    navigate(`/layers/list/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Create couch")} />

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
                        {trans("Donut Layers")}
                      </Label>
                      <Controller
                        control={control}
                        name="layer_id"
                        rules={{ required: true }}
                        defaultValue={layer != null ? layer[0] : []}
                        render={() => (
                          <Input
                            className="form-control"
                            name="layer_id"
                            type="select"
                            innerRef={register({ required: true })}
                          >
                            <option value="" selected="true" disabled>
                              {trans("Select Couches Donut")}
                            </option>
                            {layer !== [] &&
                              layer.map((item) => {
                                return (
                                  <option value={item.id}>
                                    {item.name_fr}
                                  </option>
                                );
                              })}
                          </Input>
                        )}
                      />

                      <span>
                        {errors.layer_id && trans("Couches Donut is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Name)+" *"}</Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.name_fr?.type == "required" && trans("field is required")}
                        {errors.name_fr?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name_fr?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Price)} {" €"} {" *"}
                      </Label>
                      <Input
                        className="form-control"
                        name="price_euro"
                        type="number"
                        placeholder={trans("Enter Price")}
                        innerRef={register({ required: true, maxLength: 12, pattern: /^[+]?\d+([.]\d+)?$/ })}
                      />
                      <span>
                        {errors.price_euro?.type == "required" && trans("price is required")}
                        {errors.price_euro?.type == "pattern" && trans("Number can not be a negative value")}
                        {errors.price_euro?.type == "maxLength" && trans("Maximum Length: ") + "12"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)} *</Label>
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
                        {errors.image?.type == 'required' ? trans("field is required"):
                        errors.image && errors.image.message
                        }
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Description)}
                      </Label>
                      <Controller
                        control={control}
                        name="description_fr"
                        rules={{ required: false }}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={content}
                            events={{
                              change: onChange,
                            }}
                            {...register("description_fr")}
                          />
                        )}
                      />

                      <span>
                        {errors.description_fr &&
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
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(Couches);
