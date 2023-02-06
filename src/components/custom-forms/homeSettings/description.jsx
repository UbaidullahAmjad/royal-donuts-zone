/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
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
import {
  Text
} from "../../../constant/index";
import { translate } from "react-switch-lang";

const Description = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [content, setContent] = useState('content')
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent)
  }

  const onSubmit = (e, data) => {
    e.preventDefault();
    if (data !== "") {
      alert("You submitted the form and stuff!");
    } else {
      errors.showMessages();
    }
  };


  // const { firstName } = register("firstName", { required: true });
  // const { lastName } = register("lastName", { required: true });
  // const { userName } = register("userName", { required: true });

  return (
    <Fragment>
      {/* <Breadcrumb parent="Form" title={trans("Store Description")} /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
              {/* <CardHeader>
                <h5>{Text}</h5>
              </CardHeader> */}
              {/* <CardBody> */}
              <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("Store Description")}</h5>
                </CardHeader>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <CKEditors
                        activeclassName="p10"
                        content={content}
                        events={{
                          "change": onChange
                        }}
                      />
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

export default translate(Description);
