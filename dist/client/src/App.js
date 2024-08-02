"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Signup_1 = __importDefault(require("./screens/Signup"));
const Login_1 = __importDefault(require("./screens/Login"));
const Home_1 = __importDefault(require("./screens/Home"));
const Header_1 = __importDefault(require("./components/Header"));
const react_hot_toast_1 = require("react-hot-toast");
const Document_1 = __importDefault(require("./screens/Document"));
const Profile_1 = __importDefault(require("./screens/Profile"));
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, { position: "top-center", toastOptions: {
                    success: {
                        iconTheme: {
                            primary: '#4aed88',
                            secondary: '',
                        },
                    },
                } }), (0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/profile", element: (0, jsx_runtime_1.jsx)(Profile_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/document/:id", element: (0, jsx_runtime_1.jsx)(Document_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(Signup_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) })] })] }));
}
exports.default = App;
