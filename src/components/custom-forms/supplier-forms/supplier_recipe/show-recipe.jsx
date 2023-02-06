import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import { useState } from "react";
import DataGrid from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";

const RecipeList = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [openCSV, setOpenCSV] = useState(false);
  // const [RecipeList, setRecipeList] = useState([]);
  const [RecipeAllListData, setRecipeAllListData] = useState([]);
  const [alert, setalert] = useState(false);

  const [AllIngredients, setAllIngredients] = useState([]);

  const Displayalert = (name, id) => {
    setalert(true);
    if (name === "alertDanger") {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Once deleted, you will not be able to recover it!"),
        icon: "error",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          DeleteItem(id);
          SweetAlert.fire({
            icon: "success",
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };

  const [BulkSelectionDeleteIds, setBulkSelectionDeleteIds] = useState([]);
  const [selectionModelDeleteButton, setSelectionModelDeleteButton] =
    useState(false);

  const handleOnClickSelectionModelDeleteButton = () => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        bulkDeleteApiCall();
      }
    });
  };

  const bulkDeleteApiCall = async () => {
    await axios({
      method: "POST",
      url: `${URL}/recipe_bulk_delete`,
      data: { ids: JSON.stringify(BulkSelectionDeleteIds) },
    })
      .then((response) => {
        const deleted = RecipeAllListData.filter(
          (item) => !BulkSelectionDeleteIds.includes(item.id)
        );
        const index_update = deleted;
        index_update.map((item, index) => (item["index"] = index + 1));
        setRecipeAllListData(index_update);
        SweetAlert.fire({
          icon: "success",
          title: trans("Deleted"),
          text: trans("Your selected items has been deleted"),
          confirmButtonText: trans("OK"),
        });
      })
      .catch((error) => {
        console.log("bulkdelete-resp-error", error.response);
        toast.error(trans("error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const columns = [
    { field: "id", headerName: "#", flex: 1, minWidth: 100 },
    {
      field: "product_name",
      headerName: trans("Name"),
      flex: 1,
      minWidth: 200,
      renderCell: (cellValues) => {
        return cellValues.row.recipes.product_name;
      },
    },
    {
      field: "ingredients",
      headerName: trans("Ingredients"),
      flex: 4,
      minWidth: 480,
      renderCell: (cellValues) => {
        return (
          <div>
            <div style={{ marginLeft: 8, display: "flex", flexWrap: "wrap" }}>
              {cellValues.row.product_ingredients &&
                cellValues.row.product_ingredients.map(
                  (pd_item, i) =>
                    i <= 2 && (
                      <div className="mb-1" style={{ marginRight: 8 }}>
                        <Badge color="primary" pill>
                          {AllIngredients &&
                            AllIngredients.length > 0 &&
                            AllIngredients.find(
                              (ingred) => ingred.id == pd_item.ingredient_id
                            ).name}
                        </Badge>
                        {/* <span style={{ marginLeft: 4 }}>
                    {
                      i >= 2 && (i != cellValues.row.product_ingredients.length - 1) && "..."
                    }
                  </span> */}
                      </div>
                    )
                )}
              {cellValues.row.extra_product_ingredients &&
                cellValues.row.extra_product_ingredients &&
                cellValues.row.extra_product_ingredients.map(
                  (ex_pd_item, i) =>
                    i <= 1 && (
                      <div className="mb-1">
                        <Badge color="success" pill>
                          {ex_pd_item.name}
                        </Badge>
                      </div>
                    )
                )}
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 2,
      minWidth: 200,
      renderCell: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={
                  "/supplier/recipe/edit/" +
                  cellValues.row.recipes.id
                }
              >
                <Button outline color="primary" className=" mr-2">
                  <i className="fa fa-edit" outline></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) =>
                  Displayalert(e.target.name, cellValues.row.recipes.id)
                }
              >
                {" "}
                <i
                  className="fa fa-trash-o"
                  // title="alertDanger"
                  onClick={(e) =>
                    Displayalert("alertDanger", cellValues.row.id)
                  }
                ></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const getAllIngredients = async () => {
    await axios.get(`${URL}/supplier_product`).then((response) => {
      setAllIngredients(response.data.products);
    });
  };

  useEffect(() => {
    getAllIngredients();
    // ------------
    const getList = async () => {
      const response = await axios.get(`${URL}/recipe`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      const recipes = response.data.recipe;
      const prod_ingredients = response.data.product_ingredients_data;

      let all_recipes = [];
      recipes.map((prod_item, p_index) => {
        const pr_ingredients_list = prod_ingredients.map(
          (p_ingred) => p_ingred.product_ingredients
        );
        const pr_ingredients = pr_ingredients_list.find(
          (p_ingred, i) => i == p_index
        );
        const extra_pr_ingredients_list = prod_ingredients.map(
          (p_ingred) => p_ingred.$extra_product_ingredients
        );
        const extra_pr_ingredients = extra_pr_ingredients_list.find(
          (p_ingred, i) => i == p_index
        );
        all_recipes.push({
          recipes: prod_item,
          product_ingredients: pr_ingredients,
          extra_product_ingredients: extra_pr_ingredients,
        });
      });

      all_recipes.map((item, index) => (item["id"] = index + 1));
      setRecipeAllListData(all_recipes);
    };

    getList();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/recipe/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_List = RecipeAllListData.filter(
          (item) => item.recipes.id != id
        );
        const index_update = deleted_List;
        // index_update.map((item, index) => (item["index"] = index + 1));
        index_update.map((item, index) => (item["id"] = index + 1));
        setRecipeAllListData(index_update);
      });
  };

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/recipe_csv_export`,
    }).then((res) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data.data);

      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/plain;charset=UTF-8" });
      saveAs(blob, `recipies.csv`);
    });
  };

  const [csvFile, setCSVFile] = useState();

  const uploadCSV = (e) => {
    setCSVFile(e.target.files[0]);
  };

  const SubmitCSV = (data) => {
    const formDatta = new FormData();
    formDatta.append("csv", csvFile);
    axios({
      method: "post",
      url: `${URL}/recipe_csv_import`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formDatta,
    })
      .then((res) => {
        toast.success(trans("successfull"));
      })
      .catch((error) => {
        toast.error(trans("error"));
      });
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("Recipe List")} />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row>
                {(role == "SuperAdmin" ||
                  permissions.match("create") != null) && (
                    <Col className="text-right">
                      <Link to="/supplier/recipe/create" className="mr-2">
                        <Button className="mb-2 mb-sm-0">
                          <i className="fa fa-plus mr-2"></i>
                          {trans("Create Recipe")}{" "}
                        </Button>
                      </Link>
                      <button
                        className="btn btn-warning mr-2 mb-2 mb-sm-0"
                        onClick={() => setOpenCSV(!openCSV)}
                      >
                        {trans("Import CSV")}{" "}
                      </button>
                      <button
                        className="btn btn-success mr-2 mr-sm-0"
                        onClick={() => downloadCSV()}
                      >
                        {trans("Export CSV")}{" "}
                      </button>
                    </Col>
                  )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataGrid
                columns={columns}
                rows={RecipeAllListData}
                checkboxSelection={true}
                selectionModelDeleteButton={selectionModelDeleteButton}
                onSelectionModelChange={(ids) => {
                  setSelectionModelDeleteButton(ids.length > 0 ? true : false);
                  setBulkSelectionDeleteIds(ids);
                }}
                onClickSelectionModelDeleteButton={
                  handleOnClickSelectionModelDeleteButton
                }
              />
            </CardBody>
            <Modal
              isOpen={openCSV}
              toggle={() => setOpenCSV(!openCSV)}
              centered
            >
              <ModalHeader toggle={() => setOpenCSV(!openCSV)}>
                {trans("Import CSV file")}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm="12">
                    <Card>
                      <CardBody>
                        <Form
                          id="form1"
                          className="needs-validation"
                          noValidate=""
                          onSubmit={handleSubmit(SubmitCSV)}
                        >
                          <div className="form-row">
                            <Col md="12 mb-3">
                              <Label htmlFor="validationCustom02">
                                {trans("Upload file")} *
                              </Label>
                              <Input
                                className="form-control"
                                name="csv_file"
                                type="file"
                                accept=".csv"
                                onChange={(e) => uploadCSV(e)}
                                innerRef={register({
                                  required: true,
                                  pattern: /(.*?)\.(csv)$/,
                                })}
                              />
                              <span>
                                {errors.csv_file?.type == "required" &&
                                  trans("field is required")}
                                {errors.csv_file?.type == "pattern" &&
                                  trans("Only CSV file can be uploaded")}
                              </span>
                            </Col>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-between">
                <Button color="success" type="submit" form="form1">
                  {trans("Upload")}
                </Button>
                <Button onClick={() => setOpenCSV(!openCSV)} color="danger">
                  {trans("Cancel")}
                </Button>
              </ModalFooter>
            </Modal>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default RecipeList;
