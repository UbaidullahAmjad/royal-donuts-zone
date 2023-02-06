/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import "./settingPanel.css";
import man from "../../assets/images/dashboard/profile.jpg";
import {
  FileText,
  LogIn,
  Mail,
  User,
  MessageSquare,
  Bell,
  Minimize,
  Search,
  Settings,
  ShoppingCart,
  Minus,
  Plus,
  X,
  ChevronLeft,
  ChevronDown,
} from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
  getLanguage,
} from "react-switch-lang";

import { English, Français, LogOut } from "../../constant";

import en from "../../assets/i18n/en.json";
import es from "../../assets/i18n/es.json";
import pt from "../../assets/i18n/pt.json";
import fr from "../../assets/i18n/fr.json";
import du from "../../assets/i18n/du.json";
import cn from "../../assets/i18n/cn.json";
import ae from "../../assets/i18n/ae.json";
import {
  InputGroup,
  Button,
  Col,
  Card,
  CardHeader,
  Container,
  CardBody,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "../../redux/tokens/tokenexpire/action";
import { isTokenAvailable } from "../../redux/tokens/token/action";
import axios from "axios";
import { URL } from "../../env";
import "./settingPanel.css";
import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../redux/supplier_customer/actions";

import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { ChevronRight } from "@material-ui/icons";

setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage("fr");
setLanguageCookie();

const Rightbar = (props) => {
  const { sidebarClose, setSidebarClose, filteredMenu, setFilteredMenu } =
    props;

  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [tokenExpiryTime, setTokenExpiryTime] = useState("");
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  const [searchresponsive, setSearchresponsive] = useState(false);
  const [langdropdown, setLangdropdown] = useState(false);
  const [moonlight, setMoonlight] = useState(false);
  const [selected, setSelected] = useState("fr");
  const [cartDropdown, setCartDropDown] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [chatDropDown, setChatDropDown] = useState(false);

  const [CartTotal, setCartTotal] = useState(0);
  const [storesDropdown, setStoresDropdown] = useState(false);
  const [userStores, setUserStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [Notifications, setNotifications] = useState(null);
  const [AllNotification, setAllNotification] = useState(null);

  const [AdminNotificationCount, setAdminNotificationCount] = useState(null);
  const [CustomerNotificationCount, setCustomerNotificationCount] =
    useState(null);

  const [showLogout, setShowLogout] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const [urlFound, setUrlFound] = useState(false);

  let sidebarMenu = [
    {
      id: 1,
      name: "Global Settings",
      url: `${process.env.PUBLIC_URL}/site/settings/general-settings/RD`,
      icon: "fa fa-cog",
    },
    // {
    //   id:2,
    //   name: "Store Description",
    //   url: `${process.env.PUBLIC_URL}/site/settings/store/description/RD`,
    //   icon: "fa fa-pencil-square",
    // },
    // {
    //   id:3,
    //   name: "Testimonials",
    //   url: `${process.env.PUBLIC_URL}/site/settings/testimonials/RD`,
    //   icon: "fa fa-handshake-o",
    // },
    // {
    //   id:4,
    //   name: "Instagram Images",
    //   url: `${process.env.PUBLIC_URL}/site/settings/home/images/RD`,
    //   icon: "fa fa-picture-o",
    // },
    // {
    //   id:5,
    //   name: "Gallery Images",
    //   url: `${process.env.PUBLIC_URL}/site/settings/home/gallery_images/RD`,
    //   icon: "fa fa-picture-o",
    // },
    // {
    //   id:6,
    //   name: "POS Activation",
    //   url: `${process.env.PUBLIC_URL}/site/settings/zelty/key/RD`,
    //   icon: "fa fa-wrench",
    // },
    // {
    //   id:7,
    //   name: "Stripe Payment",
    //   url: `${process.env.PUBLIC_URL}/site/settings/payments/stripe/RD`,
    //   icon: "fa fa-cc-stripe",
    // },
    // {
    //   id:8,
    //   name: "Paypal Payment",
    //   url: `${process.env.PUBLIC_URL}/site/settings/payments/paypal/RD`,
    //   icon: "fa fa-paypal",
    // },
    {
      id: 2,
      name: "SEO Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/SeoManagment/RD`,
      icon: "fa fa-cogs",
    },
    {
      id: 3,
      name: "Order Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Order-Management/OrderManagement/RD`,
      icon: "fa fa-briefcase",
    },
    {
      id: 4,
      name: "Purchase Module",
      url: `${process.env.PUBLIC_URL}/homeSettings/Purchase-Module/PurchaseModule/RD`,
      icon: "fa fa-shopping-cart",
    },
    {
      id: 5,
      name: "Lead Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Lead-Management/LeadManagement/RD`,
      icon: "fa fa-bar-chart",
    },
    {
      id: 6,
      name: "Roles Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Role-Management/RoleManagement/RD`,
      icon: "fa fa-briefcase",
    },
    // {
    //   id:10,
    //   name: "Ecommerce SEO",
    //   url: `${process.env.PUBLIC_URL}/settings/seo/ecommerce/RD`,
    //   icon: "fa fa-code-fork",
    // },
    // {
    //   id:3,
    //   name: "Order Management",
    //   url: `${process.env.PUBLIC_URL}/settings/ecommerce/pages/list/RD`,
    //   icon: "fa fa-file-text-o",
    // },
    // {
    //   id:12,
    //   name: "Admins",
    //   url: `${process.env.PUBLIC_URL}/supplier/admins/list/RD`,
    //   icon: "fa fa-user",
    // },
    // {
    //   id:13,
    //   name: "Roles",
    //   url: `${process.env.PUBLIC_URL}/settings/manage/roles/list/RD`,
    //   icon: "fa fa-briefcase",
    // },
  ];




  const setRolesMangement = () => {
    setShowRoles(!showRoles);
  };
  const trans = props.t;

  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));

  const setActiveMenu = (e) => {
    // let existPurchase =  purchaseModuleItems.find((val)=>
    // e.target.href.slice(0, -3).includes(val.url.slice(0, val.url.lastIndexOf('/')))
    //  )
    //  if(existPurchase){
    //    setShowGenericSetting(false)
    //    setshowPurchaseItems(true)
    //    setLeadManagement(false);
    //    setShowRoles(false)
    //  }
    //  if(!existPurchase)
    //  {
    //   setshowPurchaseItems(false)
    //  }

    document
      .querySelector(".sidebar-title")
      .classList.remove("active", "active");
    var divs = document.querySelectorAll(".sidebar-link"),
      i;
    for (i = 0; i < divs.length; i++) {
      divs[i].classList.remove("active");
    }
  };

  const searchMenuItems = (word) => {
    const items = sidebarMenu.filter((item) =>
      item.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    );
    if (items.length > 0) {
      setFilteredMenu(items);
    }
  };

  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  const isTokenExpiryState = useSelector((state) =>
    state.tokenExpiry.expire_time === undefined
      ? 0
      : state.tokenExpiry.expire_time
  );
  const dispatch = useDispatch();
  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());
  console.log("isTokenAvailableState: " + isTokenAvailableState);
  console.log("isTokenExpiryState: " + isTokenExpiryState);

  const handleSetLanguage = (key) => {
    setLangdropdown(false);

    setLanguage(key);
    setSelected(key);
  };

  const [valueChanged, setValueChanged] = useState(undefined);

  const handleLocalStorage = (store) => {
    localStorage.setItem("selected_store", JSON.stringify(store));
    window.dispatchEvent(new Event("newEvent"));
    setStoresDropdown(!storesDropdown);
    setValueChanged(!valueChanged);
  };

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    setName(localStorage.getItem("Name"));
    setRole(atob(localStorage.getItem("role")));
    setToken(localStorage.getItem("token123"));
    setTokenExpiryTime(localStorage.getItem("token_expiry_time"));
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
    let rol = atob(localStorage.getItem("role"));
    setUserRole(rol);

    console.log("ROLEEW --- ", rol);

    if (rol == "Supplier_Customer") {
      axios
        .post(URL + "/supplier_customer_stores", {
          id: atob(localStorage.getItem("user_id")),
        })
        .then((response) => {
          if (response.data.stores?.length > 0) {
            localStorage.setItem(
              "user_stores",
              JSON.stringify(response.data.stores)
            );
            setUserStores(response.data.stores);
          }
        });
      let selected = JSON.parse(localStorage.getItem("selected_store"));
      if (selected !== null) {
        setSelectedStore(selected);
      }
    }

    window.addEventListener("storage", () => {
      setValueChanged(!valueChanged);
    });

    sidebarMenu.map((val) => {
      // if (
      //   window.location.pathname
      //     .slice(0, -3)
      //     .includes(val.url.slice(0, val.url.lastIndexOf("/")))
      // ) {
      //   document
      //     .querySelector(".sidebar-title")
      //     .classList.remove("active", "active");
      //   var divs = document.querySelectorAll(".sidebar-link"),
      //     i;
      //   for (i = 0; i < divs.length; i++) {
      //     divs[i].classList.remove("active");
      //   }
      // }
    });
  }, []);

  useEffect(() => {
    if (valueChanged != undefined) {
      let selected = JSON.parse(localStorage.getItem("selected_store"));
      setSelectedStore(selected);
    }
  }, [valueChanged]);

  useEffect(() => {
    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());
  }, [dispatch]);

  useEffect(() => {
    isTokenAvailableState === false &&
      window.location.href.indexOf(
        `${process.env.PUBLIC_URL}/dashboard/default/}`
      ) > -1 &&
      (window.location.href = `${process.env.PUBLIC_URL}/login`);
  }, [isTokenAvailableState]);
  const Logout_From_Firebase = () => {
    localStorage.removeItem("profileURL");
    localStorage.removeItem("token");
    // firebase_app.auth().signOut();
    navigate(`${process.env.PUBLIC_URL}/login`);
  };

  const Logout_From_Auth0 = () => {
    localStorage.removeItem("auth0_profile");
    localStorage.setItem("authenticated", false);
    navigate(`${process.env.PUBLIC_URL}/login`);
    // logout();
  };

  // const RedirectToChats = () => {
  //   navigate(`${process.env.PUBLIC_URL}/app/chat-app`);
  // };

  // const RedirectToCart = () => {
  //   navigate(`${process.env.PUBLIC_URL}/app/ecommerce/cart`);
  // };

  // const UserMenuRedirect = (redirect) => {
  //   navigate(redirect);
  // };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  // const SeacrhResposive = (searchresponsive) => {
  //   if (searchresponsive) {
  //     setSearchresponsive(!searchresponsive);
  //     document.querySelector(".search-full").classList.add("open");
  //     document.querySelector(".more_lang").classList.remove("active");
  //   } else {
  //     setSearchresponsive(!searchresponsive);
  //     document.querySelector(".search-full").classList.remove("open");
  //   }
  // };

  const LanguageSelection = (language) => {
    if (language) {
      setLangdropdown(!language);
    } else {
      setLangdropdown(!language);
    }
  };

  const StoreSelect = (store) => {
    if (store) {
      setStoresDropdown(!store);
    } else {
      setStoresDropdown(!store);
    }
  };

  useEffect(() => {
    if (atob(localStorage.getItem("role")) == "Supplier_Customer") {
      const GetCartCount = async () => {
        axios
          .get(URL + "/cart", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })

          .then((response) => {
            dispatch(
              SupplierCustomerCartTotal(response.data.cart_page_array.length)
            );
          });
      };

      const GetRectifyOrderCount = async () => {
        axios
          .get(URL + "/rectify", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            dispatch(
              SupplierCustomerRectifyCartTotal(response.data.all_data.length)
            );
          });
      };

      GetCartCount();
      GetRectifyOrderCount();
    }
  }, []);

  const { cartTotal, RectifyTotal } = useSelector(
    (state) => state.SupplierCustomer
  );

  // const MoonlightToggle = (light) => {
  //   if (light) {
  //     setMoonlight(!light);
  //     // document.querySelector("#sidebar-wrapper").classList.add("dark-only");
  //     document.body.className = "light";
  //     localStorage.setItem("layout_version", "light");
  //   } else {
  //     setMoonlight(!light);
  //     document.body.className = "dark-only";
  //     localStorage.setItem("layout_version", "dark-only");
  //   }
  // };

  const handleSetStore = (store) => {
    localStorage.setItem("selected_store", JSON.stringify(store));
    setStoresDropdown(!storesDropdown);
    setValueChanged(!valueChanged);
  };

  var pusher = new Pusher("468d86032e3b9f19db82", {
    cluster: "ap2",
  });

  var channel = pusher.subscribe("my-channel");
  async function GetAdminNotification() {
    console.log("GET NOTIFYYYYYYYY ---------------------------");
    axios
      .post(URL + "/user_notifications_unread", {
        user_id: atob(localStorage.getItem("user_id")),
      })
      .then((response) => {
        if (response.data != null) {
          setAllNotification(response.data.notifications);
        }
      })
      .catch((error) => {});
  }
  async function GetCustomerNotification() {
    axios
      .post(URL + "/user_notifications_unread_customer", {
        user_id: atob(localStorage.getItem("user_id")),
      })
      .then((response) => {
        if (response.data != null) {
          setAllNotification(response.data.notifications);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    console.log(
      "CHECKING ----- ",
      atob(localStorage.getItem("role")) == "SuperAdmin" ||
        atob(localStorage.getItem("permissions")).match("Notifications")
    );
    if (
      atob(localStorage.getItem("role")) == "SuperAdmin" ||
      atob(localStorage.getItem("permissions")).match("Notifications")
    ) {
      GetAdminNotification();
    } else if (atob(localStorage.getItem("role")) == "Supplier_Customer") {
      GetCustomerNotification();
    }

    if (
      atob(localStorage.getItem("role")) == "SuperAdmin" ||
      atob(localStorage.getItem("role")) == "Supplier_Customer" ||
      atob(localStorage.getItem("permissions")).match("Notifications")
    ) {
      channel.bind("pusher:subscription_succeeded", function () {
        console.log("PUSHER CONNECTED");
      });

      channel.bind("pusher:subscription_error", function () {
        console.log("PUSHER CONNECTION ERROR");
      });
      channel.bind("my-event", function (data) {
        console.log("INOUT PUSHER DATA ---- ", JSON.stringify(data));
        if (data != null) {
          setNotifications(JSON.stringify(data.order_notification_data));
          // console.log(
          //   "RELATED_TO -----",
          //   data.order_notification_data["related_to"] == null ||
          //     data.order_notification_data["related_to"] ==
          //       atob(localStorage.getItem("user_id"))
          // );

          // console.log(
          //   "SENT_TO ---- ",
          //   data.order_notification_data["sent_to"] != "Supplier_Customer"
          // );
          // console.log(
          //   "NOTIFIER ---- ",
          //   data.order_notification_data["notifier"] !=
          //     atob(localStorage.getItem("user_id"))
          // );
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("NOTIFICATIONS USEFFECT ---- ----- ", Notifications);

    console.log("aLL  NOTIFICATIONS USEFFECT ---- ----- ", AllNotification);
    if (Notifications != null && AllNotification != null) {
      const get_notification_array = AllNotification;
      console.log("NOTIFICATIONS 22222222 ----- ", get_notification_array);
      get_notification_array.unshift({ data: Notifications });
      setNotifications(null);
      setAllNotification(get_notification_array);
      console.log(
        "UNSHIFT NOTIFIUCATIONS 00000 ----- ",
        get_notification_array
      );
    }
    if (AllNotification != null) {
      const admin_notify_count = AllNotification.map(
        (item) =>
          (JSON.parse(item.data)["related_to"] == null ||
            JSON.parse(item.data)["related_to"] ==
              atob(localStorage.getItem("user_id"))) &&
          JSON.parse(item.data)["sent_to"] != "Supplier_Customer" &&
          JSON.parse(item.data)["notifier"] !=
            atob(localStorage.getItem("user_id"))
      );

      // console.log("ADMIN NOTIFY COUNT ---- ", admin_notify_count);
      const get_admin_notify_count_true = admin_notify_count.filter(
        (item) => item == true
      ).length;
      setAdminNotificationCount(get_admin_notify_count_true);
      const customer_notify_count = AllNotification.map(
        (item) =>
          (JSON.parse(item.data)["related_to"] == null ||
            JSON.parse(item.data)["related_to"] ==
              atob(localStorage.getItem("user_id"))) &&
          JSON.parse(item.data)["sent_to"] == "Supplier_Customer" &&
          JSON.parse(item.data)["notifier"] !=
            atob(localStorage.getItem("user_id"))
      );
      const get_customer_notify_count_true = customer_notify_count.filter(
        (item) => item == true
      ).length;
      setCustomerNotificationCount(get_customer_notify_count_true);
      // console.log(
      //   "Customer NOTIFY COUNT ---- ",
      //   get_customer_notify_count_true
      // );
    }
  }, [Notifications, AllNotification]);

  const ReadNotification = async (notify_id, notifier_id) => {
    console.log("NOTIFY IDDD READ NOTIFY ----- ", notify_id);
    // AllNotification.filter(
    //   (item) => JSON.parse(item.data)["notifier"] != notify_id
    // );
    const all_notification_array = AllNotification;
    const filtered_array = all_notification_array.filter((item) =>
      item.hasOwnProperty("id")
        ? item.id != notify_id
        : JSON.parse(item.data).hasOwnProperty("notification_id") &&
          JSON.parse(item.data)["notification_id"] != notify_id
    );
    console.log("ALL FLTER NOTIFICATION ----- ", filtered_array);
    setAllNotification(filtered_array);
    axios
      .post(URL + "/user_notification_read", {
        notification_id: notify_id,
        user_id: notifier_id,
      })
      .then((response) => {
        console.log("READ RESPONSE ", response.data);
        toast.success(
          trans(
            "Notification for " +
              response.data.user_notifications.data.order_number +
              " is read"
          ),
          {
            position: "top-right",
          }
        );
      });
  };

  const ReadAndRediectNotification = (redirect_notify_id, notifier_id) => {
    console.log("NOTIFY IDDD ----- ", redirect_notify_id);
    const all_notification_array = AllNotification;
    const filtered_array = all_notification_array.filter((item) =>
      item.hasOwnProperty("id")
        ? item.id != redirect_notify_id
        : JSON.parse(item.data).hasOwnProperty("notification_id") &&
          JSON.parse(item.data)["notification_id"] != redirect_notify_id
    );
    setAllNotification(filtered_array);
    axios
      .post(URL + "/user_notification_read", {
        notification_id: redirect_notify_id,
        user_id: notifier_id,
      })
      .then((response) => {
        console.log("REDIRECT RESPONSe ----- ", response.data);
        if (response.data.success) {
          toast.success(
            trans(
              "Notification for " +
                response.data.user_notifications.data.order_number +
                " is read"
            ),
            {
              position: "top-right",
            }
          );
          if (atob(localStorage.getItem("role")) == "Supplier_Customer") {
            navigate(
              `/supplierCustomerInvoice/${response.data.user_notifications.data.order_id}/RD`
            );
          } else {
            navigate(
              `/supplier/orders/invoice/${response.data.user_notifications.data.order_id}/RD`
            );
          }
        }
      });
  };

  // console.log("NOTIFICATIONS ---- ----- ", AllNotification);
  // console.log("USER IDDD ---- ", atob(localStorage.getItem("user_id")));

  // console.log("STORES DROPDOWN -------", storesDropdown);

  const setSidebarToggle = () => {
    setSidebarClose(!sidebarClose);
    setShowLogout(false);
    setFilteredMenu([]);
  };

  return (
    <Fragment>
      {langdropdown == true && (
        <div
          className="language_nav_translate_overflow"
          onClick={() => setLangdropdown(false)}
        />
      )}
      <div className="nav-right col-10 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="language-nav" style={{ zIndex: 9999 }}>
            <div
              className={`translate_wrapper language_nav_translate ${
                langdropdown == true ? "active" : ""
              }`}
            >
              <div className="current_lang">
                <div
                  className="lang"
                  onClick={() => LanguageSelection(langdropdown)}
                >
                  {/* <i
                    className={`flag-icon flag-icon-${
                      selected === "en"
                        ? "us"
                        : selected === "fr"
                        ? "fr"
                        : selected
                    }`}
                  ></i> */}
                  <i
                    className={`flag-icon flag-icon-${
                      getLanguage() === "en"
                        ? "us"
                        : getLanguage() === "fr"
                        ? "fr"
                        : getLanguage()
                    }`}
                  ></i>
                  <span className="lang-txt">
                    {getLanguage() /* selected */}
                  </span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? "active" : ""}`}>
                <div className="lang" onClick={() => handleSetLanguage("en")}>
                  <i className="flag-icon flag-icon-us"></i>
                  <span className="lang-txt">
                    {English}
                    <span> {"(US)"}</span>
                  </span>
                </div>
                <div className="lang" onClick={() => handleSetLanguage("fr")}>
                  <i className="flag-icon flag-icon-fr"></i>
                  <span className="lang-txt">{Français}</span>
                </div>
              </div>
            </div>
          </li>

          {userRole != null && userRole == "Supplier_Customer" && (
            <li className="language-nav">
              <div
                className={`translate_wrapper ${
                  storesDropdown ? "active" : ""
                }`}
              >
                <div className="current_lang">
                  <div
                    className="lang"
                    onClick={() => StoreSelect(storesDropdown)}
                  >
                    {selectedStore != null ? (
                      <span className="lang-txt">{selectedStore.name_fr}</span>
                    ) : (
                      <span className="lang-txt">Select Store</span>
                    )}
                  </div>
                </div>
                <div className={`more_lang ${storesDropdown ? "active" : ""}`}>
                  {userStores != [] &&
                    userStores.map((store) => {
                      return (
                        <div
                          className="lang"
                          onClick={() => handleLocalStorage(store)}
                        >
                          <span className="lang-txt">
                            <span> {store.name_fr}</span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </li>
          )}

          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge badge-pill badge-secondary">
                {atob(localStorage.getItem("role")) == "Supplier_Customer"
                  ? CustomerNotificationCount
                  : AdminNotificationCount}
              </span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{"Notification"}</h6>
              </li>
              {AllNotification != null &&
                AllNotification.length > 0 &&
                AllNotification.map((item) =>
                  (JSON.parse(item.data)["related_to"] == null ||
                    JSON.parse(item.data)["related_to"] ==
                      atob(localStorage.getItem("user_id"))) &&
                  JSON.parse(item.data)["sent_to"] != "Supplier_Customer" &&
                  JSON.parse(item.data)["notifier"] !=
                    atob(localStorage.getItem("user_id")) ? (
                    <li>
                      <p>
                        <i className="fa fa-circle-o mr-3 font-primary"> </i>
                        <span
                          style={{
                            width: 150,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {JSON.parse(item.data)["order_number"]}
                        </span>
                        <i
                          className="fa fa-times mr-3 font-danger pull-right"
                          onClick={() =>
                            ReadNotification(
                              item.hasOwnProperty("id")
                                ? item.id
                                : JSON.parse(item.data)["notification_id"],
                              JSON.parse(item.data)["notifier"]
                            )
                          }
                        ></i>
                      </p>
                      <div
                        onClick={() =>
                          ReadAndRediectNotification(
                            item.hasOwnProperty("id")
                              ? item.id
                              : JSON.parse(item.data)["notification_id"],
                            JSON.parse(item.data)["notifier"]
                          )
                        }
                      >
                        <p>{JSON.parse(item.data)["message"]} </p>
                        <p>
                          {"Order Date: " +
                            new Date(
                              JSON.parse(item.data)["date"]
                            ).toLocaleString()}
                        </p>
                        <p>
                          {"Delivery Date: " +
                            JSON.parse(item.data)["delivery_date"]}
                        </p>
                      </div>
                    </li>
                  ) : (
                    (JSON.parse(item.data)["related_to"] == null ||
                      JSON.parse(item.data)["related_to"] ==
                        atob(localStorage.getItem("user_id"))) &&
                    JSON.parse(item.data)["sent_to"] == "Supplier_Customer" &&
                    JSON.parse(item.data)["notifier"] !=
                      atob(localStorage.getItem("user_id")) && (
                      <li>
                        <p>
                          <i className="fa fa-circle-o mr-3 font-primary"></i>
                          <span
                            style={{
                              width: 150,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {JSON.parse(item.data)["order_number"]}
                            {/* {JSON.parse(item.data)["notifier"]} */}
                          </span>
                          <i
                            className="fa fa-times mr-3 font-danger pull-right"
                            onClick={() =>
                              ReadNotification(
                                item.hasOwnProperty("id")
                                  ? item.id
                                  : JSON.parse(item.data)["notification_id"],
                                JSON.parse(item.data)["notifier"]
                              )
                            }
                          ></i>
                        </p>
                        <div
                          onClick={() =>
                            ReadAndRediectNotification(
                              item.hasOwnProperty("id")
                                ? item.id
                                : JSON.parse(item.data)["notification_id"],
                              JSON.parse(item.data)["notifier"]
                            )
                          }
                        >
                          <p>{JSON.parse(item.data)["message"]} </p>
                          <p>
                            {"Order Date: " +
                              new Date(
                                JSON.parse(item.data)["date"]
                              ).toLocaleString()}
                          </p>
                          <p>
                            {"Delivery Date: " +
                              JSON.parse(item.data)["delivery_date"]}
                          </p>
                        </div>
                      </li>
                    )
                  )
                )}
            </ul>
          </li>
          {userRole != null && userRole == "SuperAdmin" && (
            <li>
              <Settings
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSidebarToggle();
                }}
              />
            </li>
          )}
          {atob(localStorage.getItem("role")) == "Supplier_Customer" && (
            <li className="cart-nav onhover-dropdown">
              <div
                className="cart-box"
                onClick={() => navigate("/supplierCustomerCart/RD")}
              >
                <ShoppingCart />
                <span className="badge badge-pill badge-primary">
                  {cartTotal}
                </span>
              </div>
            </li>
          )}
          {atob(localStorage.getItem("role")) == "Supplier_Customer" &&
            RectifyTotal > 0 && (
              <li className="cart-nav onhover-dropdown">
                <div
                  className="cart-box"
                  onClick={() => navigate("/supplierCustomerRectifyOrder/RD")}
                >
                  <Button>Rectify Orders</Button>

                  {/* <ShoppingCart color="#d9534f" /> */}
                  <span className="badge badge-pill badge-light">
                    {RectifyTotal}
                  </span>
                </div>
              </li>
            )}
          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Minimize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div
              className="media profile-media"
              onClick={() => setShowLogout(!showLogout)}
            >
              <img
                className="b-r-10"
                src={authenticated ? auth0_profile.picture : profile}
                alt=""
              />
              <div className="media-body">
                {console.log("user name", name)}
                <span>{authenticated ? auth0_profile.name : name}</span>
                <p className="mb-0 font-roboto">
                  {/* {Admin}  */}
                  {/* {role} */}
                  {role !== null &&
                    role === "SuperAdmin" &&
                    trans("SuperAdmin")}
                  {role !== null && role === "Lead" && trans("Lead")}
                  {role !== null &&
                    role === "Qualified Lead" &&
                    trans("Qualified Lead")}
                  {role !== null &&
                    role === "Nigotiation in progress" &&
                    trans("Nigotiation in progress")}
                  {role !== null &&
                    role === "Signup in progress" &&
                    trans("Signup in progress")}
                  {role !== null &&
                    role === "New Franchise" &&
                    trans("New Franchise")}
                  {role !== null &&
                    role === "Active Franchise" &&
                    trans("Active Franchise")}
                  {role !== null &&
                    role != "SuperAdmin" &&
                    role != "Lead" &&
                    role}
                  <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
            {showLogout == true && (
              <ul className="profile-dropdown onhover-show-div_logout">
                {/* <li
                onClick={() =>
                  UserMenuRedirect(
                    `${process.env.PUBLIC_URL}/app/users/userProfile`
                  )
                }
              >
                <User />
                <span>{Account} </span>
              </li> */}

                <li
                  onClick={() => {
                    localStorage.removeItem("profileURL");
                    localStorage.removeItem("Name");
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("role");
                    localStorage.removeItem("token123");
                    localStorage.removeItem("token_expiry_time");
                    localStorage.removeItem("user_stores");
                    localStorage.removeItem("role");
                    localStorage.removeItem("selected_store");
                    localStorage.setItem("isModalOpen", true);
                    // localStorage.setItem('user_stores', null);
                    // localStorage.setItem('role', null);
                    // localStorage.setItem('selected_store', null);

                    navigate(`${process.env.PUBLIC_URL}/login`);
                  }}
                >
                  <LogIn />
                  <span>{LogOut}</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {sidebarClose == true && (
        <div className=" settingPanel">
          <div className="child_div">
            <div className="popper_div"></div>
            <CardHeader className="setting_card_head">
              <div className="col-12 d-flex justify-content-between mb-3">
                <div className="col-9 p-0">
                  <span>{trans("Settings Panel")}</span>
                </div>
                <div className="col-3 pr-0 d-flex justify-content-end">
                  <X
                    onClick={() => setSidebarToggle()}
                    style={{ cursor: "pointer", width: "20px" }}
                  />
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-12 searchbox_setting d-flex justify-content-center">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control inputSearch_setting"
                    placeholder={trans("search settings")}
                    style={{ height: "30px", border: "none", outline: "none" }}
                    onChange={(e) => searchMenuItems(e.target.value)}
                  ></input>
                </div>
              </div>
            </CardHeader>
            <CardBody
              style={{ height: "450px", overflowY: "scroll", padding: "0px" }}
            >
              <div className="settingPanel_list">
                {filteredMenu.length > 0
                  ? filteredMenu.map((val) => {
                      return (
                        <div className="d-flex align-items-center mt-1 ml-4">
                          <NavLink
                            className={
                              window.location.pathname
                                .slice(0, -3)
                                .includes(
                                  val.url.slice(0, val.url.lastIndexOf("/"))
                                )
                                ? "sidebar-list_setting active-link col-12  mb-1 m-0"
                                : "sidebar-list_setting col-12  mb-1 m-0"
                            }
                            activeClassName="active-link"
                            to={val.url}
                            id={`${val.id}`}
                            onClick={(e) => {
                              setActiveMenu(e);
                            }}
                          >
                            <i className={`mr-3 ${val.icon} `}></i>
                            {val.name}
                          </NavLink>
                        </div>
                      );
                    })
                  : sidebarMenu.map((val) => {
                      return (
                        <div className="d-flex align-items-center mt-1 ml-4">
                          <NavLink
                            className={
                              window.location.pathname
                                .slice(0, -3)
                                .includes(
                                  val.url.slice(0, val.url.lastIndexOf("/"))
                                )
                                ? "sidebar-list_setting active-link col-12  mb-1 m-0"
                                : "sidebar-list_setting col-12  mb-1 m-0"
                            }
                            activeClassName="active-link"
                            to={val.url}
                            id={`${val.id}`}
                            onClick={(e) => {
                              setActiveMenu(e);
                            }}
                          >
                            <i className={`mr-3 ${val.icon} `}></i>
                            {trans(`${val.name}`)}
                          </NavLink>
                        </div>
                      );
                    })}
                {/* <div className = {showGenericSetting == true || genericMenuList.some((val)=>val.url == window.location.pathname) ?  'active_border_class main_type col-12' : "main_type col-12" } 
                onClick={setGenericShow}
                >
                  <span className="col-1 p-0 mt-1">
                    {showGenericSetting == false ? (
                      <ChevronLeft />
                    ) : (
                      <ChevronDown />
                    )}
                  </span>
                  <span className="col-11 d-flex justify-content-start">Order Management</span>
                </div>
                { showGenericSetting == true &&
                <div className="showList_div col-12">
                  {genericMenuList.length > 0 &&
                   genericMenuList.map((val)=>{
                    return(
                      <div className="d-flex align-items-center mb-1">
                          <NavLink
                            className  = { window.location.pathname.slice(0, -3).includes(val.url.slice(0, val.url.lastIndexOf('/'))) ? "sidebar-list_setting active-link col-12  mb-1 m-0" : "sidebar-list_setting col-12  mb-1 m-0"}
                            activeClassName="active-link"
                            to={val.url}
                            id = {`${val.id}`}
                            onClick={(e) => {
                              setActiveMenu(e);
                            }}
                          >
                            <i className={`mr-3 ${val.icon} `}></i>
                            {val.name}
                          </NavLink>
                        </div>
                    )
                   })}
                </div>
                } */}
              </div>
            </CardBody>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default translate(Rightbar);
