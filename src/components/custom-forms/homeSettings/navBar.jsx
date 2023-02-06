import React, { Fragment, useEffect, useState } from "react";
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
import {
  headerLogo,
  headerFooterLogo,
  footerLogo,
  instaLink,
  fbLink,
  youtubeLink,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const NavBar = (props) => {
  const trans = props.t;
  const [nav, setNavData] = useState(null);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const handleChangeStatus = ({ file }, status) => {
    if (status == "done") {
      setValue("file1", file);
    }
  };
  const handleFooterStatus = ({ file }, status) => {
    if (status == "done") {
      setValue("file2", file);
    }
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    if (nav != null) {
      formData.append("id", nav.id);
      formData.append("file1", data.file1);
      formData.append("file2", data.file2);
      formData.append("facebook", data.facebook);
      formData.append("instagram", data.instagram);
      formData.append("youtube", data.youtube);
    } else {
      formData.append("id", "no_id");
      formData.append("file1", data.file1);
      formData.append("file2", data.file2);
      formData.append("facebook", data.facebook);
      formData.append("instagram", data.instagram);
      formData.append("youtube", data.youtube);
    }
    axios({
      method: "post",
      url: `${URL}/nav-section-store`,
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
      const response = await axios.get(`${URL}/nav-section`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response.data);
      setNavData(response.data.nav);
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
                <h5>{trans(headerFooterLogo)}</h5>
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
                        {trans(headerLogo)}
                      </Label>{" "}
                      <Controller
                        control={control}
                        name="file1"
                        rules={{ required: true }}
                        render={() => (
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
                          />
                        )}
                      />
                      <span>{errors.file1 && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(footerLogo)}
                      </Label>
                      <Controller
                        control={control}
                        name="file2"
                        rules={{ required: true }}
                        render={() => (
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
                            onChangeStatus={handleFooterStatus}
                          />
                        )}
                      />
                      <span className="text-danger">{errors.file2 && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(fbLink)}
                      </Label>{" "}
                      <Input
                        className="form-control"
                        name="facebook"
                        type="text"
                        innerRef={register({ required: true })}
                        key={nav != undefined && nav.facebook}
                        defaultValue={nav != undefined && nav.facebook}
                      />
                      <span>
                        {errors.facebook && trans("link is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(instaLink)}
                      </Label>
                      <Input
                        className="form-control"
                        name="instagram"
                        type="text"
                        innerRef={register({ required: true })}
                        key={nav != undefined && nav.instagram}
                        defaultValue={nav != undefined && nav.instagram}
                      />
                      <span>
                        {errors.instagram && trans("link is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(youtubeLink)}
                      </Label>
                      <Input
                        className="form-control"
                        name="youtube"
                        type="text"
                        innerRef={register({ required: true })}
                        key={nav != undefined && nav.youtube}
                        defaultValue={nav != undefined && nav.youtube}
                      />
                      <span>{errors.youtube && trans("link is required")}</span>
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

export default translate(NavBar);
