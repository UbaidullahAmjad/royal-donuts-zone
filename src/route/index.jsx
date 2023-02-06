/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
// dashbaord
import UserDashboard from "../Pages/Dashboard/UserDashboard";

// ------------------------- Site Settings ---------------------------------------
import InstaUserName from "../components/custom-forms/homeSettings/instaUserName";
import CurserSection from "../components/custom-forms/homeSettings/curserSection";
import FindStore from "../Pages/Cms/home-settings/findStore";
import GalleryImages from "../components/custom-forms/homeSettings/GalleryImages";
import ConfigureSection from "../components/custom-forms/homeSettings/configureSection";
import FloatingBox from "../components/custom-forms/homeSettings/floatingBox";
// import PackagesSection from "../components/custom-forms/homeSettings/packagesSection";
import NavBar from "../components/custom-forms/homeSettings/navBar";
import ImagesLimit from "../Pages/Cms/home-settings/imageLimit";
import PaypalPayment from "../components/SettingsPanel/GlobalSettings/PaypalPayment";

// -------------------------- Ecommerce --------------------------------------------
// Product
import CreateProduct from "../Pages/ProductsManagement/products/createProduct";
import Products from "../Pages/ProductsManagement/products/productsList";
import EditEcommerceProduct from "../Pages/ProductsManagement/products/editProduct";

//Modifier

//POS Drafts

// Category
import Categories from "../Pages/ProductsManagement/categories/categories";
import CreateCategory from "../Pages/ProductsManagement/categories/CreateCategory";
import EditEcommerceCategory from "../Pages/ProductsManagement/categories/editCategory";

//Layer Management
import LayerManagement from "../Pages/ProductsManagement/layers/layerManagement";
import CreateCouches from "../Pages/ProductsManagement/layers/CreateCouches";
import EditEcommerceCouches from "../Pages/ProductsManagement/layers/EditCouches";

//Allergen
import AllergeneTable from "../Pages/ProductsManagement/allergens/allergeneTable";
import CreateAllergene from "../Pages/ProductsManagement/allergens/createAllergene";
import EditEcommerceAllergene from "../Pages/ProductsManagement/allergens/editAllergene";

//Stores
import Stores from "../Pages/Franchise_Store/stores/stores";
import CreateMagasin from "../Pages/Franchise_Store/stores/createMagasin";
import EditEcommerceStore from "../Pages/Franchise_Store/stores/editMagasin";

// all orders
import AllOrders from "../components/apiData/supplierApiData/allOrders";
import GeneratedMail from "../components/apiData/supplierApiData/generatedMail";
import SupplideAllOrders from "../Pages/PurchaseModule/supplier-orders/SupplideAllOrders";

//Coupons
import CoupenList from "../Pages/OnlineSales/coupons/coupenList";
import CreateCoupen from "../Pages/OnlineSales/coupons/createCoupen";
import EditEcommerceCoupon from "../Pages/OnlineSales/coupons/editCoupen";

//Orders
import OpenOrders from "../components/apiData/openOrders";
import DeliveredOrders from "../components/apiData/deliveredOrders";
import AdminOrderInvoice from "../Pages/OnlineSales/orders/OrderInvoice";
import EccomAllOrders from "../Pages/OnlineSales/orders/EccomAllOrders";

//Product Recipe
import ProductRecipe from "../components/custom-forms/supplier-forms/supplier_recipe/receipe";
import ProductRecipeList from "../components/custom-forms/supplier-forms/supplier_recipe/show-recipe";
import ProductRecipeEdit from "../components/custom-forms/supplier-forms/supplier_recipe/edit-receipe";

//POS ORDERS

//Pages
import PageList from "../Pages/Cms/pages/pageList";
import CreatePage from "../Pages/Cms/pages/createPage";
import EditEcommercePage from "../Pages/Cms/pages/editPage";

// -----------------------------------------------------------------------------------

// --------------------------- Supplier ---------------------------------------------

