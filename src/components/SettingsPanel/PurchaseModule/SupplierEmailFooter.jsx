/* eslint-disable no-unused-vars */
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
import { footerSignature } from "../../../constant/index";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  SupplierEmailFooterGetDataAction,
  SupplierEmailFooterSaveDataAction
} from "../../../redux/SettingsPanel/PurchaseModule/SupplierEmailFooter/actions";

const SupplierEmailFooter = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
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

  const supplierFooterData = useSelector((state) => state.getSupplierEmailFooter);

  useEffect(() => {
    if (supplierFooterData.supplierFooter == null) {
      dispatch(SupplierEmailFooterGetDataAction())
    }
    if (supplierFooterData && supplierFooterData.supplierFooterLength != supplierFooterData.tempArrLength) {
      dispatch(SupplierEmailFooterGetDataAction())
    }
  }, [supplierFooterData]);

  useEffect(() => {
    // if (supplierFooterData.supplierFooter != null) {
    setContent(supplierFooterData.supplierFooter && supplierFooterData.supplierFooter?.description ? supplierFooterData.supplierFooter.description : "");
    // setValue("description", supplierFooterData.supplierFooter && supplierFooterData.supplierFooter?.description ? supplierFooterData.supplierFooter.description : "")
    // }
  }, [supplierFooterData.supplierFooter])


  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    // setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description", "");
    } else {
      setValue("description", newContent);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    // if (Method == "update") {
    //   formData.append("id", SettingData.id);
    //   formData.append("update", "update");
    // } else {
    //   formData.append("create", "create");
    // }
    if (supplierFooterData.method == "update") {
      formData.append("id", supplierFooterData.supplierFooter?.id);
      formData.append("update", "update");
    } else {
      formData.append("create", "create");
    }

    dispatch(SupplierEmailFooterSaveDataAction(formData, trans))
  };

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
              // key={supplierFooterData.supplierFooter?.description != null ? supplierFooterData.supplierFooter.description : ""}
              // defaultValue={supplierFooterData.supplierFooter?.description != null ? supplierFooterData.supplierFooter.description : ""}
              key={content}
              defaultValue={content}
              render={() => (
                <CKEditor
                  activeclassName="p10"
                  initData={content}
                  onChange={onChange}
                />
              )}
            />

            <span>{errors.description && trans("field is required")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </div>
        <Button color="success">{trans("Save")}</Button>
      </Form>
      {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default SupplierEmailFooter;
