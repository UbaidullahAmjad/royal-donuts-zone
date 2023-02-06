/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
// dashbaord
import UserDashboard from "../components/user-dashboard/UserDashboard";

// ------------------------- Site Settings ---------------------------------------
import InstaUserName from "../components/custom-forms/homeSettings/instaUserName";
import CurserSection from "../components/custom-forms/homeSettings/curserSection";
import FindStore from "../components/custom-forms/homeSettings/findStore";
import GalleryImages from "../components/custom-forms/homeSettings/GalleryImages";
import ConfigureSection from "../components/custom-forms/homeSettings/configureSection";
import FloatingBox from "../components/custom-forms/homeSettings/floatingBox";
// import PackagesSection from "../components/custom-forms/homeSettings/packagesSection";
import NavBar from "../components/custom-forms/homeSettings/navBar";
import ImagesLimit from "../components/custom-forms/homeSettings/imageLimit";
import PaypalPayment from "../components/custom-forms/payments/PaypalPayment";

// -------------------------- Ecommerce --------------------------------------------
// Product
import CreateProduct from "../components/custom-forms/CreateCategory/createProduct";
import Products from "../components/apiData/productsList";
import EditEcommerceProduct from "../components/custom-forms/CreateCategory/editProduct";

//Modifier

//POS Drafts

// Category
import Categories from "../components/apiData/categories";
import CreateCategory from "../components/custom-forms/CreateCategory/CreateCategory";
import EditEcommerceCategory from "../components/custom-forms/CreateCategory/editCategory";

//Layer Management
import LayerManagement from "../components/apiData/layerManagement";
import CreateCouches from "../components/custom-forms/CreateCategory/Couches";
import EditEcommerceCouches from "../components/custom-forms/CreateCategory/EditCouches";

//Allergen
import AllergeneTable from "../components/apiData/allergeneTable";
import CreateAllergene from "../components/custom-forms/CreateCategory/createAllergene";
import EditEcommerceAllergene from "../components/custom-forms/CreateCategory/editAllergene";

//Stores
import Stores from "../components/apiData/stores";
import CreateMagasin from "../components/custom-forms/CreateCategory/createMagasin";
import EditEcommerceStore from "../components/custom-forms/CreateCategory/editMagasin";

// all orders
import AllOrders from "../components/apiData/supplierApiData/allOrders";
import GeneratedMail from "../components/apiData/supplierApiData/generatedMail";
import SupplideAllOrders from "../components/apiData/supplierApiData/SupplideAllOrders";

//Coupons
import CoupenList from "../components/apiData/coupenList";
import FrenchCoupen from "../components/custom-forms/CreateCategory/frenchCoupen";
import EditEcommerceCoupon from "../components/custom-forms/CreateCategory/editCoupen";

//Orders
import OpenOrders from "../components/apiData/openOrders";
import DeliveredOrders from "../components/apiData/deliveredOrders";
import AdminOrderInvoice from "../components/apiData/OrderInvoice";
import EccomAllOrders from "../components/apiData/EccomAllOrders";

//Product Recipe
import ProductRecipe from "../components/custom-forms/supplier-forms/supplier_recipe/receipe";
import ProductRecipeList from "../components/custom-forms/supplier-forms/supplier_recipe/show-recipe";
import ProductRecipeEdit from "../components/custom-forms/supplier-forms/supplier_recipe/edit-receipe";

//POS ORDERS

//Pages
import PageList from "../components/apiData/pageList";
import CreatePage from "../components/custom-forms/CreateCategory/createPage";
import EditEcommercePage from "../components/custom-forms/CreateCategory/editPage";

// -----------------------------------------------------------------------------------

// --------------------------- Supplier ---------------------------------------------

// Product
import SupplierProducts from "../components/apiData/supplierApiData/supplierProducts";
import CreateProductForm from "../components/custom-forms/supplier-forms/ProductForm";
import EditSupplierProducts from "../components/edit-forms/supplier-edits/editSupplierProducts";
//

