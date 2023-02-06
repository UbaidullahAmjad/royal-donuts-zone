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
import DefaultProfileImg from "../../assets/images/dashboard/profile.jpg";
import { English, Français, LogOut } from "../../constant";
import {
  CardHeader,
  Button,
  CardBody,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "../../redux/tokens/tokenexpire/action";
import { isTokenAvailable } from "../../redux/tokens/token/action";
import axios from "axios";
import { URL, SIMPLE_URL } from "../../env";
import "./settingPanel.css";
import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../redux/supplier_customer/actions";
import { RectifyOrderDataAction } from "../../redux/Pages/SupplierCustomer/Rectify/RectifyAction";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { getSupplierCustomerCartTotalAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";
import { useTranslation, Trans } from "react-i18next";

const Rightbar = (props) => {
  const { sidebarClose, setSidebarClose, filteredMenu, setFilteredMenu } = props;
  const { t, i18n } = useTranslation();
  const trans = t;

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [showGenericSetting, setShowGenericSetting] = useState(false);

  const [showPurchaseItems, setshowPurchaseItems] = useState(false);
  const [showLeadManagement, setLeadManagement] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const [activeLink, setActiveLink] = useState(null);

  const [urlFound, setUrlFound] = useState(false);

  const getRectifyData = useSelector((state) => state.getRectifyData)
  const RectifyOrderList = getRectifyData.rectifyOrderList;

  let sidebarMenu = [
    {
      id: 1,
      name: "Global Settings",
      url: `${process.env.PUBLIC_URL}/site/settings/general-settings`,
      icon: "fa fa-cog",
    },
    // {
    //   id:2,
    //   name: "Store Description",
    //   url: `${process.env.PUBLIC_URL}/site/settings/store/description`,
    //   icon: "fa fa-pencil-square",
    // },
    // {
    //   id:3,
    //   name: "Testimonials",
    //   url: `${process.env.PUBLIC_URL}/site/settings/testimonials`,
    //   icon: "fa fa-handshake-o",
    // },
    // {
    //   id:4,
    //   name: "Instagram Images",
    //   url: `${process.env.PUBLIC_URL}/site/settings/home/images`,
    //   icon: "fa fa-picture-o",
    // },
    // {
    //   id:5,
    //   name: "Gallery Images",
    //   url: `${process.env.PUBLIC_URL}/site/settings/home/gallery_images`,
    //   icon: "fa fa-picture-o",
    // },
    // {
    //   id:6,
    //   name: "POS Activation",
    //   url: `${process.env.PUBLIC_URL}/site/settings/zelty/key`,
    //   icon: "fa fa-wrench",
    // },
    // {
    //   id:7,
    //   name: "Stripe Payment",
    //   url: `${process.env.PUBLIC_URL}/site/settings/payments/stripe`,
    //   icon: "fa fa-cc-stripe",
    // },
    // {
    //   id:8,
    //   name: "Paypal Payment",
    //   url: `${process.env.PUBLIC_URL}/site/settings/payments/paypal`,
    //   icon: "fa fa-paypal",
    // },
    {
      id: 2,
      name: "SEO Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/SeoManagment`,
      icon: "fa fa-cogs",
    },
    {
      id: 3,
      name: "Order Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Order-Management/OrderManagement`,
      icon: "fa fa-briefcase",
    },
    {
      id: 4,
      name: "Purchase Module",
      url: `${process.env.PUBLIC_URL}/homeSettings/Purchase-Module/PurchaseModule`,
      icon: "fa fa-shopping-cart",
    },
    {
      id: 5,
      name: "Lead Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Lead-Management/LeadManagement`,
      icon: "fa fa-bar-chart",
    },
    {
      id: 6,
      name: "Roles Management",
      url: `${process.env.PUBLIC_URL}/homeSettings/Role-Management/RoleManagement`,
      icon: "fa fa-briefcase",
    },
    // {
    //   id:10,
    //   name: "Ecommerce SEO",
    //   url: `${process.env.PUBLIC_URL}/settings/seo/ecommerce`,
    //   icon: "fa fa-code-fork",
    // },
    // {
    //   id:3,
    //   name: "Order Management",
    //   url: `${process.env.PUBLIC_URL}/settings/ecommerce/pages/list`,
    //   icon: "fa fa-file-text-o",
    // },
    // {
    //   id:12,
    //   name: "Admins",
    //   url: `${process.env.PUBLIC_URL}/supplier/admins/list`,
    //   icon: "fa fa-user",
    // },
    // {
    //   id:13,
    //   name: "Roles",
    //   url: `${process.env.PUBLIC_URL}/settings/manage/roles/list`,
    //   icon: "fa fa-briefcase",
    // },
  ];

  const setRolesMangement = () => {
    setShowRoles(!showRoles);
  };

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
    } else {
      const items = sidebarMenu.filter((item) =>
        trans(item.name).toLocaleLowerCase().includes(word.toLocaleLowerCase())
      );
      if (items.length > 0) {
        setFilteredMenu(items);
      } else {
        setFilteredMenu([
          { id: -1, name: "Not found", icon: "fa fa-times", url: "" },
        ]);
      }
    }
  };

  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  const isTokenExpiryState = useSelector((state) =>
    state.tokenExpiry.expire_time === undefined
      ? 0
      : state.tokenExpiry.expire_time
  );
  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());

  const [valueChanged, setValueChanged] = useState(undefined);

  const handleLocalStorage = (store) => {
    localStorage.setItem("selected_store", JSON.stringify(store));
    window.dispatchEvent(new Event("newEvent"));
    setStoresDropdown(!storesDropdown);
    setValueChanged(!valueChanged);
  };

  const { user_data_name, user_data_image } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    setName(
      user_data_name != null ? user_data_name : localStorage.getItem("Name")
    );
    setProfile(
      user_data_image != null
        ? SIMPLE_URL + "/images/User/" + user_data_image
        : localStorage.getItem("profileURL") != "null"
          ? SIMPLE_URL + "/images/User/" + localStorage.getItem("profileURL")
          : DefaultProfileImg
    );
  }, [user_data_name, user_data_image]);

  useEffect(() => {
    // setProfile(localStorage.getItem("profileURL") || man);
    setName(localStorage.getItem("Name"));
    setRole(atob(localStorage.getItem("role")));
    setToken(localStorage.getItem("token123"));
    setTokenExpiryTime(localStorage.getItem("token_expiry_time"));
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
    let rol = atob(localStorage.getItem("role"));
    setUserRole(rol);

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
    // dispatch(I18ChangeLanguageAction("fr"))
    // i18next.changeLanguage("en")
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
      GetCartCount();
      dispatch(RectifyOrderDataAction())
    }
  }, []);

  const GetCartCount = async () => {
    const cartResponse = await getSupplierCustomerCartTotalAction()
    if (cartResponse?.data?.success == true) {
      dispatch(
        SupplierCustomerCartTotal(cartResponse?.data?.cart_page_array?.length)
      );
    }
  };

  useEffect(() => {
    if (RectifyOrderList.length > -1) {
      dispatch(
        SupplierCustomerRectifyCartTotal(RectifyOrderList.length)
      );
    }
  }, [getRectifyData])

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
    axios
      .post(URL + "/user_notifications_unread", {
        user_id: atob(localStorage.getItem("user_id")),
      })
      .then((response) => {
        if (response.data != null) {
          setAllNotification(response.data.notifications);
        }
      })
      .catch((error) => { });
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
      .catch((error) => { });
  }
  useEffect(() => {
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
        // console.log("PUSHER CONNECTED");
      });

      channel.bind("pusher:subscription_error", function () {
        console.log("PUSHER CONNECTION ERROR");
      });
      channel.bind("my-event", function (data) {
        // console.log("INOUT PUSHER DATA ---- ", JSON.stringify(data));
        if (data != null) {
          setNotifications(JSON.stringify(data.order_notification_data));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (Notifications != null && AllNotification != null) {
      const get_notification_array = AllNotification;
      get_notification_array.unshift({ data: Notifications });
      setNotifications(null);
      setAllNotification(get_notification_array);
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
    }
  }, [Notifications, AllNotification]);

  const ReadNotification = async (notify_id, notifier_id) => {
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
    setAllNotification(filtered_array);
    axios
      .post(URL + "/user_notification_read", {
        notification_id: notify_id,
        user_id: notifier_id,
      })
      .then((response) => {
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
              `/customer/suppliers/orders/view/${response.data.user_notifications.data.order_id}`
            );
          } else {
            navigate(
              `/supplier/orders/invoice/${response.data.user_notifications.data.order_id}`
            );
          }
        }
      });
  };

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
              className={`translate_wrapper language_nav_translate ${langdropdown == true ? "active" : ""
                }`}
            >
              <div className="current_lang">
                <div
                  className="lang"
                  onClick={() => LanguageSelection(langdropdown)}
                >
                  <i
                    className={`flag-icon flag-icon-${i18n.language === "en"
                      ? "us"
                      : i18n.language == "fr"
                        ? "fr"
                        : i18n.language
                      }`}
                  ></i>
                  <span className="lang-txt">
                    {i18n.language}
                  </span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? "active" : ""}`}>
                <div className="lang" onClick={() => {
                  i18n.changeLanguage("en");
                  setLangdropdown(false);
                }}>
                  <i className="flag-icon flag-icon-us"></i>
                  <span className="lang-txt">
                    {English}
                    <span> {"(US)"}</span>
                  </span>
                </div>
                <div className="lang" onClick={() => {
                  i18n.changeLanguage("fr");
                  setLangdropdown(false);
                }}>
                  <i className="flag-icon flag-icon-fr"></i>
                  <span className="lang-txt">{Français}</span>
                </div>
              </div>
            </div>
          </li>

          {userRole != null && userRole == "Supplier_Customer" && (
            <li className="language-nav">
              <div
                className={`translate_wrapper ${storesDropdown ? "active" : ""
                  }`}
              >
                <div className="current_lang">
                  <div
                    className="lang"
                    style={{ width: 115 }}
                    onClick={() => StoreSelect(storesDropdown)}
                  >
                    {selectedStore != null ? (
                      <span
                        className="lang-txt"
                        style={{
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {selectedStore.name_fr}
                      </span>
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
                          style={{ widt: 115 }}
                          // style={{ width: 100 }}
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
              className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""
                }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{trans("Notifications")}</h6>
              </li>
              {AllNotification != null && AllNotification.length > 0 ? (
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
                )
              ) : (
                <li style={{ display: "flex", justifyContent: "center" }}>
                  <p>
                    <i className="fa fa-circle-o mr-3 font-primary"> </i>
                    <span
                      style={{
                        width: 150,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#000",
                      }}
                    >
                      {trans("Notifications Catch-Up")}
                    </span>
                  </p>
                </li>
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
                onClick={() => navigate("/supplier_customers/cart/list")}
              >
                <ShoppingCart />
                <span className="badge badge-pill badge-primary">
                  {cartTotal}
                </span>
              </div>
            </li>
          )}
          {
            atob(localStorage.getItem("role")) == "Supplier_Customer" && (
              // RectifyTotal > 0 && (
              <li className="cart-nav onhover-dropdown">
                <div
                  className="cart-box"
                  onClick={() =>
                    navigate("/supplier_customers/rectify_orders/list")
                  }
                >
                  <Button>{trans("Rectify Orders")}</Button>

                  {/* <ShoppingCart color="#d9534f" /> */}
                  <span
                    className="badge badge-pill badge-warning"
                    style={{ fontSize: 14 }}
                  >
                    {RectifyTotal}
                  </span>
                </div>
              </li>
            )
            // )
          }
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
                  {showLogout ? (
                    <i className="middle fa fa-angle-up"></i>
                  ) : (
                    <i className="middle fa fa-angle-down"></i>
                  )}
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
                    navigate(`${process.env.PUBLIC_URL}/user-profile`);
                    setShowLogout(!showLogout);
                  }}
                >
                  <User />
                  <span>{trans("User Profile")}</span>
                </li>

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
        <div className="col-lg-5 col-md-4 settingPanel">
          <div className="child_div">
            <div
              className={
                i18n.language == "en"
                  ? "popper_div up_arrow_en"
                  : "popper_div up_arrow_fr"
              }
            // style={
            //   getLanguage() == "en" ? { left: "10.5pc" } : { left: "7.2pc" }
            // }
            ></div>
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
                    if (val.id == -1) {
                      return (
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          {/* <NavLink
                              className="sidebar-list_setting col-12 mb-1 m-0"
                              activeClassName="active-link"
                            > */}
                          <div style={{ color: "#ccc", fontSize: 24 }}>
                            <i className={`mr-3 ${val.icon} `}></i>
                            {trans(val.name)}
                          </div>
                          {/* </NavLink> */}
                        </div>
                      );
                    } else {
                      return (
                        <div className="d-flex align-items-center mb-1">
                          <NavLink
                            className="sidebar-list_setting col-12 mb-1 m-0"
                            activeClassName="active-link"
                            to={val.url}
                            onClick={(e) => {
                              setActiveMenu(e);
                            }}
                          >
                            <i className={`mr-3 ${val.icon} `}></i>
                            {trans(val.name)}
                          </NavLink>
                        </div>
                      );
                    }
                  })
                  : sidebarMenu.map((val) => {
                    return (
                      <div className="d-flex align-items-center mb-1">
                        <NavLink
                          className={`sidebar-list_setting col-12  mb-1 m-0 ${window.location.pathname.includes(val.url) && "active_right_link"}`}
                          activeClassName="active-link"
                          to={val.url}
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
                  <span className="col-11 d-flex justify-content-start">
                    {props.t("Order Management")}
                  </span>
                </div>
                {showGenericSetting == true && (
                  <div className="showList_div col-12">
                    {genericMenuList.length > 0 &&
                      genericMenuList.map((val) => {
                        return (
                          <div className="d-flex align-items-center mb-1">
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
                      })}
                  </div>
                )}
                <div
                  className={
                    showPurchaseItems == true ||
                    purchaseModuleItems.some(
                      (val) => val.url == window.location.pathname
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
export default Rightbar;
