import React, { Fragment, useState, useEffect } from "react";
import "./sidebar.css";
import { MENUITEMS as MENUS } from "./menu";
import { ArrowRight, ArrowLeft, Grid } from "react-feather";
import { Link } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import configDB from "../../data/customizer/config";
import { DefaultLayout } from "../theme-customizer";

import { useDispatch } from "react-redux";
import { isTokenExpiryTime } from "../../redux/tokens/tokenexpire/action";
import { isTokenAvailable } from "../../redux/tokens/token/action";
// ------------------

const Sidebar = (props) => {
  const { setToogleSidebar } = props;
  const MENUITEMS = MENUS.filter(
    (element) => Object.keys(element).length !== 0
  );

  const { t } = useTranslation();

  const id = window.location.pathname.split("/").pop();
  const defaultLayout = Object.keys(DefaultLayout);
  const layout = id ? id : defaultLayout;
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  // const wrapper =
  //   useSelector((content) => content.Customizer.sidebar_types.type) ||
  //   configDB.data.settings.sidebar.type;

  const wrapper = "compact-sidebar";

  const SideBarConfigType = "compact-sidebar";

  // const loadAciveParentSideMenu = localStorage.getItem("loadAciveParentSideMenu")

  // const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  // const isTokenExpiryState = useSelector((state) =>
  //   state.tokenExpiry.expire_time === undefined
  //     ? 0
  //     : state.tokenExpiry.expire_time
  // );
  const dispatch = useDispatch();
  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());

  const handleScroll = () => {
    // if (window.scrollY > 400) {
    //   if (
    //     configDB.data.settings.sidebar.type.split(" ").pop() ===
    //       "material-type" ||
    //     configDB.data.settings.sidebar.type.split(" ").pop() ===
    //       "advance-layout"
    //   )
    //     document.querySelector(".sidebar-main").className =
    //       "sidebar-main hovered";
    // } else {
    //   if (document.getElementById("sidebar-main"))
    //     document.querySelector(".sidebar-main").className = "sidebar-main";
    // }

    if (window.scrollY > 400) {
      if (
        SideBarConfigType.split(" ").pop() === "material-type" ||
        SideBarConfigType.split(" ").pop() === "advance-layout"
      )
        document.querySelector(".sidebar-main").className =
          "sidebar-main hovered";
    } else {
      if (document.getElementById("sidebar-main"))
        document.querySelector(".sidebar-main").className = "sidebar-main";
    }
  };

  const [currentSidebarParentActive, setCurrentSidebarParentActive] =
    useState(null);

  const dashboardRef = React.useRef(null);
  if (window.location.pathname.includes('dashboard/default')) {
    dashboardRef.current?.classList.add('active');
  } else {
    // dashboardRef.current?.className.replace("active", "");
    dashboardRef.current?.classList.remove('active');
  }

  useEffect(() => {
    localStorage.setItem("loadMainMenuSidebar", "sidebar_menu_active");

    document.querySelector(".left-arrow").classList.add("d-none");
    window.addEventListener("resize", handleResize);
    handleResize();
    const currentUrl = window.location.pathname;
    MENUITEMS.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line
  }, [layout]);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items != item) {
          Items.active = false;
          document.querySelector(".bg-overlay1").classList.remove("active");
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
          document.querySelector(".sidebar-link").classList.add("active");
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const toggletNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      const itm = menuItems.Items.filter((value) => value.title != item.title);
      if (itm) {
        itm.map((single) => {
          return (single.active = false);
        });
      }
    });

    if (window.innerWidth <= 991) {
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";

      if (item.type === "sub") {
        document.querySelector(".page-header").className = "page-header ";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper ";
      }
    }

    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector(".right-arrow").classList.add("d-none");
      document.querySelector(".left-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector(".left-arrow").classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector(".left-arrow").classList.add("d-none");
      document.querySelector(".right-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector(".right-arrow").classList.remove("d-none");
    }
  };

  // const [sidebarLinkActive, setSidebarLinkActive] = useState("active_")
  const [sidebarLinkActive, setSidebarLinkActive] = useState("active");
  const closeOverlay = () => {
    document.querySelector(".bg-overlay1").classList.remove("active");
    document.querySelector(".sidebar-link").classList.remove("active");

    setSidebarLinkActive("");
  };

  const activeClass = () => {
    // document.querySelector(".sidebar-link").classList.add("active");
    // document.getElementById("sidebar-link").className += "active";
    // document.querySelector(".bg-overlay1").classList.add("active");

    if (document.querySelector(".bg-overlay1").classList.contains("active")) {
      document.querySelector(".bg-overlay1").classList.remove("active");
    } else {
      document.querySelector(".bg-overlay1").classList.add("active");
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-header").className = "page-header close_icon";
    document.querySelector(".sidebar-wrapper").className =
      "sidebar-wrapper close_icon";
  };


  const role = "SuperAdmin";
  const LinkTo =
    role == atob(localStorage.getItem("role"))
      ? `${process.env.PUBLIC_URL}/dashboard/default`
      : `${process.env.PUBLIC_URL}/suppliers/customer/products/list`;

  const handleMouseEnter = (e) => {
    document.querySelector(".page-header").className = "page-header";
    document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
  };
  return (
    <Fragment>
      <div
        className={`bg-overlay1`}
        onClick={() => {
          closeOverlay();
        }}
      ></div>
      {/* style={{ width: 152 }} */}
      <div
        className="sidebar-wrapper"
        id="sidebar-wrapper"
        onMouseEnter={handleMouseEnter}
      >
        <div className="logo-wrapper" style={{ backgroundColor: "#181c2e" }}>
          <Link to={LinkTo}>
            <img
              className="img-fluid for-light"
              src={require("../../assets/images/logo/royal_donuts_logo.png")}
              width={150}
              height={150}
              alt=""
            />
            <img
              className="img-fluid for-dark"
              src={require("../../assets/images/logo/royal_donuts_logo.png")}
              alt=""
              width={150}
              height={150}
            />
          </Link>
          <div className="back-btn" onClick={() => responsiveSidebar()}>
            <i className="fa fa-angle-left"></i>
          </div>
          <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className="status_toggle middle sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <img
              className="img-fluid"
              src={require("../../assets/images/logo/logoo.png")}
              width={30}
              height={30}
              alt=""
            />
          </Link>
        </div>
        <nav
          className="sidebar-main"
          id="sidebar-main"
          style={{ backgroundColor: "#21263c !important" }}
        >
          <div className="left-arrow" onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div
            id="sidebar-menu"
            style={
              wrapper.split(" ").includes("horizontal-wrapper")
                ? { marginLeft: margin + "px" }
                : { margin: "0px" }
            }
          >
            <ul className="sidebar-links custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-right">
                  <span>{"Back"}</span>
                  <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                </div>
              </li>
              {MENUITEMS.map((Item, i) => (
                <Fragment key={i}>
                  <li className="sidebar-main-title">
                    <div>
                      <h6 className="lan-1">{t(Item.menutitle)}</h6>
                      <p className="lan-2">{t(Item.menucontent)}</p>
                    </div>
                  </li>
                  {Item.Items.map((menuItem, i) => (
                    <li
                      className="sidebar-list"
                      key={i}
                      onClick={() => (
                        activeClass(), setSidebarLinkActive("active")
                      )}
                    >
                      {menuItem.type === "sub" ? (
                        <a
                          style={{ borderRadius: "3px" }}
                          href="javascript"
                          id="sidebar-link"
                          className={`sidebar-link sidebar-title ${menuItem.active
                            ? (activeClass(), sidebarLinkActive)
                            : ""
                            } ${menuItem.children.find((item) =>
                              window.location.pathname
                                .includes(
                                  item.path?.slice(
                                    0,
                                    item.path.lastIndexOf("/")
                                  )
                                )
                            ) && "included"
                            } ${menuItem.children.find((item) =>
                              window.location.pathname
                                .includes(
                                  item.path?.slice(
                                    0,
                                    item.path.lastIndexOf("/")
                                  )
                                )
                            ) && "active"
                            }`}
                          onClick={(event) => {
                            event.preventDefault();
                            setNavActive(menuItem);
                          }}
                        >
                          <menuItem.icon />
                          <span>{t(menuItem.title)}</span>
                          {menuItem.badge ? (
                            <label className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                          <div className="according-menu">
                            {/* iiiiiiiiiiiiiiiiiiii */}
                            {menuItem.active ||
                              (menuItem.children.find((item) =>
                                window.location.pathname
                                  .includes(
                                    item.path.slice(0, item.path.lastIndexOf("/"))
                                  )
                              ) &&
                                localStorage.getItem("loadMainMenuSidebar") !=
                                null) ? (
                              <i className="fa fa-angle-down"></i>
                            ) : (
                              <i className="fa fa-angle-right"></i>
                            )}
                          </div>
                        </a>
                      ) : (
                        ""
                      )}

                      {menuItem.type === "link" ? (
                        <Link
                          style={{ borderRadius: "3px" }}
                          to={menuItem.path}
                          // className={`sidebar-link sidebar-title link-nav  ${
                          //   menuItem.active ? "active" : ""
                          // } ${
                          //   window.location.pathname ==
                          //     menuItem.path && "active"
                          // }`}
                          className={`sidebar-link sidebar-title link-nav  ${menuItem.active &&
                            window.location.pathname ==
                            menuItem.path
                            ? "active_"
                            : ""
                            } ${window.location.pathname
                              .includes(
                                menuItem.path?.slice(
                                  0,
                                  menuItem.path.lastIndexOf("/")
                                )
                              ) ? "active" : ""}
                            ${window.location.pathname ==
                            menuItem.path && "active"
                            }`}
                          onClick={() => toggletNavActive(menuItem)}
                          dashboard="dashboard"
                          ref={dashboardRef}
                        >
                          <menuItem.icon />
                          <span>{t(menuItem.title)}</span>
                          {menuItem.badge ? (
                            <label className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                        </Link>
                      ) : (
                        ""
                      )}

                      {menuItem.children ? (
                        <ul
                          // className={`sidebar-submenu ${menuItem.active && localStorage.removeItem("loadMainMenuSidebar")} ${menuItem.children.find((item) => window.location.pathname == item.path) && !menuItem.active && localStorage.getItem("loadMainMenuSidebar")}`}
                          className={`sidebar-submenu ${menuItem.active &&
                            localStorage.removeItem("loadMainMenuSidebar")
                            } ${menuItem.children.find((item) =>
                              window.location.pathname
                                .includes(
                                  item.path?.slice(
                                    0,
                                    item.path.lastIndexOf("/")
                                  )
                                )
                            ) &&
                            !menuItem.active &&
                            localStorage.getItem("loadMainMenuSidebar")
                            }`}
                          style={
                            menuItem.active
                              ? sidebartoogle ||
                                localStorage.getItem("loadMainMenuSidebar")
                                ? {
                                  opacity: 1,
                                  transition: "opacity 500ms ease-in",
                                }
                                : { display: "block" }
                              : { display: "none" }
                          }
                          onClick={() =>
                            localStorage.setItem(
                              "loadMainMenuSidebar",
                              "sidebar_menu_active"
                            )
                          }
                        >
                          {menuItem.children.map((childrenItem, index) => {
                            return (
                              <li key={index}>
                                {childrenItem.type === "sub" ? (
                                  <a
                                    href="javascript"
                                    className={`${childrenItem.active ? "active" : ""
                                      }`}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      toggletNavActive(childrenItem);
                                    }}
                                  >
                                    {t(childrenItem.title)}
                                    <span className="sub-arrow">
                                      <i className="fa fa-chevron-right"></i>
                                    </span>
                                    <div className="according-menu">
                                      {childrenItem.active ? (
                                        <i className="fa fa-angle-down"></i>
                                      ) : (
                                        <i className="fa fa-angle-right"></i>
                                      )}
                                    </div>
                                  </a>
                                ) : (
                                  ""
                                )}

                                {/* sidebar-sub-menus (childrens)  */}
                                {childrenItem.type === "link" ? (
                                  <Link
                                    style={{
                                      borderRadius: "3px",
                                      // marginTop: 10,
                                    }}
                                    to={childrenItem.path}
                                    // className={`mb-1 ${childrenItem.active && (window.location.pathname == childrenItem.path) ? "active" : ""
                                    //   } ${(window.location.pathname == childrenItem.path) && "active"}`}
                                    className={`mb-1 ${childrenItem.active &&
                                      window.location.pathname
                                        .includes(
                                          childrenItem.path.slice(
                                            0,
                                            childrenItem.path.lastIndexOf("/")
                                          )
                                        )
                                      ? "active"
                                      : ""
                                      } 
                                    ${window.location.pathname
                                        .includes(
                                          childrenItem.path.slice(
                                            0,
                                            childrenItem.path.lastIndexOf("/")
                                          )
                                        ) && "active"
                                      }`}
                                    onClick={() =>
                                      toggletNavActive(childrenItem)
                                    }
                                    submenu="submenu"
                                  >
                                    <div className="d-flex align-items-center">
                                      <childrenItem.icon />
                                      {t(childrenItem.title)}
                                    </div>
                                  </Link>
                                ) : (
                                  ""
                                )}

                                {childrenItem.children ? (
                                  <ul
                                    className="nav-sub-childmenu submenu-content"
                                    style={
                                      childrenItem.active
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                  >
                                    {childrenItem.children.map(
                                      (childrenSubItem, key) => (
                                        <li key={key}>
                                          {childrenSubItem.type === "link" ? (
                                            <Link
                                              to={
                                                childrenSubItem.path
                                              }
                                              className={`${childrenSubItem.active
                                                ? "active"
                                                : ""
                                                }`}
                                              onClick={() =>
                                                toggletNavActive(
                                                  childrenSubItem
                                                )
                                              }
                                            >
                                              {t(childrenSubItem.title)}
                                            </Link>
                                          ) : (
                                            ""
                                          )}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="right-arrow" onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
