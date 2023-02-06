import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import axios from "axios";
import { useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";

const ZeltySetting = (props) => {
  const trans = props.t;

  const [activeStatus, setActiveStatus] = useState(0)
  const [zeltyToken, setZeltyToken] = useState(null)
  const [method, setMethod] = useState(zeltyToken)

  const { 
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});

  const navigate = useNavigate();

  useEffect(()=>{
      axios.get(`https://ecco.royaldonuts.xyz/api/get_key_status`)
      .then((response)=>{
          console.log('responssss', response)
          setActiveStatus(response.data.zelti_status)
          setZeltyToken(response.data.zelti_token)
      }).catch((error)=>{
        console.log('erorror', error)
      })
  },[])


  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('zelti_status', activeStatus)
    if(activeStatus == 1)
    {
      formData.append('zelti_token', data.zelty_token)
    }
    
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `https://ecco.royaldonuts.xyz/api/add_key_status`,
      data: formData
    })
      .then((response) => {
        console.log("RESPOJNSE ----", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error(trans("Error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  console.log('setAcitve', activeStatus)
  console.log('zelty token', zeltyToken)

  const setActivation = (e)=>{
       if(e.target.checked == true)
       { 
         console.log('true', e.target.checked)
           setActiveStatus(1)
       }
       else if(e.target.checked == false)
       {
        console.log('falsess', e.target.checked)
           setActiveStatus(0)
       }
  }

  return (
    <>
      <Fragment>
        {/* <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Zelty Setting")}
        /> */}

        {/* <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody> */}
                <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("Zelty Settings")}</h5>
                </CardHeader>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-row">
                      <Col md="3 pt-2">
                        <Label className="mb-0" htmlFor="validationCustom02">
                          {trans("Activate Zelty Key")}
                        </Label>
                      </Col>

                      <Col md="3 mb-3 d-flex justify-content-center align-items-center">
                        <FormControlLabel
                          name = "isActive"
                          control={
                          <Switch
                          name = "isActive"
                          type = 'checkbox'
                          key= {activeStatus == 1 ? activeStatus : ''}
                          defaultChecked=  {activeStatus == 1 ? activeStatus : ''}
                          onChange={(e)=>setActivation(e)}
                          />
                        }
                          label={trans("Activate")}
                          labelPlacement="end"
                        />
                      </Col>
                      {activeStatus == 1 && 
                      <Col md="6 mb-3 d-flex flex-row">
                      <Label htmlFor="validationCustom02" className="col-3 mt-2">
                        {trans("Zelty token")}
                      </Label>
                      <Input
                        className="form-control" 
                        name="zelty_token"
                        type="text"
                        key = {zeltyToken != null ? zeltyToken : ''}
                        defaultValue = {zeltyToken != null ? zeltyToken : ''}
                        innerRef={
                            register({
                              required: true,
                              maxLength: 100,
                              // pattern: /^[a-zA-Z0-9.\s]+$/,
                              
                            })
                          }
                      />
                        <span>
                        {errors.zelty_token?.type == "required" && trans("field is required")}
                        {errors.zelty_token?.type == "maxLength" && trans("Maximum Length: ") + "100"}
                        {errors.zelty_token?.type == "pattern" && "Please write alphanumeric values"}
                        </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                      }
                     
                    </div>
                    <Button color="primary">{trans("Save")}</Button>
                  </Form>
                {/* </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(ZeltySetting);
