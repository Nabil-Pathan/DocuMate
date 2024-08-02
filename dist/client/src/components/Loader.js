"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_loader_spinner_1 = require("react-loader-spinner");
const Loader = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: 'min-h-screen mx-auto flex justify-center items-center', children: (0, jsx_runtime_1.jsx)(react_loader_spinner_1.Oval, { visible: true, height: "80", width: "80", color: "#424242", ariaLabel: "oval-loading", wrapperStyle: {}, wrapperClass: "" }) }));
};
exports.default = Loader;
