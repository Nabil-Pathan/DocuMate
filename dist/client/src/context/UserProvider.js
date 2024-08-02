"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const UserContext_1 = __importDefault(require("./UserContext"));
const react_1 = require("react");
const UserProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
            const userInfo = JSON.parse(String(userInfoString));
            setUser({
                user: userInfo.user,
                token: userInfo.token
            });
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(UserContext_1.default.Provider, { value: { user, setUser }, children: children }));
};
exports.default = UserProvider;
