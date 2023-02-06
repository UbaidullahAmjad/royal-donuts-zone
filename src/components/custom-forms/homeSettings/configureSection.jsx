import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import { CKEditor } from "ckeditor4-react";
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
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";

const ConfigureSection = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

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

    axios({
      method: "post",
      url: `${URL}/config-section-update`,
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
      const response = await axios.get(`${URL}/config-section`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setContent(response.data.config.text);
      setConfig(response.data.config.text);
      setConfigId(response.data.config.id);
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
                        // key={content}
                        // defaultValue={content}
                        render={() => (
                          <CKEditor
                            activeclassName="p10"
                            initData={content}
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

export default ConfigureSection;
