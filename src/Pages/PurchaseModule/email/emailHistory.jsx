/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import {
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  CardBody,
  Card,
  Container,
} from "reactstrap";
import Breadcrumb from "../../../layout/breadcrumb";
import { useState } from "react";
import DataGrid from "../../../components/dataTable/dataTable";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailsListAction
} from "../../../redux/Pages/PurchaseModule/Emails/actions";

const EmailHistory = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [EmailId, setEmailId] = useState(null);

  const [EmailLength, setEmailLength] = useState(0);

  const emails = useSelector((state) => state.getEmails);


  useEffect(() => {
    if (emails?.emailsList.length == 0) {
      dispatch(EmailsListAction())
    }
    if (emails && emails.emailsList.length > 0
      && emails.tempArrLength != 0
      && emails.emailsList.length != emails.tempArrLength) {
      dispatch(EmailsListAction())
    }
  }, []);

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 60 },
    { field: "order_number", title: trans("Order"), flex: 1, minWidth: 120 },
    // { field: "supplier", title: trans("Supplier"), flex: 1.5, minWidth: 220 },
    {
      field: "subject",
      title: trans("Subject"),
      flex: 1,
      minWidth: 110,
      render: (cellValues) => {
        return (
          <div>
            <Button
              color="primary"
              onClick={() => SubjectModalToggle(cellValues.id)}
            >
              {trans("View")}
            </Button>
            <Modal isOpen={SubjectCenter} toggle={SubjectModalToggle} centered>
              <ModalHeader toggle={SubjectModalToggle}>Subject</ModalHeader>
              <ModalBody>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      emails.emailsList.some((item) => item.id == EmailId) &&
                      emails.emailsList.find((item) => item.id == EmailId)["subject"],
                  }}
                ></p>
              </ModalBody>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "Message",
      flex: 1,
      minWidth: 140,
      title: trans("Message"),
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Button
                color="primary"
                onClick={() => Verticalcentermodaltoggle(cellValues.id)}
              >
                {trans("View")}
              </Button>
            )}
            <Modal
              isOpen={Verticalcenter}
              toggle={Verticalcentermodaltoggle}
              centered
            >
              <ModalHeader toggle={Verticalcentermodaltoggle}>
                {trans("Message")}
              </ModalHeader>
              <ModalBody>
                <p>
                  {emails.emailsList.some((item) => item.id == EmailId) &&
                    emails.emailsList.find((item) => item.id == EmailId)["message"]}
                </p>
              </ModalBody>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "date",
      title: trans("Date"),
      flex: 1,
      minWidth: 160,
      render: (cellValues) => {
        let dateData = cellValues.created_at;
        let date = dateData.split("T");
        let original = date[0];
        return <p>{original}</p>;
      },
    },
    {
      field: "status",
      title: trans("Status"),
      flex: 1,
      minWidth: 120,
      render: (cellValues) => {
        if (cellValues.status === "1") {
          return (
            <Badge color="badge badge-success" active>
              {trans("success")}
            </Badge>
          );
        } else {
          return (
            <Badge color="badge badge-danger" active>
              {trans("failed")}
            </Badge>
          );
        }
      },
    },
  ];

  const [Verticalcenter, setVerticalcenter] = useState(false);
  const Verticalcentermodaltoggle = (id) => {
    setEmailId(id);
    setVerticalcenter(!Verticalcenter);
  };

  const [SubjectCenter, setSubjectCenter] = useState(false);
  const SubjectModalToggle = (id) => {
    setSubjectCenter(!SubjectCenter);
    setEmailId(id);
  };
  return (
    <>
      <Fragment>
        <Breadcrumb
          breadcrumbtitle={trans("Emails") + " " + trans("List")}
          parent={trans("Purchase Module")}
          title={trans("Emails")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card>
            <CardBody>
              <DataGrid
                columns={columns}
                data={emails.emailsList}
                isLoading={emails.loading && emails.emailsList?.length == 0 ? true : false}
              />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default EmailHistory;
