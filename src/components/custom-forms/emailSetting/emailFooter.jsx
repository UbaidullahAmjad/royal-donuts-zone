import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
} from "reactstrap";
import { footerSignature } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";

const EmailFooter = (props) => {
  const trans = props.t;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [FooterData, setFooterData] = useState(null);

  const [content, setContent] = useState();
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description", "");
    } else {
      setValue("description", newContent);
    }
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    formData.append("description", data.description);

    axios({
      method: "post",
      url: "https://ecco.royaldonuts.xyz/api/footerupdate",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
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
      const res = await axios
        .get(`https://ecco.royaldonuts.xyz/api/footer`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("resp", response);
          setFooterData(response.data.setting);
          setContent(response.data.setting.description);
        });
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Validation" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{footerSignature}</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Controller
                        as={CKEditors}
                        control={control}
                        name="description"
                        rules={{ required: true }}
                        activeclassName="p10"
                        content={content}
                        events={{
                          change: onChange,
                        }}
                        key={FooterData != null && FooterData.description}
                        defaultValue={
                          FooterData != null && FooterData.description
                        }
                      />
                      <span>
                        {errors.description && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </div>
                  <Button color="primary">{"Save"}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(EmailFooter);