// Product
import SupplierProducts from "../Pages/ProductsManagement/ingredients/SupplierProducts";
import CreateSupplierProducts from "../Pages/ProductsManagement/ingredients/CreateSupplierProducts";
import EditSupplierProducts from "../Pages/ProductsManagement/ingredients/EditSupplierProducts";
//

//Category
import SupplierCategories from "../Pages/ProductsManagement/ingredients-categories/supplierCategories";
import CreateSupplierCategory from "../Pages/ProductsManagement/ingredients-categories/CreateSupplierCategory";
import EditSupplierCategory from "../Pages/ProductsManagement/ingredients-categories/editSupplierCategory";

//Supplier Units
import SupplierUnits from "../components/SettingsPanel/OrderManagement/Units/SupplierUnits";
import CreateSupplierUnit from "../components/SettingsPanel/OrderManagement/Units/CreateSupplierUnit";
import EditSupplierUnit from "../components/SettingsPanel/OrderManagement/Units/EditSupplierUnit";

// Suppliers Management
import SupplierList from "../components/SettingsPanel/OrderManagement/Suppliers/SupplierList";
import CreateSupplier from "../components/SettingsPanel/OrderManagement/Suppliers/CreateSupplier";
import EditSupplierList from "../components/SettingsPanel/OrderManagement/Suppliers/EditSupplierList";

// Customer Management
import SupplierCustomerList from "../Pages/Franchise_Store/supplier-customers/SupplierCustomerList";
import SupplierCustomerCreate from "../Pages/Franchise_Store/supplier-customers/SupplierCustomerCreate";
import EditSupplierCustomer from "../Pages/Franchise_Store/supplier-customers/EditSupplierCustomer";

// Rules Management
import SupplierRules from "../components/SettingsPanel/OrderManagement/Rules/SupplierRules";
import CreateSupplierRule from "../components/SettingsPanel/OrderManagement/Rules/CreateSupplierRule";
import EditSupplierRules from "../components/SettingsPanel/OrderManagement/Rules/EditSupplierRules";

//Supplier Rule Association Management

import CreateSupplierAssociateRule from "../components/SettingsPanel/OrderManagement/AssociateRules/CreateSupplierAssociateRule";
import SupplierAssociateRules from "../components/SettingsPanel/OrderManagement/AssociateRules/SupplierAssociateRules";
import EditSupplierAssociateRule from "../components/SettingsPanel/OrderManagement/AssociateRules/EditSupplierAssociateRule";

// Delivery Company Management
import DeliveryCompanies from "../components/SettingsPanel/OrderManagement/ShippingCompanies/DeliveryCompanies";
import CreateDeliveryCompany from "../components/SettingsPanel/OrderManagement/ShippingCompanies/CreateDeliveryCompany";
import EditDeliveryCompany from "../components/SettingsPanel/OrderManagement/ShippingCompanies/EditDeliveryCompany";

// Email
import EmailHistory from "../Pages/PurchaseModule/email/emailHistory";
import SupplierEmailHeader from "../components/custom-forms/supplier-forms/SupplierEmailHeader";
import SupplierEmailFooter from "../components/SettingsPanel/PurchaseModule/SupplierEmailFooter";

import SupplierBackups from "../components/apiData/supplierApiData/supplierBackups";

//BackLogs
import SupplierBacklogs from "../Pages/PurchaseModule/logs/supplierBacklogs";

//Calendar
import SupplierCalendar from "../Pages/PurchaseModule/calendar/customCalendar";

// --------------------------- Role Management --------------------------------------

// Admins for assigning role
import SupplierAdmins from "../components/SettingsPanel/RolesManagement/SupplierAdmins/SupplierAdmins";
import CreateSupplierAdmin from "../components/SettingsPanel/RolesManagement/SupplierAdmins/CreateSupplierAdmin";
import EditSupplierAdmin from "../components/SettingsPanel/RolesManagement/SupplierAdmins/EditSupplierAdmin";

