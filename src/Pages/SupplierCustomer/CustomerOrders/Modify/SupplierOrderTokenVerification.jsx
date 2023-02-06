/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CardHeader, CardBody, Form } from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
import { Card, Button } from "react-bootstrap";
import { useTranslation, } from "react-i18next";
import { useNavigate, } from "react-router";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { URL } from "../../../../env";
import { useDispatch, useSelector } from "react-redux";
import { SupplierOrderVerificationAction } from "../../../../redux/Pages/SupplierCustomer/CustomerOrders/Modify/SupplierOrderModifiyAction"
import SupplierOrderModify from "./SupplierOrderModify";

const SupplierOrderTokenVerification = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  // /:order_id/:supplier_id/:customer_id
  const order_id = params.order_id;
  const supplier_id = params.supplier_id;
  const customer_id = params.customer_id;

  const getSupplierOrderModifiy = useSelector((state) => state.getSupplierOrderModifiy);

  const [suppliderTokenResponse, setSuppliderTokenResponse] = useState(null)
  const [loading, setLoading] = useState(getSupplierOrderModifiy.loading);

  useEffect(() => {
    if (order_id != null && supplier_id != null && customer_id != null) {
      supplierTokenApiCall();
    }
  }, [params]);

  useEffect(() => {
    if (getSupplierOrderModifiy.loading == false && getSupplierOrderModifiy.isError == false) {
      setSuppliderTokenResponse(getSupplierOrderModifiy.SupplierOrderVerificationData)
    }
    setLoading(getSupplierOrderModifiy.loading)
  }, [getSupplierOrderModifiy])

  /**
   * order_id
   * supplier_id
   * customer_id
   */
  const supplierTokenApiCall = async () => {
    setLoading(true);

    const formData = {
      order_id: order_id,
      supplier_id: supplier_id,
      customer_id: customer_id,
    }

    dispatch(SupplierOrderVerificationAction(formData))
  };

  return (
    <>
      <ToastContainer />
      {
        suppliderTokenResponse != null ? (
          <SupplierOrderModify />
        ) : (
          <div className="container-fluid">
            <div className="user_auth__wrapped">
              <div className="row justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <Card className="p-3 mt-4" style={{ minHeight: 120 }}>
                    <CardHeader className="py-4">
                      <h4 className="text-center">{trans("Supplier Order Modification")}</h4>
                    </CardHeader>
                    <CardBody>
                      {loading == true ? <div className="d-flex align-items-center justify-content-center">
                        <div style={{ textAlign: 'center' }}>
                          <Spinner animation="border" variant="dark" style={{ height: 80, width: 80 }} />
                          <p>{trans("Please wait for a while")}...</p>
                        </div>
                      </div> : <>
                        {
                          suppliderTokenResponse != null ? <div className="">
                            {/* Token Verified */}
                          </div> : <div className="d-flex align-items-center justify-content-center">
                            <span>{trans("Sorry! Supplier not verified")}...</span>
                            <Button variant="primary" className="ml-2" onClick={supplierTokenApiCall}>{trans("Verify Again")}</Button>
                          </div>
                        }
                      </>}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default SupplierOrderTokenVerification;
