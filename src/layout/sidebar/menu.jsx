/* eslint-disable no-unused-vars */
import { Description, ShoppingCart } from "@material-ui/icons";
import {
  AccountBoxRounded,
  AccountTreeRounded,
  AdminPanelSettingsRounded,
  AttachMoneyRounded,
  CardGiftcardRounded,
  CategoryRounded,
  CollectionsRounded,
  DescriptionRounded,
  LayersRounded,
  LibraryBooksRounded,
  LocalMallRounded,
  LocalShippingRounded,
  StorefrontRounded,
  StraightenRounded,
  AdminPanelSettings,
  PersonOutlineRounded,
  SupervisorAccountRounded,
  VolunteerActivismRounded,
  YardRounded,
  CalendarMonthRounded,
  RuleRounded,
  AddTaskRounded,
  EmailRounded,
  RateReviewRounded,
  ReceiptLongRounded,
  GroupRounded,
  EnhancedEncryptionRounded,
  FormatAlignJustifyRounded,
  LeaderboardRounded,
  FormatListBulletedRounded,
  AddLocationAltRounded,
  ChatBubbleRounded,
  BusinessCenterRounded,
  CreditScoreRounded,
  CurrencyExchangeRounded,
  HomeOutlined,
} from "@mui/icons-material";
import { Home, ChevronsRight, CreditCard } from "react-feather";

const role = atob(localStorage.getItem("role"));
const permissions = atob(localStorage.getItem("permissions"));

console.log("roolll", role);
console.log("permission", permissions);

