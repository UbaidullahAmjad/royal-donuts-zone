import { combineReducers } from "redux";

import Customizer from "./customizer/reducer";

import tokenAvailable from "./tokens/token/reducer";
import tokenExpiry from "./tokens/tokenexpire/reducer";

import UserData from "./LoginUserData/reducer";

import SupplierCustomer from "./supplier_customer/reducer";

import AUTH_USER_TOKEN from "./tokens/user_auth_token/reducer";
import getStoresData from "./user_stores/storeReducer";

import ProductRecipeReducer from "./ProductReceipe/reducer";

import CarouselReducer from "./Carousel/Carousel_reducer";

const reducers = combineReducers({
  Customizer,
  tokenAvailable,
  tokenExpiry,
  user_data: UserData,
  SupplierCustomer: SupplierCustomer,
  getStoresData: getStoresData,
  get_user_token: AUTH_USER_TOKEN,
  recipe: ProductRecipeReducer,
  carousel: CarouselReducer,
});

export default reducers;
