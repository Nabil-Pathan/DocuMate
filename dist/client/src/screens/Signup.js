"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_2 = require("react-router-dom");
const Signup = () => {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: ""
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            e.preventDefault();
            //  console.log(formData);
            const { data } = yield axios_1.default.post("/api/auth/signup", formData);
            console.log(data.user);
            react_hot_toast_1.default.success("Signup Successful");
            navigate('/');
        }
        catch (error) {
            console.log(error.message);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-3 max-w-lg mx-auto', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl text-center font-bold my-7', children: "Sign Up" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: 'flex flex-col gap-4', children: [(0, jsx_runtime_1.jsx)("input", { type: 'text', placeholder: 'username', className: 'border p-3 outline-none rounded-lg', id: 'username', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { name: e.target.value })) }), (0, jsx_runtime_1.jsx)("input", { type: 'email', placeholder: 'email', className: 'border outline-none p-3 rounded-lg', id: 'email', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { email: e.target.value })) }), (0, jsx_runtime_1.jsx)("input", { type: 'password', placeholder: 'password', className: 'border outline-none p-3 rounded-lg', id: 'password', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { password: e.target.value })) }), (0, jsx_runtime_1.jsx)("button", { className: 'bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold', children: "Signup" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-2 mt-5', children: [(0, jsx_runtime_1.jsx)("p", { children: "Have an account?" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/login', children: (0, jsx_runtime_1.jsx)("span", { className: 'text-blue-700', children: "Sign in" }) })] })] }));
};
exports.default = Signup;
