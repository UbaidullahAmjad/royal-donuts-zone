/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../checkOut.css"
import { useTranslation, } from "react-i18next";
import { useSelector } from "react-redux";

const DeliveryDetail = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const checkoutFormData = useSelector((state) => state.checkoutForm);
  const formDataPushed = checkoutFormData.formDataPushed;
  const zip_code = checkoutFormData.store?.zip_code ?? "";
  const date = formDataPushed?.date ?? null;
  const orderType = formDataPushed?.delivery_method ?? "Delivery";
  const storeAddress = formDataPushed?.delivery_info ?? "";
  const time = formDataPushed?.delivery_time ?? "";

  const timeConvert_24_AMPM = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  return (
    <div className="co__order_summary mb-2">
      <p className="co__label_title form_labels" style={{ fontWeight: "bold" }}>
        {trans("Delivery Detail")}
      </p>
      <div className="co_horizontal"></div>
      <div className="co__order_summary_subtotal">
        <div className="total_item_box co__delivery_detail">
          <p className="m_title form_labels">{trans("Order Type")}</p>
          <p className="total_item_nno form_labels">
            {trans(
              orderType.charAt(0).toUpperCase() + orderType.slice(1)
            )}
          </p>
        </div>
        <div className="total_item_box co__delivery_detail">
          <p className="m_title form_labels">{trans("Zip Code")}</p>
          <p className="total_item_nno form_labels">{zip_code}</p>
        </div>
        <div className="subtotal_box co__delivery_detail">
          <p className="m_title form_labels">{trans("Address")}</p>
          <p className="subtotal_price form_labels">
            <span
              style={{
                // whiteSpace: "nowrap",
                // overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {storeAddress}
            </span>
          </p>
        </div>
        <div className="shipment_box co__delivery_detail">
          <p className="m_title form_labels">{trans("Date")}</p>
          <b className="shipment_address form_labels">
            {date}
          </b>
        </div>
        <div className="shipment_box co__delivery_detail">
          <p className="m_title form_labels">{trans("Time")}</p>
          <b className="shipment_address form_labels">{time}</b>
        </div>
      </div>
      <div className="co_horizontal"></div>
    </div>
  );
};

export default DeliveryDetail;