//Category
import SupplierCategories from "../components/apiData/supplierApiData/supplierCategories";
import SupplierCategory from "../components/custom-forms/supplier-forms/supplierCategory";
import EditSupplierCategory from "../components/edit-forms/supplier-edits/editSupplierCategory";

//Supplier Units
import SupplierUnits from "../components/apiData/supplierApiData/supplierUnits";
import SupplierUnit from "../components/custom-forms/supplier-forms/supplierUnit";
import EditSupplierUnit from "../components/edit-forms/supplier-edits/editSupplierUnit";

// Suppliers Management
import SupplierList from "../components/apiData/supplierApiData/supplierList";
import Supplier from "../components/custom-forms/supplier-forms/supplier";
import EditSupplierList from "../components/edit-forms/supplier-edits/EditSupplierList";

// Customer Management
import SupplierCustomr from "../components/apiData/supplierApiData/supplierCustomer";
import SupplierCustomer from "../components/custom-forms/supplier-forms/supplierCustomer";
import EditSupplierCustomer from "../components/edit-forms/supplier-edits/editSupplierCustomer";

// Rules Management
import SupplierRules from "../components/apiData/supplierApiData/supplierRules";
import SupplierRule from "../components/custom-forms/supplier-forms/supplierRule";
import EditSupplierRules from "../components/edit-forms/supplier-edits/editSupplierRules";

//Supplier Rule Association Management

import SupplierAssociateRule from "../components/custom-forms/supplier-forms/supplierAssociateRule";
import SupplierAssociateRules from "../components/apiData/supplierApiData/supplierAssociateRules";
import EditSupplierAssociate from "../components/edit-forms/supplier-edits/editSupplierAssociate";

// Delivery Company Management
import DeliveryCompanies from "../components/apiData/supplierApiData/deliveryCompanies";
import DeliveryCompany from "../components/custom-forms/supplier-forms/deliveryCompany";
import EditDeliveryCompany from "../components/edit-forms/supplier-edits/editDeliveryCompany";

// Email
import EmailHistory from "../components/apiData/supplierApiData/emailHistory";
import SupplierEmailHeader from "../components/custom-forms/supplier-forms/SupplierEmailHeader";
import EmailFooter from "../components/custom-forms/supplier-forms/SupplierEmailFooter";

import SupplierBackups from "../components/apiData/supplierApiData/supplierBackups";

//BackLogs
import SupplierBacklogs from "../components/apiData/supplierApiData/supplierBacklogs";

//Calendar
import SupplierCalendar from "../components/custom-calendar/customCalendar";

// --------------------------- Role Management --------------------------------------

// Admins for assigning role
import SupplierAdmins from "../components/apiData/supplierApiData/supplierAdmins";
import SupplierAdmin from "../components/custom-forms/supplier-forms/supplierAdmin";
import EditSupplierAdmins from "../components/edit-forms/supplier-edits/editSupplierAdmins";

//Manage Role Routes
import ManageRolesTable from "../components/apiData/manageRolesTable";
import CreateManageRole from "../components/custom-forms/roleManagement/createManageRole";
import EditRoleManagement from "../components/edit-forms/edit-role-management/editRoleManagement";
import Testimonials from "../components/custom-forms/homeSettings/testimonials";

//-------------------------------------------------------------------------------------

// --------------------------- Customer Supplier Dashboard ----------------------------

import CustomerSuppliers from "../components/customer-suppliers/customerSuppliers";
import CustomerSupplierProducts from "../components/customer-suppliers/supplier_products";
import CustomerCart from "../components/customer-suppliers/customer_cart";
import CustomerEditSupplierProducts from "../components/customer-suppliers/editSupplierCart/edit_supplier_cart";
import CustomerOrder from "../components/customer-suppliers/customer_orders/customer_orders";
import CustomerInvoice from "../components/customer-suppliers/customer_orders/CustomerInvoice";
import SupplierOrderSummary from "../components/apiData/supplierApiData/supplierOrderSummary";