//Manage Role Routes
import RolesManagementList from "../components/SettingsPanel/RolesManagement/Roles/RolesManagementList";
import CreateRoleManagement from "../components/SettingsPanel/RolesManagement/Roles/CreateRoleManagement";
import EditRoleManagement from "../components/SettingsPanel/RolesManagement/Roles/EditRoleManagement";
import Testimonials from "../Pages/Cms/home-settings/testimonials";

//-------------------------------------------------------------------------------------

// --------------------------- Customer Supplier Dashboard ----------------------------

import CustomerSuppliers from "../Pages/SupplierCustomer/CustomerSuppliers";
import CustomerSupplierProducts from "../Pages/SupplierCustomer/CustomerSupplierProducts";
import CustomerCart from "../Pages/SupplierCustomer/CustomerCart";
import CustomerEditSupplierProducts from "../Pages/SupplierCustomer/EditSupplierCart/EditSupplierCart";
import CustomerOrder from "../Pages/SupplierCustomer/CustomerOrders/Customer_Orders";
import CustomerInvoice from "../Pages/SupplierCustomer/CustomerOrders/CustomerInvoice";
import SupplierOrderSummary from "../Pages/PurchaseModule/supplier-orders/supplierOrderSummary";
import SupplierOrderTokenVerification from "../Pages/SupplierCustomer/CustomerOrders/Modify/SupplierOrderTokenVerification";

// Rectify Order
import RectifyOrders from "../Pages/SupplierCustomer/RectifyOrders/RectifyOrderCart";
import RectifyOrdersView from "../Pages/SupplierCustomer/RectifyOrders/RectifyOrderCartView";
import EditRectifyOrder from "../Pages/SupplierCustomer/RectifyOrders/editSupplierRectifyOrder/EditRectifyOrder";

// ----------------- Create Leads Forms -----------------
import ListStageForms from "../components/SettingsPanel/LeadManagement/StageForms/ListStageForms";
import CreateStageForm from "../components/SettingsPanel/LeadManagement/StageForms/CreateStageForm";
import EditStageForm from "../components/SettingsPanel/LeadManagement/StageForms/EditStageForm";
import ViewStageForms from "../components/SettingsPanel/LeadManagement/StageForms/EditStageForm";

// ----------------- Leads Dashboard -----------------
import CreateLeads from "../Pages/LeadGeneration/Leads/CreateLeads";
import LeadsListing from "../Pages/LeadGeneration/Leads/LeadsListing";
import EditLeads from "../Pages/LeadGeneration/Leads/EditLeads";
import ViewLeads from "../Pages/LeadGeneration/Leads/ViewLeads";
//-------------------------------------------------------------------------------------

// ---------------------- Instagram ----------------------
import Instagram from "../components/Instagram/instagram";
import Inquiry from "../components/inquiry/inquiry";
import Profile from "../components/inquiry/profile";
import Chat from "../Pages/LeadGeneration/Chat/Chat";
import EcomCustomers from "../Pages/OnlineSales/SalesCustomers/EcomCustomers";

import EditEcomCustomers from "../Pages/OnlineSales/SalesCustomers/EditEcomCustomers";
import CreateEcomCustomers from "../Pages/OnlineSales/SalesCustomers/CreateEcomCustomers";

import CreateLeadForm from "../components/SettingsPanel/LeadManagement/LeadForms/CreateLeadForm";
import EditLeadForm from "../components/SettingsPanel/LeadManagement/LeadForms/EditLeadForm";
import LeadFormsListing from "../components/SettingsPanel/LeadManagement/LeadForms/LeadFormsListing";
import ViewLeadForm from "../components/SettingsPanel/LeadManagement/LeadForms/ViewLeadForm";
// import UserDashboard from "../components/user-dashboard/UserDashboard";

// -------------------- Settings --------------------
import AdminSeo from "../components/SettingsPanel/SeoManagement/AdminSeo";
import EcommerceSeo from "../components/SettingsPanel/SeoManagement/EcommerceSeo";

