import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
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

import { useTranslation, } from "react-i18next";

const CurserSection = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const [slider, setSlider] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const handleChangeStatus = ({ file }, status) => {
    if (status == "done") {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (slider.id !== null) {
      formData.append("id", slider.id);
      formData.append("image", data.image);
      formData.append("heading", data.heading);
      formData.append("text", data.text);
    } else {
    }
    axios({
      method: "post",
      url: `${URL}/slider-section-update`,
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
      const response = await axios.get(`${URL}/slider-section`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setSlider(response.data.slider);
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
                <h5>{curserSec}</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{Title}</Label>
                      <Input
                        className="form-control"
                        name="heading"
                        type="text"
                        placeholder={trans("Title")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={slider != undefined && slider.heading}
                        defaultValue={slider != undefined && slider.heading}
                      />
                      <span>
                        {errors.heading?.type == "required" &&
                          trans("title is required")}
                        {errors.heading?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.heading?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
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
                        name="text"
                        type="text"
                        placeholder={trans("Text under Title")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={slider != undefined && slider.text}
                        defaultValue={slider != undefined && slider.text}
                      />
                      <span>
                        {errors.text?.type == "required" &&
                          trans("field is required")}
                        {errors.text?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.text?.type == "pattern" &&
                          "Please write alphanumeric values"}
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
                        rules={{ required: false }}
                        inputContent={trans("Drop A File")}
                        styles={{
                          dropzone: { height: 200 },
                          dropzoneActive: { borderColor: "green" },
                        }}
                        accept="image/*"
                        onChangeStatus={handleChangeStatus}
                        {...register("image")}
                      />
                      <span className="text-danger">
                        {errors.image && trans("field is required")}
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

export default CurserSection;
