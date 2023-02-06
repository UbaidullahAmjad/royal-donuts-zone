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
} from "reactstrap";
import { useState } from "react";
import DataGrid from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { URL } from "../../../../env";
import { translate } from "react-switch-lang";

const RecipeList = (props) => {
  const trans = props.t;

  // const [RecipeList, setRecipeList] = useState([]);
  const [RecipeAllListData, setRecipeAllListData] = useState([]);
  const [alert, setalert] = useState(false);

  const [AllIngredients, setAllIngredients] = useState([])

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
          console.log("result value", id);
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
  const columns = [
    { field: "id", headerName: "#", width: 100 },
    {
      field: "product_name", headerName: trans("NAME"), flex: 1, renderCell: (cellValues) => {
        return (cellValues.row.recipes.product_name)
      }
    },
    {
      field: "ingredients", headerName: trans("INGREDIENTS"), minWidth: 480, renderCell: (cellValues) => {
        return (
          <div>
            <div className="d-flex mb-1">
              <div>
                <Badge color="primary" pill>{trans("Ingredients")}</Badge>
              </div>
              <div style={{ marginLeft: 8, display: 'flex', flexWrap: 'wrap' }}>
                {
                  cellValues.row.product_ingredients ? cellValues.row.product_ingredients.map((pd_item, i) => (i <= 2 && <div className="px-1 mb-1" style={{ marginRight: 8, }}>
                    <span>
                      {
                        AllIngredients && AllIngredients.length > 0 && AllIngredients.find((ingred) => ingred.id == pd_item.ingredient_id).name
                      }
                      {
                        i < 2 && (i != cellValues.row.product_ingredients.length - 1) && ","
                      }
                      {
                        i >= 2 && (i != cellValues.row.product_ingredients.length - 1) && "..."
                      }
                    </span>
                  </div>)) : <span>{trans("empty")}</span>
                }
              </div>
            </div>
            {
              cellValues.row.extra_product_ingredients && <div className="d-flex">
                {
                  cellValues.row.extra_product_ingredients.map((ex_pd_item, i) => (i == 0 && i <= 1 &&  <div>
                    <Badge color="success" pill>{trans("Custom")}</Badge>
                  </div>))
                }
                <div style={{ marginLeft: 8, display: 'flex', flexWrap: 'wrap' }}>
                  {
                    cellValues.row.extra_product_ingredients && cellValues.row.extra_product_ingredients.map((ex_pd_item, i) => (i <= 1 && <div className="px-1 mb-1">
                      <span>
                        {ex_pd_item.name}
                        {
                          i < 1 && (i != cellValues.row.extra_product_ingredients.length - 1) && ","
                        }
                        {
                          i >= 1 && (i != cellValues.row.extra_product_ingredients.length - 1) && "..."
                        }
                      </span>
                    </div>))
                  }
                </div>
              </div>
            }
          </div>
        )
      }
    },
    {
      field: "action",
      headerName: trans("ACTION"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={
                  "/supplier/recipe/edit/" +
                  cellValues.row.recipes.id +
                  "/" +
                  "RD"
                }
              >
                <Button outline color="primary" className="ml-2 mr-2">
                  <i className="fa fa-edit" outline></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.row.recipes.id)}
              >
                {" "}
               <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const getAllIngredients = async () => {
    await axios
      .get(`${URL}/supplier_product`)
      .then((response) => {
        setAllIngredients(response.data.products)
      })
  }

  // console.log("response-getAllIngredients----", AllIngredients)


  useEffect(() => {
    getAllIngredients()
    // ------------
    const getList = async () => {
      const response = await axios.get(`${URL}/recipe`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("response-recipe----", response);
      const recipes = response.data.recipe;
      const prod_ingredients = response.data.product_ingredients_data;

      let all_recipes = [];
      recipes.map((prod_item, p_index) => {
        // console.log("recipes_map", prod_item)
        const pr_ingredients_list = prod_ingredients.map((p_ingred) => p_ingred.product_ingredients);
        const pr_ingredients = pr_ingredients_list.find((p_ingred, i) => i == p_index)
        const extra_pr_ingredients_list = prod_ingredients.map((p_ingred) => p_ingred.$extra_product_ingredients);
        const extra_pr_ingredients = extra_pr_ingredients_list.find((p_ingred, i) => i == p_index)
        all_recipes.push({ recipes: prod_item, product_ingredients: pr_ingredients, extra_product_ingredients: extra_pr_ingredients })
      })

      all_recipes.map((item, index) => (item["id"] = index + 1));
      setRecipeAllListData(all_recipes)
      console.log("all_recipes-temp----:", all_recipes)
    };

    getList();
  }, []);

  console.log("all_recipes-RecipeAllListData----:", RecipeAllListData)


  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/recipe/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_List = RecipeAllListData.filter((item) => item.recipes.id != id);
        const index_update = deleted_List;
        // index_update.map((item, index) => (item["index"] = index + 1));
        index_update.map((item, index) => (item["id"] = index + 1));
        setRecipeAllListData(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));
  console.log("supplier-list permissions:-", permissions);
  console.log("supplier-list role:-", role);

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("Recipe List")} />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <h5>{trans("Recipe List")}</h5>
                </Col>
                {(role == "SuperAdmin" ||
                  permissions.match("create") != null) && (
                    <Col className="text-right">
                      <Link to="/supplier/recipe/create/RD">
                        <Button>
                          <i className="fa fa-plus mr-2"></i>
                          {trans("Create Recipe")}{" "}
                        </Button>
                      </Link>
                    </Col>
                  )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataGrid columns={columns} rows={RecipeAllListData} height={100} />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};


export default translate(RecipeList);
