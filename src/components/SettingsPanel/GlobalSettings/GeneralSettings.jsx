/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
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
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { CKEditor } from "ckeditor4-react";
import { useDispatch, useSelector } from "react-redux";
import {
  GeneralSettingGetDataAction,
  GeneralSettingSaveDataAction,
} from "../../../redux/SettingsPanel/GlobalSettings/GeneralSettings/actions";

const GeneralSettings = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();

  const [footerContent, setFooterContent] = useState("");
  const [cookieContent, setCookieContent] = useState("");

  const GeneralSettings = useSelector((state) => state.getGeneralSettings);

  useEffect(() => {
    if (GeneralSettings?.generalSettings == null) {
      dispatch(GeneralSettingGetDataAction())
    }
    if (GeneralSettings.generalSettingsLength != GeneralSettings.tempArrLength) {
      dispatch(GeneralSettingGetDataAction())
    }
  }, [GeneralSettings]);

  useEffect(() => {

    setFooterContent(GeneralSettings.generalSettings?.footer);
    setCookieContent(GeneralSettings.generalSettings?.cookie);
    // setValue("footer", GeneralSettings.generalSettings?.footer);
    // setValue("cookie", GeneralSettings.generalSettings?.cookie);

  }, [GeneralSettings.generalSettings]);

  const changeFooter = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      // setFooterContent(newContent);
      setValue("footer", newContent);
    } else {
      setValue("footer", "");
    }
  };

  const changeCookie = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      // setCookieContent(newContent);
      setValue("cookie", newContent);
    } else {
      setValue("cookie", "");
    }
  };

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
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
    if (status == "done") {
      setValue("image", file);
      setError("image", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("background_color", data.background_color);
    formData.append("button_color", data.button_color);
    formData.append("image", data.image);
    formData.append("footer", data.footer);
    formData.append("cookie", data.cookie);
    formData.append("fb_link", data.fb_link);
    formData.append("insta_link", data.insta_link);
    formData.append("t_link", data.t_link);
    formData.append("linkedin_link", data.linkedin_link);

    dispatch(GeneralSettingSaveDataAction(formData, trans));
  };

  return (
    <>
      {/* <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Home Settings")}
        /> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            {/* <CardHeader className="p-0 pb-4 mb-4">
              <h5>{trans("General Settings")}</h5>
            </CardHeader> */}
            <Form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-row">
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Background Color")}
                  </Label>
                  <Input
                    className="form-control"
                    name="background_color"
                    type="color"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.background_color : ""}
                    defaultValue={
                      GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.background_color : ""
                    }
                    innerRef={register({})}
                  />
                  <span>
                    {errors.background_color?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Button Color")}
                  </Label>
                  <Input
                    className="form-control"
                    name="button_color"
                    type="color"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.button_color : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.button_color : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.button_color?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Facebook Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="fb_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.fb_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.fb_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.fb_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Instagram Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="insta_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.insta_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.insta_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.insta_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Twitter Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="t_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.t_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.t_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.t_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="6 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("LinkedIn Link")}
                  </Label>
                  <Input
                    className="form-control"
                    name="linkedin_link"
                    type="text"
                    key={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.linkedin_link : ""}
                    defaultValue={GeneralSettings.generalSettings != null ? GeneralSettings.generalSettings?.linkedin_link : ""}
                    innerRef={register({})}
                  />
                  <span>
                    {errors.linkedin_link?.type == "required" &&
                      trans("field is required")}
                  </span>
                </Col>
                <Col md="12 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Footer Text")}
                  </Label>
                  <Controller
                    control={control}
                    name="footer"
                    rules={{ required: false }}
                    key={footerContent}
                    defaultValue={footerContent}
                    render={(data) => (
                      <CKEditor
                        activeclassName="p10"
                        initData={footerContent}
                        onChange={changeFooter}
                      />
                    )}
                  />
                  <span>{errors.footer && trans("field is required")}</span>
                </Col>
                <Col md="12 mb-3">
                  <Label htmlFor="validationCustom02">
                    {trans("Cookie Text")}
                  </Label>
                  <Controller
                    control={control}
                    name="cookie"
                    rules={{ required: false }}
                    key={cookieContent}
                    defaultValue={cookieContent}
                    render={() => (
                      <CKEditor
                        activeclassName="p10"
                        initData={cookieContent}
                        onChange={changeCookie}
                      />
                    )}
                  />
                  <span>{errors.cookie && trans("field is required")}</span>
                </Col>
              </div>
              <Button type="submit" color="success">
                {trans("Save")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GeneralSettings;
