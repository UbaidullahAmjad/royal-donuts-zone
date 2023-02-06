import { combineReducers } from "redux";
// import addToCart from '../reducers/cartReducer'
import tokenExpiry from './Tokens/tokenexpiryReducer'
import tokenAvailable from './Tokens/tokenReducer'
import testimonialsReducers from './HomePage/Testimonials/testimonialsReducers'
import getStoreListData from './StoreList/storeListReducer'
import specificStoreData from './StoreList/Map/mapReducers'
import storeData from './SingleStore/singleStoreReducers'
import summaryData from './CheckOut/checkOutReducers'
import productsReducer from "./ProductList/productsReducer"
import categoriesReducer from "./ProductList/categoriesReducer"
import categoriesProdsReducer from "./ProductList/categoriesProdsReducer"
import myCartReducer from "./CartPage/myCartReducer"
import checkoutFormReducer from "./CheckOut/checkOutFormReducer"
import getSettingsData from './homeSettings/homeSettingReducer'
import EccomSeoReducer from "./HomePage/Main/EccomSeoReducer"
import HomeImagesReducer from "./HomePage/Main/HomeImagesReducer"
import SpecialProductsReducer from "./HomePage/Products/SpecialProductsReducer"
import HomeStoresReducer from "./HomePage/Store/HomeStoresReducer"
import PagesReducer from "./Footer/PagesReducer"
import DashboardData from "./Dashboard/DashboardDataReducer"
import PageContentReducer from "./PageContent/PageContentReducer"
import ProductDetailReducer from "./ProductDetail/ProductDetailReducer"
import HomeCarouselReducer from "./HomePage/HeaderContent/HomeCarouselReducer"
import PaypalPaymentReducer from "./CheckOut/PaymentMethod/Paypal/PaypalPaymentReducer"
import StripePaymentReducer from "./CheckOut/PaymentMethod/Stripe/StripePaymentReducer"
import CheckoutGetUserReducer from "./CheckOut/CheckOutUser/CheckoutGetUserReducer"
import StripeEmailCheckReducer from "./CheckOut/PaymentMethod/Stripe/StripeEmailCheckReducer"

const reducer = combineReducers({
  myProductsCart: myCartReducer,
  tokenAvailable,
  tokenExpiry,
  testimonialsReducers,
  getStoreListData,
  specificStoreData,
  storeData,
  summaryData,
  /** ********************************* */
  allProducts: productsReducer,
  allCategories: categoriesReducer,
  allCategoriesProds: categoriesProdsReducer,
  checkoutForm: checkoutFormReducer,
  getSettingsData,
  /** ********************************* */
  getEccomSeo: EccomSeoReducer,
  getHomeImages: HomeImagesReducer,
  getSpecialProducts: SpecialProductsReducer,
  getHomeStores: HomeStoresReducer,
  getPages: PagesReducer,
  getDashboardData: DashboardData,
  getPageContent: PageContentReducer,
  getProductDetail: ProductDetailReducer,
  getHomeCarousel: HomeCarouselReducer,
  /** ********************************* */
  getPaypalData: PaypalPaymentReducer,
  getStripeData: StripePaymentReducer,
  getCheckoutGetUser: CheckoutGetUserReducer,
  getStripeEmailCheck: StripeEmailCheckReducer,
})
export default reducer;
