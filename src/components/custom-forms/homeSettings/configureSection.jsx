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
import { Text } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";

const ConfigureSection = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [content, setContent] = useState();
  const [config, setConfig] = useState(null);
  const [configId, setConfigId] = useState(null);

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setContent(newContent);
      setValue("description", newContent);
    } else {
      setValue("description", "");
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (configId != null) {
      formData.append("text", data.description);
      formData.append("id", configId);
    } else {
    }

    console.log("this is submitted data", data);
    axios({
      method: "post",
      url: "https://ecco.royaldonuts.xyz/api/config-section-update",
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
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/config-section`
        , {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        });
      console.log("resp", response);
      setContent(response.data.config.text);
      setConfig(response.data.config.text);
      setConfigId(response.data.config.id);
    };
    getData();
  }, []);

  console.log("config text", config);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title={trans("Validation")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{Text}</h5>
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
                        control={control}
                        name="description"
                        rules={{ required: true }}
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
                        {errors.description && trans("field is required")}
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

export default translate(ConfigureSection);
