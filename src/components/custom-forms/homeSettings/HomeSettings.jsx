/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";


const HomeSettings = (props) => {
  const trans = props.t;
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [setting, setSetting] = useState(null);



  const [footerContent, setFooterContent] = useState("");
  const changeFooter = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setFooterContent(newContent);
      setValue("footer", newContent);
    } else {
      setValue("footer", "");
    }
  };

  useEffect(() => {
    axios
      .post(`https://ecco.royaldonuts.xyz/api/general_home_setting`)
      .then((response) => {
        console.log("responssss", response);
        setSetting(response.data.setting);
        setContent(response.data.setting.heading3);
        setFooterContent(response.data.setting.footer);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  }, []);

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
    console.log('data', data)
    let formData = new FormData();
    formData.append('background_color', data.background_color)
    formData.append('button_color', data.button_color)
    formData.append('image', data.image)
    formData.append('footer', data.footer)
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `https://ecco.royaldonuts.xyz/api/general_home_setting`,
      data: formData
    })
      .then((response) => {
        console.log("RESPOJNSE ----", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error(trans("Error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
        {/* <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Home Settings")}
        /> */}

        <Container fluid={true}>
          <Row>
            <Col sm="12">
            <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("General Settings")}</h5>
                </CardHeader>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans('Background Color')} 
                      </Label>
                      <Input
                        className="form-control"
                        name="background_color"
                        type="color"
                        key={setting != null && setting.background_color}
                        defaultValue={setting != null ? setting.background_color : ''}
                        innerRef={register({
                          
                        })}
                      />
                      <span>
                        {errors.background_color?.type == "required" &&
                          trans("field is required")}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans('Button Color')} 
                      </Label>
                      <Input
                        className="form-control"
                        name="button_color"
                        type="color"
                        key={setting != null && setting.button_color}
                        defaultValue={setting != null ? setting.button_color : ""}
                        innerRef={register({
                          
                        })}
                      />
                      <span>
                        {errors.button_color?.type == "required" &&
                          trans("field is required")}
                      </span>
                    </Col>
                    {/* <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans('Button Text')} 
                      </Label>
                      <Input
                        className="form-control"
                        name="button_text"
                        type="text"
                        key={setting != null && setting.button_text}
                        defaultValue={setting != null ? setting.button_text : ''}
                        innerRef={register({
                          
                        })}
                      />
                      <span>
                        {errors.button_text?.type == "required" &&
                          trans("field is required")}
                      </span>
                    </Col> */}
                    {/* <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans('Heading 1')} 
                      </Label>
                      <Input
                        className="form-control"
                        name="heading1"
                        type="text"
                        key={setting != null && setting.heading1}
                        defaultValue={setting != null ? setting.heading1 : ''}
                        innerRef={register({
                          
                        })}
                      />
                      <span>
                        {errors.heading1?.type == "required" &&
                          trans("field is required")}
                      </span>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans('Heading 2')} 
                      </Label>
                      <Input
                        className="form-control"
                        name="heading2"
                        type="text"
                        key={setting != null && setting.heading2}
                        defaultValue={setting != null ? setting.heading2 : ''}
                        innerRef={register({
                          
                        })}
                      />
                      <span>
                        {errors.heading2?.type == "required" &&
                          trans("field is required")}
                      </span>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Description")}
                      </Label>
                      <Controller
                        control={control}
                        name="heading3"
                        rules={{ required: false }}
                        // defaultValue={" "}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={content}
                            events={{
                              change: onChange,
                            }}
                          />
                        )}
                      />
                      <span>
                        {errors.heading3 && trans("field is required")}
                      </span>
                    </Col> */}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Image")} </Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required:false }}
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
                        {errors.image?.type == 'required' ? trans("field is required") :
                          errors.image && errors.image.message
                        }
                      </span>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Footer Text")}
                      </Label>
                      <Controller
                        control={control}
                        name="footer"
                        rules={{ required: false }}
                        // defaultValue={" "}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={footerContent}
                            events={{
                              change: changeFooter,
                            }}
                          />
                        )}
                      />
                      <span>
                        {errors.footer && trans("field is required")}
                      </span>
                    </Col>
                  </div>
                  <Button type="submit" color="primary">{trans("Save")}</Button>
                </Form>
            </Col>
          </Row>
        </Container>

    </>
  );
};

export default translate(HomeSettings);
