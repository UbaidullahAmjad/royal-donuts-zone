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
  Input,
} from "reactstrap";
import { Text } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";

import { translate } from "react-switch-lang";

const FindStore = (props) => {
  const trans = props.t;
  const [findStore, setFindStore] = useState(null);
  const [id, setId] = useState(null);
  const [description, setDescription] = useState(null);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [content, setContent] = useState();
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

    if (id != null) {
      formData.append("text", data.description);
      formData.append("id", id);
    } else {
      formData.append("text", data.description);
      formData.append("id", "no_id");
    }
    console.log("this is submitted data", data);
    axios({
      method: "post",
      url: "https://ecco.royaldonuts.xyz/api/find-store-section-update",
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
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/find-store-section`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      console.log("resp", response);
      setFindStore(response.data.findstore);
      setDescription(response.data.findstore.description);
      setContent(response.data.findstore.description);
      setId(response.data.findstore.id);
    };
    getData();
  }, []);

  console.log("description", description);

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Site Settings")}
        title={trans("Store Description")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>{trans("Store")}</h5>
              </CardHeader> */}
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
                        key={description != null ? description  : ''}
                        defaultValue={description != null ? description : ''}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={content}
                            defaultValue={description != null ? description : ''}
                            events={{
                              change: onChange,
                            }}
                          />
                        )}
                      />
                      <span className="text-danger">
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

export default translate(FindStore);
