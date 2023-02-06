import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import Dropzone from "react-dropzone-uploader";
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
import { curserSec, underTitle, Image, Title } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const FloatingBox = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const handleChangeStatus = ({ file }, status) => {
    if (status == "done") {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("b_text", data.b_text);
    formData.append("text", data.text);
    axios({
      method: "post",
      url: `${URL}/float-section-update`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/float-section`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title={trans("Validation")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{trans(curserSec)}</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)}</Label>
                      <Dropzone
                        maxFiles={1}
                        multiple={false}
                        canCancel={false}
                        inputContent={trans("Drop A File")}
                        styles={{
                          dropzone: { height: 200 },
                          dropzoneActive: { borderColor: "green" },
                        }}
                        accept="image/*"
                        onChangeStatus={handleChangeStatus}
                        {...register("image")}
                      />
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Title)}</Label>
                      <Input
                        className="form-control"
                        name="text"
                        type="text"
                        placeholder={trans("Title")}
                        innerRef={register({ required: true })}
                      />
                      <span>{errors.text && trans("title is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(underTitle)}
                      </Label>
                      <Input
                        className="form-control"
                        name="b_text"
                        type="text"
                        placeholder={trans("Text under Title")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.b_text?.type == "required" && trans("field is required")}
                        {errors.b_text?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.b_text?.type == "pattern" && "Please write alphanumeric values"}
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

export default translate(FloatingBox);
