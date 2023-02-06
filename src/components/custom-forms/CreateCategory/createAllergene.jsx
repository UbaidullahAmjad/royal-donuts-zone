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
import { AllergeneName, Allergene, Image } from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
const CreateAllergene = (props) => {
  const trans = props.t;
  const {
    register,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

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

  const navigate = useNavigate();
  const [backBtn, setBackBtn]  = useState(false)
  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("layer_id", data.layer_id);
    formData.append("name_fr", data.name_fr);
    formData.append("price_euro", data.price_euro);
    formData.append("description_fr", data.description_fr);

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/allergen`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      
        setBackBtn(true)

      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const goBack = () => {
    navigate(`/allergens/list/RD`);
  }


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/allergen/create`, {
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
      <Breadcrumb
        parent={trans("Ecommerce")}
        title={trans("Create Allergen")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
             <CardHeader className="d-flex justify-content-end">
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
                        {trans(Allergene)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter allergen")}
                        innerRef={register({ required: true, maxLength: 30, })}
                      />
                      <span>
                        {errors.name_fr?.type == "required" && trans("allergene is required")}
                        {errors.name_fr?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)} *</Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: true }}
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

export default translate(CreateAllergene);
