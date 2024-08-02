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
const auth_1 = require("firebase/auth");
const firebase_1 = require("../firebase");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = require("react-hot-toast");
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
const OAuth = () => {
    const { setUser } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Provider = new auth_1.GoogleAuthProvider();
            const auth = (0, auth_1.getAuth)(firebase_1.app);
            const result = yield (0, auth_1.signInWithPopup)(auth, Provider);
            console.log(result);
            const { data } = yield axios_1.default.post('/api/auth/google', result.user);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            react_hot_toast_1.toast.success('Login Success');
            navigate('/');
        }
        catch (error) {
            console.log(error.message);
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleClick, className: "bg-red-600 text-white font-semibold px-10 py-4 rounded-md", children: " Continue With Google  " }) }));
};
exports.default = OAuth;