import Signin from "../auth/signin";
import EmailVerification from "../auth/EmailVerification";
import ChangePassword from "../auth/ChangePassword";
import BeforeLead from "../components/crm/Before-lead/BeforeLead";
import StripePayment from "../components/SettingsPanel/GlobalSettings/stripePayment";
import LeadsMap from "../Pages/LeadGeneration/LeadsMap/LeadsMap";
import HomeSettings from "../components/SettingsPanel/GlobalSettings/GeneralSettings";
import ZeltySetting from "../components/SettingsPanel/GlobalSettings/ZeltySetting";
import GlobalSettings from "../components/SettingsPanel/GlobalSettings/GlobalSettings";

import CarouselSettings from "../Pages/Cms/home-settings/CarouselSettings";
import HomepageSetting from "../Pages/Cms/home-settings/HomepageSetting";
import SeoManagment from "../components/SettingsPanel/SeoManagement/SeoManagment";
import OrderManagement from "../components/SettingsPanel/OrderManagement/OrderManagement";
import PurchaseModule from "../components/SettingsPanel/PurchaseModule/PurchaseModule";
import LeadManagement from "../components/SettingsPanel/LeadManagement/LeadManagement";
import RoleManagement from "../components/SettingsPanel/RolesManagement/RoleManagement";
import UserProfile from "../components/UserProfile/UserProfile";
// import CreateNewProduct from "../components/custom-forms/CreateCategory/create-product/CreateNewProduct";
// import EditEcomProduct from "../components/custom-forms/CreateCategory/edit-product/EditEcomProduct";

const role = atob(localStorage.getItem("role"));
const permission = atob(localStorage.getItem("permissions"));

