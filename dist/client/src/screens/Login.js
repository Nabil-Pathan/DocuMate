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
const UserContext_1 = require("../context/UserContext");
const OAuth_1 = __importDefault(require("../components/OAuth"));
const Login = () => {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const { setUser } = (0, UserContext_1.useUserContext)();
    const [formData, setFormData] = (0, react_1.useState)({
        email: "",
        password: ""
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            e.preventDefault();
            console.log(formData);
            const { data } = yield axios_1.default.post("/api/auth/login", formData);
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser({
                user: data.user,
                token: data.token
            });
            react_hot_toast_1.default.success("Login Successful");
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-3 max-w-lg container mx-auto', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl text-center font-semibold my-7', children: "Login" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: 'flex flex-col gap-4', children: [(0, jsx_runtime_1.jsx)("input", { type: 'email', placeholder: 'email', className: 'border outline-none p-3 rounded-lg', id: 'email', onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { email: e.target.value })) }), (0, jsx_runtime_1.jsx)("input", { type: 'password', placeholder: "password", className: "border w-full outline-none p-3 rounded-lg pr-10", id: "password", onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { password: e.target.value })) }), (0, jsx_runtime_1.jsx)("button", { className: 'bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80', children: " Login" }), (0, jsx_runtime_1.jsx)(OAuth_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-2 mt-5', children: [(0, jsx_runtime_1.jsx)("p", { children: "Already Have an account?" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/signup', children: (0, jsx_runtime_1.jsx)("span", { className: 'text-blue-700', children: "Sign up" }) })] })] }));
};
exports.default = Login;
