/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
/** Source: https://material-table.com/#/ */
import {
  Box,
  // Button 
} from "@mui/material";
import { URL } from "../../env";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./dataTable.css";
import { Link } from "react-router-dom";
import { Col, Button } from "reactstrap";

import { ThemeProvider, createTheme } from '@mui/material';

const DataTable = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const {
    showGridToolbarFilterButton,
    selectionModelDeleteButton,
    onClickSelectionModelDeleteButton,
    bulkDeleteAPI,
    setBulkDeleteAPI,
  } = props;

  const [loading, setLoading] = useState(true);

  const handleOnClickSelectionModelDeleteButton = () => {
    // alert("clicked")
  };

  const handleOnSelectionModelChange = () => { };

  const QuickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {selectionModelDeleteButton && selectionModelDeleteButton == true && (
            <Button
              className="ml-2 px-0"
              variant="contained"
              color="error"
              style={{ minWidth: 45, paddingTop: 6, paddingBotom: 8 }}
            >
              <DeleteOutlineIcon
                style={{
                  color: "#fff !important",
                  marginTop: 0,
                  cursor: "pointer",
                  fontSize: 16,
                }}
                onClick={
                  onClickSelectionModelDeleteButton
                    ? onClickSelectionModelDeleteButton
                    : handleOnClickSelectionModelDeleteButton
                }
              />
            </Button>
          )}
        </div>
      </Box>
    );
  };

  const [pageSize, setPageSize] = useState(10);

  // const data = {
  //   rowLength: props.rows.length,
  // };

  const defaultMaterialTheme = createTheme();

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title={props.title ? props.title : ""}
          data={props.data && props.data.length > 0 ? props.data : []}
          columns={props.columns && props.columns.length > 0 ? props.columns : []}
          options={{
            ...props.options,
            actionsColumnIndex: -1,
            filtering: false,
            paging: true,
            pageSize: props.pageSize == undefined
              ? (props.fitHeight && props.fitHeight == true && props.data && props.data.length > 0 && props.data.length < 10 ? props.data.length : pageSize)
              : props.pageSize,
            pageSizeOptions: props.fitHeight
              ? (props.fitHeight == true && props.data && props.data.length >= 10 ? [10, 25, 50, 75, 100] : false)
              : [10, 25, 50, 75, 100],
            exportButton: false,
          }}
          actions={{
            [Symbol.iterator]() {
              return [
                ...(props.actions ? props.actions : []),
                // add other actions here,
              ][Symbol.iterator]()
            }
          }}
          components={props.actions && {
            ...props.components,
            Action: props => (
              props.action.freeactions && props.action.freeactions == true ? (
                <span onClick={props.action.onClick(props.event, props.data)}></span>
              ) : (
                props.action.typeLink && props.action?.typeLink == true ? <Link
                  className={props.action?.linkClass} to={props.action.link ? props.action?.link : ""}>
                  <Button
                    className={props.action?.className ? props.action?.className : ""}
                    color={props.action.color ? props.action?.color : 'primary'}
                    hidden={props.action?.hidden}
                    variant="contained"
                    style={{ ...props.style, textTransform: 'none' }}
                    size="small"
                  >
                    {props.action.link ? props.action?.link : ""}
                    <i className="fa fa-edit"></i>
                  </Button>
                </Link> :
                  <Button
                    className={props.action?.className ? props.action?.className : ""}
                    color={props.action.color ? props.action?.color : 'primary'}
                    hidden={props.action?.hidden}
                    variant="contained"
                    style={{ ...props.style, textTransform: 'none' }}
                    size="small"
                    onClick={(event) => props.action.onClick(event, props.data)}
                  >
                    <i
                      className={props.action?.icon}
                    ></i>
                  </Button>
              )
            ),
          }}
          onSearchChange={props.onSearchChange ? props.onSearchChange : false}
          onSelectionChange={props.onSelectionChange ? props.onSelectionChange : false}
          cellEditable={props.cellEditable ? props.cellEditable : false}
          isLoading={props.isLoading}
          // onChangePage={props.onPageChange ? props.onPageChange : false}
          onChangeRowsPerPage={
            props.onChangeRowsPerPage
              ? props.onChangeRowsPerPage
              : (newPageSize) => { setPageSize(newPageSize); console.log("newPageSize", newPageSize) }
          }

        //---------------- old -----------------
        // onCellEditCommit={async (params, event) => {
        //   axios({
        //     method: "get",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       Authorization: "Bearer " + localStorage.getItem("token123"),
        //     },
        //     url: `${URL}/save_comment/${params.id}/${params.value}`,
        //   })
        //     .then((response) => {
        //       if (response.data.success === true) {
        //         toast.success(trans("successfull"), {
        //           position: toast.POSITION.TOP_RIGHT,
        //         });
        //       }
        //     })
        //     .catch((error) => {
        //       console.log("datable-error:", error);
        //     });
        // }}
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
