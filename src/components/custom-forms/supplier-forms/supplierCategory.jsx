import React, { Fragment, useState } from "react";
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
import { CustomStyles, Category, Image } from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const SupplierCategory = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const {
    register,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if(status =='error_file_size')
    allFiles.forEach(f => f.remove())
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
    if(status == "done") {
      setValue("image", file);
      setError(
        "image",
        {
          shouldFocus: false
        },
    )
    }
    
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/supplier_category`,
      data: formData,
    })
      .then((response) => {
        console.log("datat response", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true);
        }
      })
      .catch(() => {
        toast.error(trans("The name has already been taken"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setError(
          "name",
          {
            type: "string",
            message: trans("The name has already been taken"),
          },
          {
            shouldFocus: true,
          }
        );
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_category/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resps", response);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/supplier/categories/list/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Create Category")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(Category)}</h5>
                <Button onClick={goBack}>{trans("Go Back")}</Button>
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
                        {trans(Category)}
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter category")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span className="text-danger">
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)}</Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: false}}
                        render={() => (
                          <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            minSizeBytes={0}
                            maxSizeBytes={2000000}
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
                       <span className="text-danger">
                        {errors.image?.type == 'required' ? trans("field is required"):
                        errors.image && errors.image.message
                        }
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
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
export default translate(SupplierCategory);