export const MENUITEMS = [
  {
    menutitle: "Royal Donuts",
    menucontent: "Dashboard",
    Items: [
      // -----------------------------------------------------------
      {
        ...(role != "Supplier_Customer" && {
          path: `${process.env.PUBLIC_URL}/dashboard/default`,
          icon: Home,
          // active: true,
          active: false,
          type: "link",
          title: "Dashboard",
        }),
      },
      // -----------------------------------------------------------
      {
        ...((role == "SuperAdmin" ||
          permissions.match("Products") != null ||
          permissions.match("Categories") != null ||
          permissions.match("Layers") != null) &&
          role != "Supplier_Customer" && {
            title: "Product",
            icon: LocalMallRounded,
            type: "sub",
            active: false,
            children: [
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Products") != null) && {
                  path: `${process.env.PUBLIC_URL}/ecommerce/products/list`,
                  title: "Products",
                  type: "link",
                  icon: LocalMallRounded,
                }),
              },
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Categories") != null) && {
                  path: `${process.env.PUBLIC_URL}/ecommerce/categories/list`,
                  title: "Categories",
                  type: "link",
                  icon: CategoryRounded,
                }),
              },
              {
                ...(role == "SuperAdmin" && {
                  path: `${process.env.PUBLIC_URL}/supplier/products/list`,
                  title: "Ingredients",
                  type: "link",
                  icon: LocalMallRounded,
                }),
              },
              {
                ...(role == "SuperAdmin" && {
                  path: `${process.env.PUBLIC_URL}/supplier/categories/list`,
                  title: "Ingredients Categories",
                  type: "link",
                  icon: CategoryRounded,
                }),
              },
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Layers") != null) && {
                  path: `${process.env.PUBLIC_URL}/layers/list`,
                  title: "Layers",
                  type: "link",
                  icon: LayersRounded,
                }),
              },
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Allergen") != null) && {
                  path: `${process.env.PUBLIC_URL}/allergens/list`,
                  title: "Allergens",
                  type: "link",
                  icon: YardRounded,
                }),
              },
            ],
          }),
      },
      {
        ...((role == "SuperAdmin" || permissions.match("CRM") != null) && {
          title: "CMS",
          icon: FormatAlignJustifyRounded,
          type: "sub",
          active: false,
          children: [
            // {
            //   path: `${process.env.PUBLIC_URL}/cms/blog/list`,
            //   title: "Blog",
            //   type: "link",
            //   icon: FormatAlignJustifyRounded,
            // },
            {
              path: `${process.env.PUBLIC_URL}/cms/pages/list`,
              title: "Pages",
              type: "link",
              icon: Description,
            },
            {
              path: `${process.env.PUBLIC_URL}/cms/homepage/list`,
              title: "HomePage Settings",
              type: "link",
              icon: HomeOutlined,
            },
          ],
        }),
      },
      {
        ...((role == "SuperAdmin" ||
          permissions.match("Store") != null ||
          permissions.match("find_store") != null ||
          permissions.match("Coupon") != null ||
          permissions.match("EcomCustomers") != null ||
          permissions.match("open_order") != null) &&
          role != "Supplier_Customer" && {
            title: "Franchise/Store",
            icon: StorefrontRounded,
            type: "sub",
            active: false,
            children: [
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Store") != null) && {
                  path: `${process.env.PUBLIC_URL}/stores/list`,
                  title: "Stores",
                  type: "link",
                  icon: StorefrontRounded,
                }),
              },
              {
                ...(role == "SuperAdmin" && {
                  path: `${process.env.PUBLIC_URL}/supplier/customers/list`,
                  title: "Franchisee's",
                  type: "link",
                  icon: GroupRounded,
                }),
              },
              // {
              //   ...(role == "SuperAdmin" && {
              //     path: `${process.env.PUBLIC_URL}/supplier/recipe/list`,
              //     title: "Recipe" /** All Orders */,
              //     type: "link",
              //     icon: EnhancedEncryptionRounded,
              //   }),
              // },
            ],
          }),
      },
      // -----------------------------------------------------------
      {
        ...((role == "SuperAdmin" ||
          permissions.match("Store") != null ||
          permissions.match("find_store") != null ||
          permissions.match("Coupon") != null ||
          permissions.match("EcomCustomers") != null ||
          permissions.match("open_order") != null) &&
          role != "Supplier_Customer" && {
            title: "Online Sales",
            icon: CardGiftcardRounded,
            type: "sub",
            active: false,
            children: [
              // {
              //   ...((role == "SuperAdmin" ||
              //     permissions.match("open_order") != null) && {
              //     path: `${process.env.PUBLIC_URL}/apiData/openOrders`,
              //     title: "Orders",
              //     type: "link",
              //     icon: ChevronsRight,
              //   }),
              // },
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("open_order") != null) && {
                  path: `${process.env.PUBLIC_URL}/ecommerce/orders/list`,
                  title: "Orders",
                  type: "link",
                  icon: EnhancedEncryptionRounded,
                }),
              },

              {
                ...((role == "SuperAdmin" ||
                  permissions.match("Coupon") != null) && {
                  path: `${process.env.PUBLIC_URL}/coupens/list`,
                  title: "Coupons",
                  type: "link",
                  icon: CardGiftcardRounded,
                }),
              },
              {
                ...((role == "SuperAdmin" ||
                  permissions.match("EcomCustomers") != null) && {
                  path: `${process.env.PUBLIC_URL}/ecommerce/customers/list`,
                  title: "Customers",
                  type: "link",
                  icon: SupervisorAccountRounded,
                }),
              },
            ],
          }),
      },
     
      // -----------------------------------------------------------

      // -----------------------------------------------------------

      {
        ...(role == "SuperAdmin" && {
          title: "Purchase Module",
          icon: ShoppingCart,
          type: "sub",
          active: false,
          children: [
            // {
            //   ...(role == "SuperAdmin" && {
            //     path: `${process.env.PUBLIC_URL}/units/list`,
            //     title: "Units",
            //     type: "link",
            //     icon: StraightenRounded,
            //   }),
            // },
            {
              ...(role == "SuperAdmin" && {
                path: `${process.env.PUBLIC_URL}/supplier/orders/list`,
                title: "Orders" /** All Orders */,
                type: "link",
                icon: EnhancedEncryptionRounded,
              }),
            },
            {
              ...(role == "SuperAdmin" && {
                path: `${process.env.PUBLIC_URL}/supplier/backlogs/list`,
                title: "Logs",
                type: "link",
                icon: ReceiptLongRounded,
              }),
            },
            {
              ...(role == "SuperAdmin" && {
                path: `${process.env.PUBLIC_URL}/supplier/email/history`,
                title: "Emails",
                type: "link",
                icon: EmailRounded,
              }),
            },

            // {
            //   ...(role == "SuperAdmin" && {
            //     path: `${process.env.PUBLIC_URL}/delivery/companies/list`,
            //     title: "Shipping Companies",
            //     type: "link",
            //     icon: LocalShippingRounded,
            //   }),
            // },
            // {
            //   ...(role == "SuperAdmin" && {
            //     path: `${process.env.PUBLIC_URL}/suppliers/list`,
            //     title: "Suppliers",
            //     type: "link",
            //     icon: PersonOutlineRounded,
            //   }),
            // },
            // {
            //   ...(role == "SuperAdmin" && {
            //     path: `${process.env.PUBLIC_URL}/supplier/rules/list`,
            //     title: "Rules",
            //     type: "link",
            //     icon: RuleRounded,
            //   }),
            // },

            // {
            //   ...(role == "SuperAdmin" && {
            //     path: `${process.env.PUBLIC_URL}/associate/rules/list`,
            //     title: "Associate Rules",
            //     type: "link",
            //     icon: AddTaskRounded,
            //   }),
            // },
            {
              ...(role == "SuperAdmin" && {
                path: `${process.env.PUBLIC_URL}/supplier/calendar/view`,
                title: "Calendar",
                type: "link",
                icon: CalendarMonthRounded,
              }),
            },
          ],
        }),
      },
      // -----------------------------------------------------------
      
      // -----------------------------------------------------------
      {
        ...(role === "Lead" && {
          title: "Leads",
          icon: PersonOutlineRounded,
          type: "sub",
          active: false,
          children: [
            {
              ...((role === "Lead" || permissions.match("Profile") != null) && {
                title: "Profile",
                icon: PersonOutlineRounded,
                path: `${process.env.PUBLIC_URL}/inquiry/profile`,
                type: "link",
                // active: false,
              }),
            },
            {
              ...((role === "Lead" || permissions.match("Inquiry") != null) && {
                title: "Inquiry",
                icon: CreditScoreRounded,
                path: `${process.env.PUBLIC_URL}/inquiry/inquiry`,
                type: "link",
                // active: false,
              }),
            },
            {
              ...((role === "Lead" || permissions.match("Chat") != null) && {
                title: "Chat",
                icon: ChatBubbleRounded,
                path: `${process.env.PUBLIC_URL}/chat/app`,
                type: "link",
                // active: false,
              }),
            },
          ],
        }),
      },
      // -----------------------------------------------------------
      {
        ...((role == "SuperAdmin" || permissions.match("CRM") != null) && {
          title: "Lead Generation",
          icon: FormatAlignJustifyRounded,
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/crm/leads/list`,
              title: "Leads",
              type: "link",
              icon: LeaderboardRounded,
            },

            {
              ...(role == "SuperAdmin" && {
                path: `${process.env.PUBLIC_URL}/leads/map/view`,
                title: "Leads Map",
                type: "link",
                icon: AddLocationAltRounded,
              }),
            },
            {
              ...(role === "SuperAdmin" && {
                title: "Chat",
                icon: ChatBubbleRounded,
                path: `${process.env.PUBLIC_URL}/chat/app`,
                type: "link",
                // active: false,
              }),
            },
          ],
        }),
      },

      
      {
        ...(role == "Supplier_Customer" && {
          path: `${process.env.PUBLIC_URL}/customer-suppliers/customerSuppliers`,
          icon: PersonOutlineRounded,
          // active: true,
          active: false,
          type: "link",
          title: "Supplier Products",
        }),
      },
      {
        ...(role == "Supplier_Customer" && {
          path: `${process.env.PUBLIC_URL}/supplierCustomerOrder`,
          icon: EnhancedEncryptionRounded,
          // active: true,
          active: false,
          type: "link",
          title: "Supplier Orders",
        }),
      },
      // {
      //   ...(role == "Supplier_Customer" && {
      //     title: "Management",
      //     icon: PersonOutlineRounded,
      //     type: "sub",
      //     active: false,
      //     children: [
      //       {
      //         ...(role == "Supplier_Customer" && {
      //           path: `${process.env.PUBLIC_URL}/customer-suppliers/customerSuppliers`,
      //           icon: PersonOutlineRounded,
      //           type: "link",
      //           // active: false,
      //           title: "Supplier Products",
      //         }),
      //       },
      //       {
      //         path: `${process.env.PUBLIC_URL}/supplierCustomerOrder`,
      //         icon: EnhancedEncryptionRounded,
      //         type: "link",
      //         // active: false,
      //         title: "Supplier Orders",
      //       },
      //     ],
      //   }),
      // },
      // -----------------------------------------------------------
      // {
      //   ...((role == "SuperAdmin" ||
      //     permissions.match("Testimonials") != null ||
      //     permissions.match("find_store") != null ||
      //     permissions.match("Pages") != null ||
      //     permissions.match("Package") != null) && {
      //     title: "Site Settings",
      //     icon: AdminPanelSettings,
      //     type: "sub",
      //     active: false,
      //     children: [
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("find_store") != null) && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/store/description`,
      //           title: "Store Description",
      //           type: "link",
      //           icon: DescriptionRounded,
      //         }),
      //       },
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("Testimonials") != null) && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/testimonials`,
      //           title: "Testimonials",
      //           type: "link",
      //           icon: VolunteerActivismRounded,
      //         }),
      //       },
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("Package") != null) && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/home/images`,
      //           title: "Home Images",
      //           type: "link",
      //           icon: CollectionsRounded,
      //         }),
      //       },
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("payments") != null) && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/zelty/key`,
      //           title: "Zelty Activation",
      //           type: "link",
      //           icon: AdminPanelSettings,
      //           }
      //         )
      //       },
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("payments") != null) && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/payments/stripe`,
      //           title: "Stripe Payment",
      //           type: "link",
      //           icon: CreditCard,
      //         }),
      //       },
      //       {
      //         ...(role == "SuperAdmin" && {
      //           path: `${process.env.PUBLIC_URL}/site/settings/payments`,
      //           title: "Paypal Payment",
      //           type: "link",
      //           icon: AttachMoneyRounded,
      //         }),
      //       },
      //       {
      //         ...(role == "SuperAdmin" && {
      //           path: `${process.env.PUBLIC_URL}/settings/seo/admin`,
      //           title: "Admin SEO",
      //           type: "link",
      //           icon: AdminPanelSettings,
      //         }),
      //       },
      //       {
      //         ...(role == "SuperAdmin" && {
      //           path: `${process.env.PUBLIC_URL}/settings/seo/ecommerce`,
      //           title: "Ecommerce SEO",
      //           type: "link",
      //           icon: AccountTreeRounded,
      //         }),
      //       },
      //       {
      //         ...((role == "SuperAdmin" ||
      //           permissions.match("Pages") != null) && {
      //           path: `${process.env.PUBLIC_URL}/settings/ecommerce/pages/list`,
      //           title: "Pages",
      //           type: "link",
      //           icon: LibraryBooksRounded,
      //         }),
      //       },
      //       {
      //         ...(role == "SuperAdmin" && {
      //           path: `${process.env.PUBLIC_URL}/supplier/admins/list`,
      //           title: "Admins",
      //           type: "link",
      //           icon: AdminPanelSettingsRounded,
      //         }),
      //       },
      //       {
      //         ...(role == "SuperAdmin" && {
      //           path: `${process.env.PUBLIC_URL}/settings/manage/roles/list`,
      //           title: "Roles",
      //           type: "link",
      //           icon: BusinessCenterRounded,
      //         }),
      //       },
      //     ],
      //   }),
      // },
      // -----------------------------------------------------------
    ],
  },
];
