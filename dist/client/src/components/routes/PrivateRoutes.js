"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../../context/UserContext");
function PrivateRoutes({ children }) {
    const { user } = (0, UserContext_1.useUserContext)();
    return user !== null ? children : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" });
}
exports.default = PrivateRoutes;
