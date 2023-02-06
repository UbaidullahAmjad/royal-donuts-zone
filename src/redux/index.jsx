import { combineReducers } from "redux";

import Customizer from "./customizer/reducer";

import tokenAvailable from "./tokens/token/reducer";
import tokenExpiry from "./tokens/tokenexpire/reducer";

import UserData from "./LoginUserData/reducer";

import SupplierCustomer from "./supplier_customer/reducer";

import AUTH_USER_TOKEN from "./tokens/user_auth_token/reducer";
import getStoresData from "./user_stores/storeReducer";

import ProductRecipeReducer from "./ProductReceipe/reducer";

import setDashboardDetails from "./Pages/Dashboard/reducers";
import StoresRevenueReducer from "./Pages/Dashboard/StoresRevenue/reducers"

import ProductsReducer from "./Pages/ProductManagement/Products/reducers"
import CategoriesReducer from "./Pages/ProductManagement/Categories/reducers"
import IngredientsReducer from "./Pages/ProductManagement/Ingredients/reducers"
import IngredientsCategories from "./Pages/ProductManagement/IngredientsCategories/reducers"
import LayersReducer from "./Pages/ProductManagement/Layers/reducers"
import AllergensReducer from "./Pages/ProductManagement/Allergens/reducers"

import CarouselReducer from "./Pages/Cms/HomeSettings/Carousel/Carousel_reducer";
import PagesReducer from "./Pages/Cms/Pages/reducers";
import StoresDescriptionReducer from "./Pages/Cms/HomeSettings/FindStore/reducers";
import InstagramDataReducer from "./Pages/Cms/HomeSettings/Instagram/reducers"
import TestimonialsReducer from "./Pages/Cms/HomeSettings/Testimonials/reducers"

import StoresReducer from "./Pages/Franchise_Store/Stores/reducers"
import SupplierCustomersReducer from "./Pages/Franchise_Store/SupplierCustomers/reducers"

import SalesOrdersReducer from "./Pages/OnlineSales/SalesOrders/reducers"
import CouponsReducer from "./Pages/OnlineSales/Coupons/reducers"
import SalesCustomersReducer from "./Pages/OnlineSales/SalesCustomers/reducers"

import LogsReducer from "./Pages/PurchaseModule/Logs/reducers"
import EmailsReducer from "./Pages/PurchaseModule/Emails/reducers"
import SuppliersOrdersReducer from "./Pages/PurchaseModule/SupplierOrders/reducers"

import LeadsReducer from "./Pages/LeadGeneration/Leads/reducers"

import SupplierOrderModifiyReducer from "../redux/Pages/SupplierCustomer/CustomerOrders/Modify/SupplierOrderModifiyReducer"
import RectifyReducer from "../redux/Pages/SupplierCustomer/Rectify/RectifyReducer";
import SuppllierCustomerCartReducer from "../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartReducer";

import GeneralSettingsReducer from "./SettingsPanel/GlobalSettings/GeneralSettings/reducers"
import ZeltySettingsReducer from "./SettingsPanel/GlobalSettings/ZeltySetting/reducers"
import StripePaymentReducer from "./SettingsPanel/GlobalSettings/StripePayment/reducers"
import PaypalPaymentReducer from "./SettingsPanel/GlobalSettings/PaypalPayment/reducers"

import EcommerceSeoReducer from "./SettingsPanel/SeoManagement/EcommerceSeo/reducers"

import SupplierRulesReducer from "./SettingsPanel/OrderManagement/Rules/reducers"
import AssociateRulesReducer from "./SettingsPanel/OrderManagement/AssociateRules/reducers"
import UnitsReducer from "./SettingsPanel/OrderManagement/Units/reducers"
import ShippingCompaniesReducer from "./SettingsPanel/OrderManagement/ShippingCompanies/reducers"
import SuppliersReducer from "./SettingsPanel/OrderManagement/Suppliers/reducers"

import SupplierEmailFooterReducer from "./SettingsPanel/PurchaseModule/SupplierEmailFooter/reducers"
import GalleryImagesReducer from "./SettingsPanel/PurchaseModule/GalleryImages/reducers"

import StageFormsReducer from "./SettingsPanel/LeadManagement/StageForms/reducers"
import LeadFormsReducer from "./SettingsPanel/LeadManagement/LeadForms/reducers"

import SupplierAdminsReducer from "./SettingsPanel/RolesManagement/SupplierAdmins/reducers"
import RolesReducer from "./SettingsPanel/RolesManagement/Roles/reducers"

import UserProfileReducer from "./UserProfile/reducer";

const reducers = combineReducers({
  Customizer,
  tokenAvailable,
  tokenExpiry,
  user_data: UserData,
  SupplierCustomer: SupplierCustomer,
  getStoresData: getStoresData,
  get_user_token: AUTH_USER_TOKEN,
  recipe: ProductRecipeReducer,
  userProfile: UserProfileReducer,
  /** ----------- Dashboard -------------- */
  setDashboardDetails,
  getStoresRevenue: StoresRevenueReducer,
  /** ----------- Product Management -------------- */
  getProducts: ProductsReducer,
  getCategories: CategoriesReducer,
  getIngredients: IngredientsReducer,
  getIngredientsCategories: IngredientsCategories,
  getLayers: LayersReducer,
  getAllergens: AllergensReducer,
  /** ----------- CMS -------------- */
  carousel: CarouselReducer,
  getPages: PagesReducer,
  getStoresDescription: StoresDescriptionReducer,
  getInstagramToken: InstagramDataReducer,
  getTestimonials: TestimonialsReducer,
  /** ----------- Franchise/Store -------------- */
  getStores: StoresReducer,
  getSupplierCustomers: SupplierCustomersReducer,
  /** ----------- Online Stores -------------- */
  getSalesOrders: SalesOrdersReducer,
  getCoupons: CouponsReducer,
  getSalesCustomers: SalesCustomersReducer,
  /** ----------- Purchase Module -------------- */
  getBackLogs: LogsReducer,
  getEmails: EmailsReducer,
  getSuppliersOrders: SuppliersOrdersReducer,
  /** ----------- Lead Generation -------------- */
  getLeads: LeadsReducer,
  /** ----------- Supplier Customer -------------- */
  getSupplierOrderModifiy: SupplierOrderModifiyReducer,
  getRectifyData: RectifyReducer,
  getSuppllierCustomerCartData: SuppllierCustomerCartReducer,
  /** ****************** Settings Panel ******************* */
  /** ----------- General Settings -------------- */
  getGeneralSettings: GeneralSettingsReducer,
  getZeltySettings: ZeltySettingsReducer,
  getStripePayment: StripePaymentReducer,
  getPaypalPayment: PaypalPaymentReducer,
  getEcommerceSeo: EcommerceSeoReducer,
  /** ----------- Order Management -------------- */
  getSupplierRules: SupplierRulesReducer,
  getAssociateRules: AssociateRulesReducer,
  getUnits: UnitsReducer,
  getShippingCompanies: ShippingCompaniesReducer,
  getSuppliers: SuppliersReducer,
  /** ----------- Purchase Module -------------- */
  getSupplierEmailFooter: SupplierEmailFooterReducer,
  getGalleryImages: GalleryImagesReducer,
  /** ----------- Lead Management -------------- */
  getStageForms: StageFormsReducer,
  getLeadForms: LeadFormsReducer,
  /** ----------- Role Management -------------- */
  getSupplierAdmins: SupplierAdminsReducer,
  getRoles: RolesReducer,
  // ---------------------
});

export default reducers;