// Rectify Order

import RectifyOrders from "../components/customer-suppliers/rectify_orders/rectify_order_cart";
import RectifyOrdersView from "../components/customer-suppliers/rectify_orders/rectify_order_cart_view";
import EditRectifyOrder from "../components/customer-suppliers/rectify_orders/editSupplierRectifyCart/edit_rectify_cart";

// ----------------- Create Leads Forms -----------------
import ListForms from "../components/crm/forms/ListForms";
import CreateForms from "../components/crm/forms/CreateForms";
import EditForms from "../components/crm/forms/EditForms";
import ViewForms from "../components/crm/forms/EditForms";

// ----------------- Leads Dashboard -----------------
import CreateLeads from "../components/crm/create/CreateLeads";
import LeadsListing from "../components/crm/listing/LeadsListing";
import EditLeads from "../components/crm/edit/EditLeads";
import ViewLeads from "../components/crm/view/ViewLeads";
//-------------------------------------------------------------------------------------

// ---------------------- Instagram ----------------------
import Instagram from "../components/Instagram/instagram";
import Inquiry from "../components/inquiry/inquiry";
import Profile from "../components/inquiry/profile";
import Chat from "../components/Chat/chat";
import EcomCustomers from "../components/apiData/ecomCustomers";

import EditEcomCustomers from "../components/custom-forms/CreateCategory/editEcomCustomers";
import CreateEcomCustomers from "../components/custom-forms/CreateCategory/CreateEcomCustomers";

import CreateLeadForm from "../components/custom-forms/roleManagement/CreateLeadForm";
import EditLeadForm from "../components/custom-forms/roleManagement/EditLeadForm";
import FormsListing from "../components/custom-forms/roleManagement/FormsListing";
import viewLeadForm from "../components/custom-forms/roleManagement/ViewLeadForm";
// import UserDashboard from "../components/user-dashboard/UserDashboard";

// -------------------- Settings --------------------
import AdminSeo from "../components/Settings/AdminSeo";
import EcommerceSeo from "../components/Settings/EcommerceSeo";

import Signin from "../auth/signin";
import EmailVerification from "../auth/EmailVerification";
import ChangePassword from "../auth/ChangePassword";
import BeforeLead from "../components/crm/Before-lead/BeforeLead";
import StripePayment from "../components/custom-forms/payments/stripePayment";
import LeadsMap from "../components/crm/leads-map/leadsMap";
import HomeSettings from "../components/custom-forms/homeSettings/HomeSettings";
import ZeltySetting from "../components/custom-forms/homeSettings/ZeltySetting";
import GeneralSettings from "../components/custom-forms/homeSettings/GeneralSettings";

import CarouselSettings from "../components/custom-forms/homeSettings/CarouselSettings";
import HomepageSetting from "../components/custom-forms/homeSettings/HomepageSetting";
import SeoManagment from "../components/custom-forms/homeSettings/SeoManagment";
import OrderManagement from "../components/custom-forms/homeSettings/Order-Management/OrderManagement";
import PurchaseModule from "../components/custom-forms/homeSettings/Purchase-Module/PurchaseModule";
import LeadManagement from "../components/custom-forms/homeSettings/Lead-Management/LeadManagement";
import RoleManagement from "../components/custom-forms/homeSettings/Role-Management/RoleManagement";
import CreateNewProduct from "../components/custom-forms/CreateCategory/create-product/CreateNewProduct";
import EditEcomProduct from "../components/custom-forms/CreateCategory/edit-product/EditEcomProduct";

const role = atob(localStorage.getItem("role"));
const permission = atob(localStorage.getItem("permissions"));

