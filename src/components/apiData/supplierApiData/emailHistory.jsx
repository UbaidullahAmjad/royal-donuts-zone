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
import DataGrid from "../../dataTable/dataTable";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";
const EmailHistory = (props) => {
  const trans = props.t;
  const [emails, setEmails] = useState([]);
  const [EmailId, setEmailId] = useState(null);

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "order_number", headerName: trans("Order"), flex: 1 },
    // { field: "supplier", headerName: trans("Supplier"), flex: 1 },
    {
      field: "subject",
      headerName: trans("Subject"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              color="primary"
              onClick={() => SubjectModalToggle(cellValues.row.id)}
            >
              {trans("View")}
            </Button>
            <Modal isOpen={SubjectCenter} toggle={SubjectModalToggle} centered>
              <ModalHeader toggle={SubjectModalToggle}>Subject</ModalHeader>
              <ModalBody>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      emails.some((item) => item.id == EmailId) &&
                      emails.find((item) => item.id == EmailId)["subject"],
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
      headerName: trans("Message"),
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("show") != null)) && <Button
                color="primary"
                onClick={() => Verticalcentermodaltoggle(cellValues.row.id)}
              >
                {trans("View")}
              </Button>
            }
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
                  {emails.some((item) => item.id == EmailId) &&
                    emails.find((item) => item.id == EmailId)["message"]}
                </p>
              </ModalBody>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: trans("Date"),
      flex: 1,
      renderCell: (cellValues) => {
        let dateData = cellValues.row.created_at;
        let date = dateData.split("T");
        let original = date[0];
        return <p>{original}</p>;
      },
    },
    {
      field: "status",
      headerName: trans("Status"),
      flex: 1,
      renderCell: (cellValues) => {
        if (cellValues.value === "1") {
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
  useEffect(() => {
    const getEmails = async () => {
      const response = await axios.get(`${URL}/emailhistory`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("email", response);
      const emails = response.data.emails;
      emails.map((item, index) => (item["index"] = index + 1));
      setEmails(emails);
    };

    getEmails();
  }, []);

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
        <Breadcrumb parent={trans("Supplier")} title={trans("Emails")} />
        <Container fluid={true}>
          <Card>
            <CardBody>
              <DataGrid columns={columns} rows={emails} />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(EmailHistory);
