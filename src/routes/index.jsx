/* eslint-disable no-unused-vars */
import HomePage from "../Pages/HomePage/main";
import ProductList from "../Pages/ProductList/main";
import StoreList from "../Pages/StoreList/StoreList";
import SingleStore from "../Pages/SingleStore/SingleStore";
import PageContent from "../Pages/PageContent/PageContent";
import CheckOut from "../Pages/CheckOut/checkOut";
import CartPage from "../Pages/CartPage/CartPage";
import Direction from "../Pages/GetDirection/Direction";
import Invoice from "../Pages/CheckOut/Invoice/Invoice";
import Register from "../Pages/UserAuth/Register";
import Login from "../Pages/UserAuth/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Product from "../Pages/ProductDetail/Product";
import Configurator from "../Pages/Configurator/Configurator";
import ZeltyInvoice from "../Pages/CheckOut/Invoice/ZeltyInvoice";
import EmailVertification from "../Pages/UserAuth/ForgotPassword/EmailVertification";
import ChangePassword from "../Pages/UserAuth/ForgotPassword/ChangePassword";

export const eccomRoutes = [
    {
        path: "/",
        Component: HomePage,
    },
    {
        path: "produits",
        Component: ProductList,
    },
    {
        path: "produit/:idd",
        Component: Product,
    },
    {
        path: "/points-vente/:idd",
        Component: SingleStore,
    },
    {
        path: "points-vente",
        Component: StoreList,
    },
    {
        path: "pages/:url",
        Component: PageContent,
    },
    {
        path: "checkout",
        Component: CheckOut,
    },
    {
        path: "cart",
        Component: CartPage,
    },
    {
        path: "invoice",
        Component: Invoice,
    },
    {
        path: "zelty-invoice",
        Component: ZeltyInvoice,
    },
    {
        path: "points-vente/direction/:id",
        Component: Direction,
    },
    {
        path: "dashboard",
        Component: Dashboard,
    },
    {
        path: "register",
        Component: Register,
    },
    {
        path: "login",
        Component: Login,
    },
    {
        path: "configurator",
        Component: Configurator,
    },
    {
        path: "email/verification",
        Component: EmailVertification,
    },
    {
        path: "change/password/:token/:idd",
        Component: ChangePassword,
    },
];
