"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
const Header = () => {
    var _a;
    const { user } = (0, UserContext_1.useUserContext)();
    return ((0, jsx_runtime_1.jsx)("header", { className: 'bg-gray-300 sticky top-0 z-50 md:px-8 px-3 shadow-md', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center  mx-auto p-3', children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/', children: (0, jsx_runtime_1.jsxs)("h1", { className: 'font-bold text-xl sm:text-xl flex flex-wrap', children: [(0, jsx_runtime_1.jsx)("span", { className: 'text-gray-500', children: "Google" }), (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-500', children: " Docs" })] }) }), user && user.token != "" ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/profile', children: (0, jsx_runtime_1.jsx)("img", { className: 'h-12 w-12 object-cover cursor-pointer rounded-full', src: (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.pic, alt: "image" }) }) })) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: 'bg-slate-100 px-4 py-2 rounded-md font-semibold', to: '/login', children: "Login" }))] }) }));
};
exports.default = Header;
