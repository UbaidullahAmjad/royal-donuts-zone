/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { translate } from "react-switch-lang";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import './dataTable.css'

const DataTable = (props) => {
  const trans = props.t;

  const { selectionModelDeleteButton, onClickSelectionModelDeleteButton } =
    props;

  console.log(
    "selectionModelDeleteButton",
    selectionModelDeleteButton && selectionModelDeleteButton
  );

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
          <GridToolbarFilterButton />
        </div>
        <div>
          <GridToolbarQuickFilter />
          {selectionModelDeleteButton && selectionModelDeleteButton == true && (
            <Button
              className="ml-2 py-1 px-2"
              variant="contained"
              color="error"
            >
              <DeleteOutlineIcon
                style={{
                  color: "#fff !important",
                  marginTop: 0,
                  cursor: "pointer",
                }}
                onClick={onClickSelectionModelDeleteButton}
              />
            </Button>
          )}
        </div>
      </Box>
    );
  }

  const [pageSize, setPageSize] = useState(10);

  const data = {
    rowLength: props.rows.length
  }



  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={props.pageSize == undefined ? pageSize : props.pageSize}
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        disableSelectionOnClick
        loading={props.loading}
        page={props.page}
        onPageChange={props.onPageChange}
        onPageSizeChange={props.onPageSizeChange ? props.onPageSizeChange : (newPageSize) => setPageSize(newPageSize)}
        paginationMode={props.paginationMode == undefined ? "client" : "server"}
        rowCount={props.rowCount}
        pagination
        {...data}
        rowHeight={props.height == undefined ? 80 : props.height}
        columnVisibilityModel={props.columnsHidden}
        autoHeight={true}
        getRowId={props.get_row_id}
        checkboxSelection={
          props.checkboxSelection == undefined ? false : props.checkboxSelection
        }
        onSelectionModelChange={props.onSelectionModelChange}
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onCellEditCommit={async (params, event) => {
          console.log("params", params);
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
    </div>
  );
};

export default translate(DataTable);
