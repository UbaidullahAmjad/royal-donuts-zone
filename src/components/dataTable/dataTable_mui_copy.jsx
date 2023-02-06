/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { URL } from "../../env";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./dataTable.css";
import { Col } from "reactstrap";

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
          <GridToolbarColumnsButton />
          {/* <GridToolbarFilterButton /> */}
          {
            showGridToolbarFilterButton != undefined && showGridToolbarFilterButton == true && <GridToolbarFilterButton />
          }
          {
            showGridToolbarFilterButton == undefined && <GridToolbarFilterButton />
          }
        </div>
        <div>
          <GridToolbarQuickFilter id="grid_toolbar_quick_filter" />
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

  const data = {
    rowLength: props.rows.length,
  };

  return (
    <div style={{ width: "100%" }}>
      {props.rows.length > 0 || props.dataLength == 0 ? (
        <DataGrid
          rows={props.rows.length > 0 && props.rows}
          columns={props.columns}
          pageSize={props.pageSize == undefined ? pageSize : props.pageSize}
          rowsPerPageOptions={[10, 25, 50, 75, 100]}
          disableSelectionOnClick
          loading={props.loading}
          page={props.page}
          onPageChange={props.onPageChange}
          onPageSizeChange={
            props.onPageSizeChange
              ? props.onPageSizeChange
              : (newPageSize) => setPageSize(newPageSize)
          }
          paginationMode={
            props.paginationMode == undefined ? "client" : "server"
          }
          rowCount={props.rowCount}
          pagination
          {...data}
          rowHeight={props.height == undefined ? 80 : props.height}
          columnVisibilityModel={props.columnsHidden}
          autoHeight={true}
          getRowId={props.get_row_id}
          checkboxSelection={
            props.checkboxSelection == undefined
              ? false
              : props.checkboxSelection
          }
          onSelectionModelChange={
            props.onSelectionModelChange
              ? props.onSelectionModelChange
              : handleOnSelectionModelChange
          }
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: QuickSearchToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onFilterModelChange={props.onFilterModelChange != undefined ? props.onFilterModelChange : ""}
          onCellEditCommit={async (params, event) => {
            axios({
              method: "get",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
              },
              url: `${URL}/save_comment/${params.id}/${params.value}`,
            })
              .then((response) => {
                if (response.data.success === true) {
                  toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }
              })
              .catch((error) => {
                console.log("datable-error:", error);
              });
          }}
        />
      ) : (
        <Col
          md="12 d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <div className="loader-box">
            <div className="loader-5"></div>
          </div>
        </Col>
      )}
    </div>
  );
};

export default DataTable;
