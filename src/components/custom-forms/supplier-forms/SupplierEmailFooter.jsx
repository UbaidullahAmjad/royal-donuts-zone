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

import { URL } from "../../../env";

const SupplierEmailFooter = (props) => {
  const trans = props.t;
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [content, setContent] = useState(null);
  const [SettingData, setSettingData] = useState(null);
  const [Method, setMethod] = useState(null);
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
    if (Method == "update") {
      formData.append("id", SettingData.id);
      formData.append("update", "update");
    } else {
      formData.append("create", "create");
    }

    axios({
      method: "post",
      url: `${URL}/footerupdate`,
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
      const response = await axios.get(`${URL}/footer`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      if (response.data.setting != null || response.data.setting != undefined) {
        setSettingData(response.data.setting);
        setMethod("update");
      } else {
        setMethod("create");
      }

      setContent(response.data.setting.description);
    };
    getData();
  }, []);

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Supplier")} title={trans("Email Footer")} /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
              <CardHeader className="p-0 pb-4 mb-4">
                <h5>{trans(footerSignature)}</h5>
              </CardHeader>
              {/* <CardBody> */}
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
                        rules={{ required: false }}
                        key={SettingData != null ? SettingData.description : ""}
                        defaultValue={
                          SettingData != null ? SettingData.description : ""
                        }
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
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Save")}</Button>
                </Form>
              {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(SupplierEmailFooter);