export const routes = [
  // { path: "/ui-kits/accordion/:layout", Component: Accordian },
  { path: "/login", Component: Signin },
  { path: "/email/verification", Component: EmailVerification },
  { path: "/change/password/:token/:email", Component: ChangePassword },
  { path: "/dashboard/default/:layout", Component: UserDashboard },
  {
    path: "/before-lead",
    Component: BeforeLead,
  },
  {
    path: "/lead/forms/create/:layout",
    Component: CreateLeadForm,
  },
  {
    path: "/lead/forms/list/:layout",
    Component: FormsListing,
  },
  {
    path: "/lead/forms/edit/:idd/:layout",
    Component: EditLeadForm,
  },
  {
    path: "/lead/forms/view/:idd/:layout",
    Component: viewLeadForm,
  },
  {
    path: "/crm/Before-lead/BeforeLead",
    Component: BeforeLead,
  },

  // --------------------- Chart--------------------------------

  // --------------------- Ecommerce --------------------------------
  {
    ...(role == "SuperAdmin" && {
      path: "/ecommerce/create-product/CreateNewProduct/:layout",
      Component: CreateNewProduct,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/ecommerce/edit-product/EditEcomProduct/:id/:layout",
      Component: EditEcomProduct,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Products") != null) && {
      path: "/ecommerce/products/list/:layout",
      Component: Products,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/supplier/orders/invoice/:id/:layout",
      Component: SupplierOrderSummary,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null)) && {
      path: "/ecommerce/products/create/:layout",
      Component: CreateProduct,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("edit") != null)) && {
      path: "/ecommerce/products/edit/:idd/:layout",
      Component: EditEcommerceProduct,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Categories") != null) && {
      path: "/ecommerce/categories/list/:layout",
      Component: Categories,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("create") != null)) && {
      path: "/ecommerce/categories/create/:layout",
      Component: CreateCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("edit") != null)) && {
      path: "/ecommerce/categories/edit/:idd/:layout",
      Component: EditEcommerceCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Layers") != null) && {
      path: "/layers/list/:layout",
      Component: LayerManagement,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Layers") != null &&
        permission.match("create") != null)) && {
      path: "/layers/create/:layout",
      Component: CreateCouches,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Layers") != null &&
        permission.match("edit") != null)) && {
      path: "/layers/edit/:idd/:layout",
      Component: EditEcommerceCouches,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Allergen") != null) && {
      path: "/allergens/list/:layout",
      Component: AllergeneTable,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Allergen") != null &&
        permission.match("create") != null)) && {
      path: "/allergens/create/:layout",
      Component: CreateAllergene,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Allergen") != null &&
        permission.match("edit") != null)) && {
      path: "/allergens/edit/:idd/:layout",
      Component: EditEcommerceAllergene,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Store") != null) && {
      path: "/stores/list/:layout",
      Component: Stores,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("EcomCustomers") != null) && {
      path: "/ecommerce/customers/list/:layout",
      Component: EcomCustomers,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("EditEcomCustomers") != null) && {
      path: "/ecommerce/customers/edit/:id/:layout",
      Component: EditEcomCustomers,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("EditEcomCustomers") != null) && {
      path: "/ecommerce/customers/create/:layout",
      Component: CreateEcomCustomers,
    }),
  },

  {
    ...((role == "Lead" || permission.match("Inquiry") != null) && {
      path: "/inquiry/inquiry/:layout",
      Component: Inquiry,
    }),
  },
  {
    ...((role == "Lead" || permission.match("Profile") != null) && {
      path: "/inquiry/profile/:layout",
      Component: Profile,
    }),
  },
  {
    ...((role == "Lead" ||
      role == "SuperAdmin" ||
      permission.match("Chat") != null) && {
      path: "/chat/app/:layout",
      Component: Chat,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Store") != null &&
        permission.match("create") != null)) && {
      path: "/stores/create/:layout",
      Component: CreateMagasin,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Store") != null &&
        permission.match("edit") != null)) && {
      path: "/stores/edit/:idd/:layout",
      Component: EditEcommerceStore,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Coupon") != null) && {
      path: "/coupens/list/:layout",
      Component: CoupenList,
    }),
  },

  {
    ...((role == "SuperAdmin" ||
      (permission.match("Coupon") != null &&
        permission.match("create") != null)) && {
      path: "/coupens/create/:layout",
      Component: FrenchCoupen,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Coupon") != null &&
        permission.match("edit") != null)) && {
      path: "/coupens/edit/:idd/:layout",
      Component: EditEcommerceCoupon,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Pages") != null) && {
      path: "/cms/pages/list/:layout",
      Component: PageList,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/cms/homepage/list/:layout",
      Component: HomepageSetting,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Pages") != null &&
        permission.match("create") != null)) && {
      path: "/settings/ecommerce/pages/create/:layout",
      Component: CreatePage,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Pages") != null &&
        permission.match("edit") != null)) && {
      path: "/settings/ecommerce/pages/edit/:idd/:layout",
      Component: EditEcommercePage,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("open_order") != null) && {
      path: "/apiData/openOrders/:layout",
      Component: OpenOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("delivered_order") != null) && {
      path: "/apiData/deliveredOrders/:layout",
      Component: DeliveredOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("open_order") != null) && {
      path: "/ecommerce/orders/list/:layout",
      Component: EccomAllOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("open_order") != null ||
      permission.match("delivered_order")) && {
      path: "/ecommerce/orders/view/:idd/:layout",
      Component: AdminOrderInvoice,
    }),
  },

  // { path:"/ecommerce/products/list/:layout", Component: CreateProduct},

  // ----------------------------- SUPPLIER ----------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Calendar") != null) && {
      path: "/supplier/calendar/view/:layout",
      Component: SupplierCalendar,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Products") != null) && {
      path: "/supplier/products/list/:layout",
      Component: SupplierProducts,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/products/create/:layout",
      Component: CreateProductForm,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/products/edit/:idd/:layout",
      Component: EditSupplierProducts,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Categories") != null) && {
      path: "/supplier/categories/list/:layout",
      Component: SupplierCategories,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/categories/create/:layout",
      Component: SupplierCategory,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Categories") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/categories/edit/:idd/:layout",
      Component: EditSupplierCategory,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("All_Orders") != null) && {
      path: "/apiData/supplierApiData/allOrders/:layout",
      Component: AllOrders,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/apiData/supplierApiData/allOrders/:idd/:layout",
      Component: GeneratedMail,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Orders") != null) && {
      path: "/supplier/orders/list/:layout",
      Component: SupplideAllOrders,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Units") != null) && {
      path: "/units/list/:layout",
      Component: SupplierUnits,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Units") != null &&
        permission.match("create") != null)) && {
      path: "/units/create/:layout",
      Component: SupplierUnit,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Units") != null &&
        permission.match("edit") != null)) && {
      path: "/units/edit/:idd/:layout",
      Component: EditSupplierUnit,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Customers") != null) && {
      path: "/supplier/customers/list/:layout",
      Component: SupplierCustomr,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Customers") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/customers/create/:layout",
      Component: SupplierCustomer,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Customers") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/customers/edit/:idd/:layout",
      Component: EditSupplierCustomer,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Suppliers") != null) && {
      path: "/suppliers/list/:layout",
      Component: SupplierList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Suppliers") != null &&
        permission.match("create") != null)) && {
      path: "/suppliers/create/:layout",
      Component: Supplier,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Suppliers") != null &&
        permission.match("edit") != null)) && {
      path: "/suppliers/edit/:idd/:layout",
      Component: EditSupplierList,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Suppliers") != null) && {
      path: "/suppliers/email/header/:idd/:layout",
      Component: SupplierEmailHeader,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("DeliveryCompanies") != null) && {
      path: "/delivery/companies/list/:layout",
      Component: DeliveryCompanies,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("DeliveryCompanies") != null &&
        permission.match("create") != null)) && {
      path: "/delivery/companies/create/:layout",
      Component: DeliveryCompany,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("DeliveryCompanies") != null &&
        permission.match("edit") != null)) && {
      path: "/delivery/companies/edit/:idd/:layout",
      Component: EditDeliveryCompany,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Rules") != null) && {
      path: "/supplier/rules/list/:layout",
      Component: SupplierRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Rules") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/rules/create/:layout",
      Component: SupplierRule,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Rules") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/rules/edit/:idd/:layout",
      Component: EditSupplierRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      permission.match("Associate Rule") != null) && {
      path: "/associate/rules/list/:layout",
      Component: SupplierAssociateRules,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Associate Rule") != null &&
        permission.match("create") != null)) && {
      path: "/associate/rules/create/:layout",
      Component: SupplierAssociateRule,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Associate Rule") != null &&
        permission.match("edit") != null)) && {
      path: "/associate/rules/edit/:idd/:layout",
      Component: EditSupplierAssociate,
    }),
  },

  // {
  //   path: "/apiData/supplierApiData/supplierBackups/:layout",
  //   Component: SupplierBackups,
  // },

  {
    ...((role == "SuperAdmin" || permission.match("Backlogs") != null) && {
      path: "/supplier/backlogs/list/:layout",
      Component: SupplierBacklogs,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("EmailSettings") != null) && {
      path: "/supplier/email/history/:layout",
      Component: EmailHistory,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("EmailSettings") != null) && {
      path: "/supplier/email/footer/:layout",
      Component: EmailFooter,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/create/:layout",
      Component: ProductRecipe,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/list/:layout",
      Component: ProductRecipeList,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Products") != null &&
        permission.match("create") != null &&
        permission.match("Units"))) && {
      path: "/supplier/recipe/edit/:idd/:layout",
      Component: ProductRecipeEdit,
    }),
  },

  // --------------------------- MANAGE ROLES -----------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/supplier/admins/list/:layout",
      Component: SupplierAdmins,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Admins") != null &&
        permission.match("create") != null)) && {
      path: "/supplier/admins/create/:layout",
      Component: SupplierAdmin,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("Admins") != null &&
        permission.match("edit") != null)) && {
      path: "/supplier/admins/edit/:idd/:layout",
      Component: EditSupplierAdmins,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("ManageRoles") != null) && {
      path: "/settings/manage/roles/list/:layout",
      Component: ManageRolesTable,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("ManageRoles") != null &&
        permission.match("create") != null)) && {
      path: "/settings/manage/roles/create/:layout",
      Component: CreateManageRole,
    }),
  },
  {
    ...((role == "SuperAdmin" ||
      (permission.match("ManageRoles") != null &&
        permission.match("edit") != null)) && {
      path: "/settings/manage/roles/edit/:idd/:layout",
      Component: EditRoleManagement,
    }),
  },

  // {
  //   path: "/custom-forms/homeSettings/instaUserName/:layout",
  //   Component: InstaUserName,
  // },
  // {
  //   path: "/custom-forms/homeSettings/curserSection/:layout",
  //   Component: CurserSection,
  // },

  //----------------------- SITE SETTINGS ------------------------------------------

  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/general-settings/:layout",
      Component: GeneralSettings,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/SeoManagment/:layout",
      Component: SeoManagment,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/carousel-settings/:layout",
      Component: CarouselSettings,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/zelty/key/:layout",
      Component: ZeltySetting,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("find_store") != null) && {
      path: "/site/settings/store/description/:layout",
      Component: FindStore,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Config") != null) && {
      path: "/custom-forms/homeSettings/configureSection/:layout",
      Component: ConfigureSection,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Order-Management/OrderManagement/:layout",
      Component: OrderManagement,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Purchase-Module/PurchaseModule/:layout",
      Component: PurchaseModule,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Lead-Management/LeadManagement/:layout",
      Component: LeadManagement,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/homeSettings/Role-Management/RoleManagement/:layout",
      Component: RoleManagement,
    }),
  },
  // {
  //   path: "/custom-forms/homeSettings/floatingBox/:layout",
  //   Component: FloatingBox,
  // },
  // {
  //   ...((role == "SuperAdmin" || permission.match("Package") != null) && {
  //     path: "/custom-forms/homeSettings/packagesSection/:layout",
  //     Component: PackagesSection,
  //   }),
  // },
  // {
  //   ...((role == "SuperAdmin" || permission.match("Package") != null) && {
  //     path: "/custom-forms/homeSettings/packagesSection/:layout",
  //     Component: PackagesSection,
  //   }),
  // },
  {
    ...((role == "SuperAdmin" || permission.match("Testimonial") != null) && {
      path: "/site/settings/testimonials/:layout",
      Component: Testimonials,
    }),
  },

  {
    ...((role == "SuperAdmin" || permission.match("Testimonial") != null) && {
      path: "/site/settings/home/images/:layout",
      Component: ImagesLimit,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("payments") != null) && {
      path: "/site/settings/payments/stripe/:layout",
      Component: StripePayment,
    }),
  },

  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/payments/paypal/:layout",
      Component: PaypalPayment,
    }),
  },
  {
    ...(role == "SuperAdmin" && {
      path: "/site/settings/home/gallery_images/:layout",
      Component: GalleryImages,
    }),
  },

  // { path: "/custom-forms/homeSettings/navBar/:layout", Component: NavBar },

  //-----------------------------------------------------------------------------------------------

  //--------------------- CUSTOMER SUPPLIER DASHBOARD ---------------------------------------------

  {
    ...(role == "Supplier_Customer" && {
      path: "/customer-suppliers/customerSuppliers/:layout",
      Component: CustomerSuppliers,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierProducts/:idd/:layout",
      Component: CustomerSupplierProducts,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerCart/:layout",
      Component: CustomerCart,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierEditCustomerCart/:supplier_id/:layout",
      Component: CustomerEditSupplierProducts,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerOrder/:layout",
      Component: CustomerOrder,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerInvoice/:id/:layout",
      Component: CustomerInvoice,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerRectifyOrder/:layout",
      Component: RectifyOrders,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerRectifyOrderView/:id/:layout",
      Component: RectifyOrdersView,
    }),
  },
  {
    ...(role == "Supplier_Customer" && {
      path: "/supplierCustomerEditRectifyOrder/:supplier_id/:layout",
      Component: EditRectifyOrder,
    }),
  },

  //--------------------- CRM - LEADS DASHBOARD ---------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/create/:layout",
      Component: CreateLeads,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/list/:layout",
      Component: LeadsListing,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/leads/map/view/:layout",
      Component: LeadsMap,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/edit/:id/:layout",
      Component: EditLeads,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/leads/view/:id/:layout",
      Component: ViewLeads,
    }),
  },
  //-----------------------------------------------------------------------------------------------

  //--------------------- CRM - CREATE LEADS DASHBOARD ---------------------------------------------
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/create/:layout",
      Component: CreateForms,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/lead-management/stage-forms/list/:layout",
      Component: ListForms,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/edit/:id/:layout",
      Component: EditForms,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("CRM") != null) && {
      path: "/crm/stage/forms/view/:id/:layout",
      Component: EditForms,
    }),
  },

  //-----------------------------------------------------------------------------------------------

  //-------------------------- Settings --------------------------
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/settings/seo/admin/:layout",
      Component: AdminSeo,
    }),
  },
  {
    ...((role == "SuperAdmin" || permission.match("Admins") != null) && {
      path: "/settings/seo/ecommerce/:layout",
      Component: EcommerceSeo,
    }),
  },

  // -------------------------- Eccom Modifiers --------------------------------

  // -------------------------- Eccom POS Drafts --------------------------------

  //-------------------------- DineIn Apis --------------------------
];
