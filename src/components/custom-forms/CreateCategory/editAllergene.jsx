import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm, Controller } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";
import logo from '../../../assets/images/logo/logoo.png'
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const CreateAllergene = (props) => {
  const trans = props.t;
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({shouldFocusError:true});;

  const params = useParams();
  const navigate = useNavigate();
  const [AllergenData, setAllergenData] = useState(null);
  const [image, setImage] = useState(null);

  const [backBtn, setBackBtn] = useState(false)

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
    if (data.image != undefined) {
      formData.append("image", data.image);
    }
    formData.append("name_fr", data.name_fr);
    formData.append("isActive", data.isActive);
    formData.append("_method", "PATCH");

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/allergen/` + params.idd,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setImage(response.data.data.image)
       setBackBtn(true)
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const goBack = ()=>{
    navigate(`/allergens/list/RD`);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/allergen/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setAllergenData(response.data.allergen);
      setImage(response.data.allergen.image);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Allergen")} />

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
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                        key={AllergenData != null && AllergenData.name_fr}
                        defaultValue={
                          AllergenData != null && AllergenData.name_fr
                        }
                      />
                      <span>
                        {errors.name_fr?.type == "required" && trans("allergene is required")}
                        {errors.name_fr?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name_fr?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Status")}
                      </Label>
                      <Input
                        type="select"
                        className="form-control"
                        name="isActive"
                        innerRef={register({ required: true })}
                      >
                        <option value="" selected="true" disabled>
                          Choose Status
                        </option>
                        <option
                          value="0"
                          selected={
                            AllergenData != null && AllergenData.isActive == "0"
                          }
                        >
                          {trans("Inactive")}
                        </option>
                        <option
                          value="1"
                          selected={
                            AllergenData != null && AllergenData.isActive == "1"
                          }
                        >
                          {trans("Active")}
                        </option>
                      </Input>
                      <span>
                        {errors.isActive && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{Image}</Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: false }}
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
                      <div className="container d-flex justify-content-center align-items-center">
                        {image != null && (
                          <img
                            width={100}
                            height={100}
                            src={`https://ecco.royaldonuts.xyz/images/Allergen/${image}`}
                            alt={"alt"}
                            style = {{marginTop: '20px'}}
                            onError={e => { e.currentTarget.src = logo}}
                          ></img>
                        )}
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
