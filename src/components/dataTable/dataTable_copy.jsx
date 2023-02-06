import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGridPro } from "@mui/x-data-grid-pro";
import { URL } from '../../env'
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";


const DataTable = (props) => {
  const trans = props.t;

  return (
    <div>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        // rowHeight={80}
        rowHeight={props.height == undefined ? 80 : props.height}
        columnVisibilityModel={props.columnsHidden}
        autoHeight={true}
        getRowId={props.get_row_id}
        // checkboxSelection={props.checkboxSelection == undefined ? false : props.checkboxSelection}
        onCellEditCommit={async (params, event) => {
          console.log('params', params)
          axios({
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/save_comment/${params.id}/${params.value}`,
          }).then((response) => {
            if (response.data.success === true) {
              toast.success(trans("successfull"), {
                position: toast.POSITION.TOP_RIGHT,
              })
            }
          }).catch((error) => {
            console.log('datable-error:', error)
          })
        }
        }
      />
    </div>

  )
}

export default translate(DataTable)