export const routes = [
  // { path: "/ui-kits/accordion", Component: Accordian },
  { path: "/login", Component: Signin },
  { path: "/email/verification", Component: EmailVerification },
  { path: "/change/password/:token/:id", Component: ChangePassword },
  { path: "/dashboard/default", Component: UserDashboard },
  {
    path: "/before-lead",
    Component: BeforeLead,
  },
  {
    path: "/lead/forms/create",
    Component: CreateLeadForm,
  },
  {
    path: "/lead/forms/list",
    Component: LeadFormsListing,
  },
  {
    path: "/lead/forms/edit/:idd",
    Component: EditLeadForm,
  },
  {
    path: "/lead/forms/view/:idd",
    Component: ViewLeadForm,
  },
  {
    path: "/crm/Before-lead/BeforeLead",
    Component: BeforeLead,
  },

  // --------------------- Chart--------------------------------

  //--------------------- PROFILE -------------------------------

  { path: "/user-profile", Component: UserProfile },

  // --------------------- Ecommerce --------------------------------
  {
    ...(role == "SuperAdmin" && {
      path: "/ecommerce/products/create",
      Component: CreateProduct,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/ecommerce/products/edit/:idd",
      Component: EditEcommerceProduct,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Products") != null) && {
      path: "/ecommerce/products/list",
      Component: Products,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/supplier/orders/invoice/:idd",
      Component: SupplierOrderSummary,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null)) && {
      path: "/ecommerce/products/create",
      Component: CreateProduct,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("edit") != null)) && {
      path: "/ecommerce/products/edit/:idd",
      Component: EditEcommerceProduct,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Categories") != null) && {
      path: "/ecommerce/categories/list",
      Component: Categories,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("create") != null)) && {
      path: "/ecommerce/categories/create",
      Component: CreateCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("edit") != null)) && {
      path: "/ecommerce/categories/edit/:idd",
      Component: EditEcommerceCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Layers") != null) && {
      path: "/layers/list",
      Component: LayerManagement,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Layers") != null &&
        permission.match("create") != null)) && {
      path: "/layers/create",
      Component: CreateCouches,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Layers") != null &&
        permission.match("edit") != null)) && {
      path: "/layers/edit/:idd",
      Component: EditEcommerceCouches,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Allergen") != null) && {
      path: "/allergens/list",
      Component: AllergeneTable,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Allergen") != null &&
        permission.match("create") != null)) && {
      path: "/allergens/create",
      Component: CreateAllergene,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Allergen") != null &&
        permission.match("edit") != null)) && {
      path: "/allergens/edit/:idd",
      Component: EditEcommerceAllergene,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Store") != null) && {
      path: "/stores/list",
      Component: Stores,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("EcomCustomers") != null) && {
      path: "/ecommerce/customers/list",
      Component: EcomCustomers,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("EditEcomCustomers") != null) && {
      path: "/ecommerce/customers/edit/:id",
      Component: EditEcomCustomers,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("EditEcomCustomers") != null) && {
      path: "/ecommerce/customers/create",
      Component: CreateEcomCustomers,
    }),
  },

  {
    ...((role == "Lead" || permission.match("Inquiry") != null) && {
      path: "/inquiry/view",
      Component: Inquiry,
    }),
  },
  {
    ...((role == "Lead" || permission.match("Profile") != null) && {
      path: "/lead/profile",
      Component: Profile,
    }),
  },
  {
    ...((role == "Lead" ||
      role == "SuperAdmin" ||
      permission.match("Chat") != null) && {
      path: "/chat/app",
      Component: Chat,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Store") != null &&
        permission.match("create") != null)) && {
      path: "/stores/create",
      Component: CreateMagasin,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Store") != null &&
        permission.match("edit") != null)) && {
      path: "/stores/edit/:idd",
      Component: EditEcommerceStore,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Coupon") != null) && {
      path: "/coupens/list",
      Component: CoupenList,
    }),
  },

  {
    ...((role == "SuperAdmin" ||
      (permission.match("Coupon") != null &&
        permission.match("create") != null)) && {
      path: "/coupens/create",
      Component: CreateCoupen,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Coupon") != null &&
        permission.match("edit") != null)) && {
      path: "/coupens/edit/:idd",
      Component: EditEcommerceCoupon,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Pages") != null) && {
      path: "/cms/pages/list",
      Component: PageList,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/cms/homepage/list",
      Component: HomepageSetting,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Pages") != null &&
        permission.match("create") != null)) && {
      path: "/cms/pages/create",
      Component: CreatePage,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Pages") != null &&
        permission.match("edit") != null)) && {
      path: "/cms/pages/edit/:idd",
      Component: EditEcommercePage,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("open_order") != null) && {
      path: "/apiData/openOrders",
      Component: OpenOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("delivered_order") != null) && {
      path: "/apiData/deliveredOrders",
      Component: DeliveredOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("open_order") != null) && {
      path: "/ecommerce/orders/list",
      Component: EccomAllOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("open_order") != null ||
      permission.match("delivered_order")) && {
      path: "/ecommerce/orders/view/:idd",
      Component: AdminOrderInvoice,
    }),
  },

  // { path:"/ecommerce/products/list", Component: CreateProduct},

  // ----------------------------- SUPPLIER ----------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Calendar") != null) && {
      path: "/supplier/calendar/view",
      Component: SupplierCalendar,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Products") != null) && {
      path: "/supplier/products/list",
      Component: SupplierProducts,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/products/create",
      Component: CreateSupplierProducts,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/products/edit/:idd",
      Component: EditSupplierProducts,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Categories") != null) && {
      path: "/supplier/categories/list",
      Component: SupplierCategories,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/categories/create",
      Component: CreateSupplierCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/categories/edit/:idd",
      Component: EditSupplierCategory,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("All_Orders") != null) && {
      path: "/apiData/supplierApiData/allOrders",
      Component: AllOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/apiData/supplierApiData/allOrders/:idd",
      Component: GeneratedMail,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/supplier/orders/list",
      Component: SupplideAllOrders,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Units") != null) && {
      path: "/units/list",
      Component: SupplierUnits,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Units") != null &&
        permission.match("create") != null)) && {
      path: "/units/create",
      Component: CreateSupplierUnit,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Units") != null &&
        permission.match("edit") != null)) && {
      path: "/units/edit/:idd",
      Component: EditSupplierUnit,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Customers") != null) && {
      path: "/supplier/customers/list",
      Component: SupplierCustomerList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Customers") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/customers/create",
      Component: SupplierCustomerCreate,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Customers") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/customers/edit/:idd",
      Component: EditSupplierCustomer,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Suppliers") != null) && {
      path: "/suppliers/list",
      Component: SupplierList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Suppliers") != null &&
        permission.match("create") != null)) && {
      path: "/suppliers/create",
      Component: CreateSupplier,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Suppliers") != null &&
        permission.match("edit") != null)) && {
      path: "/suppliers/edit/:idd",
      Component: EditSupplierList,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Suppliers") != null) && {
      path: "/suppliers/email/header/:idd",
      Component: SupplierEmailHeader,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("DeliveryCompanies") != null) && {
      path: "/delivery/companies/list",
      Component: DeliveryCompanies,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("DeliveryCompanies") != null &&
        permission.match("create") != null)) && {
      path: "/delivery/companies/create",
      Component: CreateDeliveryCompany,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("DeliveryCompanies") != null &&
        permission.match("edit") != null)) && {
      path: "/delivery/companies/edit/:idd",
      Component: EditDeliveryCompany,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Rules") != null) && {
      path: "/supplier/rules/list",
      Component: SupplierRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Rules") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/rules/create",
      Component: CreateSupplierRule,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Rules") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/rules/edit/:idd",
      Component: EditSupplierRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("Associate Rule") != null) && {
      path: "/associate/rules/list",
      Component: SupplierAssociateRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Associate Rule") != null &&
        permission.match("create") != null)) && {
      path: "/associate/rules/create",
      Component: CreateSupplierAssociateRule,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Associate Rule") != null &&
        permission.match("edit") != null)) && {
      path: "/associate/rules/edit/:idd",
      Component: EditSupplierAssociateRule,
    }),
  },

  // {
  //   path: "/apiData/supplierApiData/supplierBackups",
  //   Component: SupplierBackups,
  // },

  {
    ...((role == "SuperAdmin" || permission.match("Backlogs") != null) && {
      path: "/supplier/backlogs/list",
      Component: SupplierBacklogs,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("EmailSettings") != null) && {
      path: "/supplier/email/history",
      Component: EmailHistory,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("EmailSettings") != null) && {
      path: "/supplier/email/footer",
      Component: SupplierEmailFooter,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/create",
      Component: ProductRecipe,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/list",
      Component: ProductRecipeList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/edit/:idd",
      Component: ProductRecipeEdit,
    }),
  },

  // --------------------------- MANAGE ROLES -----------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/supplier/admins/list",
      Component: SupplierAdmins,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Admins") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/admins/create",
      Component: CreateSupplierAdmin,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Admins") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/admins/edit/:idd",
      Component: EditSupplierAdmin,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("ManageRoles") != null) && {
      path: "/settings/manage/roles/list",
      Component: RolesManagementList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("ManageRoles") != null &&
        permission.match("create") != null)) && {
      path: "/settings/manage/roles/create",
      Component: CreateRoleManagement,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("ManageRoles") != null &&
        permission.match("edit") != null)) && {
      path: "/settings/manage/roles/edit/:idd",
      Component: EditRoleManagement,
    }),
  },

  // {
  //   path: "/custom-forms/homeSettings/instaUserName",
  //   Component: InstaUserName,
  // },
  // {
  //   path: "/custom-forms/homeSettings/curserSection",
  //   Component: CurserSection,
  // },

  //----------------------- SITE SETTINGS ------------------------------------------

  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/general-settings",
      Component: GlobalSettings,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/SeoManagment",
      Component: SeoManagment,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/carousel-settings",
      Component: CarouselSettings,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/zelty/key",
      Component: ZeltySetting,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("find_store") != null) && {
      path: "/site/settings/store/description",
      Component: FindStore,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Config") != null) && {
      path: "/custom-forms/homeSettings/configureSection",
      Component: ConfigureSection,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Order-Management/OrderManagement",
      Component: OrderManagement,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Purchase-Module/PurchaseModule",
      Component: PurchaseModule,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Lead-Management/LeadManagement",
      Component: LeadManagement,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Role-Management/RoleManagement",
      Component: RoleManagement,
    }),
  },
  // {
  //   path: "/custom-forms/homeSettings/floatingBox",
  //   Component: FloatingBox,
  // },
  // {
  //   ...((role == "SuperAdmin" || permission.match("Package") != null) && {
  //     path: "/custom-forms/homeSettings/packagesSection",
  //     Component: PackagesSection,
  //   }),
  // },
  // {
  //   ...((role == "SuperAdmin" || permission.match("Package") != null) && {
  //     path: "/custom-forms/homeSettings/packagesSection",
  //     Component: PackagesSection,
  //   }),
  // },
  {
    ...((role == "SuperAdmin" || permission.match("Testimonial") != null) && {
      path: "/site/settings/testimonials",
      Component: Testimonials,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Testimonial") != null) && {
      path: "/site/settings/home/images",
      Component: ImagesLimit,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("payments") != null) && {
      path: "/site/settings/payments/stripe",
      Component: StripePayment,
    }),
  },

  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/payments/paypal",
      Component: PaypalPayment,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/home/gallery_images",
      Component: GalleryImages,
    }),
  },

  // { path: "/custom-forms/homeSettings/navBar", Component: NavBar },

  //-----------------------------------------------------------------------------------------------

  //--------------------- CUSTOMER SUPPLIER DASHBOARD ---------------------------------------------

  {
    ...(role == "Supplier_Customer" && {
      // path: "/customer-suppliers/customerSuppliers",
      path: "/suppliers/customer/products/list",
      Component: CustomerSuppliers,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierProducts/:idd",
      path: "/suppliers/customer/products/view/:idd",
      Component: CustomerSupplierProducts,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierCustomerCart",
      path: "/supplier_customers/cart/list",
      Component: CustomerCart,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierEditCustomerCart/:supplier_id",
      path: "/customer/suppliers/cart/edit/:supplier_id",
      Component: CustomerEditSupplierProducts,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierCustomerOrder",
      path: "/customer/suppliers/orders",
      Component: CustomerOrder,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/customer/suppliers/orders/view/:id",
      Component: CustomerInvoice,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierCustomerRectifyOrder",
      path: "/supplier_customers/rectify_orders/list",
      Component: RectifyOrders,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierCustomerRectifyOrderView/:id",
      path: "/customer/suppliers/rectify_orders/view/:id",
      Component: RectifyOrdersView,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      // path: "/supplierCustomerEditRectifyOrder/:supplier_id",
      path: "/customer/suppliers/rectify_orders/edit/:supplier_id",
      Component: EditRectifyOrder,
    }),
  },

  //--------------------- CRM - LEADS DASHBOARD ---------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/create",
      Component: CreateLeads,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/list",
      Component: LeadsListing,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/leads/map/view",
      Component: LeadsMap,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/edit/:id",
      Component: EditLeads,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/view/:id",
      Component: ViewLeads,
    }),
  },
  //-----------------------------------------------------------------------------------------------

  //--------------------- CRM - CREATE LEADS DASHBOARD ---------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/create",
      Component: CreateStageForm,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/lead-management/stage-forms/list",
      Component: ListStageForms,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/edit/:id",
      Component: EditStageForm,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/view/:id",
      Component: ViewStageForms,
    }),
  },

  //-----------------------------------------------------------------------------------------------

  //-------------------------- Settings --------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/settings/seo/admin",
      Component: AdminSeo,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/settings/seo/ecommerce",
      Component: EcommerceSeo,
    }),
  },

  // -------------------------- Eccom Modifiers --------------------------------

  // -------------------------- Eccom POS Drafts --------------------------------

  //-------------------------- DineIn Apis --------------------------
];
