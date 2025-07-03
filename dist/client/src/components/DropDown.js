"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Dropdown = ({ open, imageUrl }) => {
    const { setUser } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const dropdownRef = (0, react_1.useRef)(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener('click', closeDropdown);
        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        setIsOpen(!open);
        setUser(null);
        navigate('/login');
        react_hot_toast_1.default.success("Logout Success");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: dropdownRef, className: `${open ? 'z-[-1]' : 'z-0'} relative inline-block text-left`, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { onClick: toggleDropdown, className: 'h-10 w-10 rounded-full object-cover cursor-pointer', src: imageUrl, alt: "" }) }), isOpen && ((0, jsx_runtime_1.jsx)("div", { className: "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "options-menu", children: (0, jsx_runtime_1.jsxs)("div", { className: "py-1", role: "none", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/profile', className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", role: "menuitem", onClick: () => setIsOpen(!isOpen), children: "Profile" }), (0, jsx_runtime_1.jsx)("button", { className: "block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", role: "menuitem", onClick: handleLogout, children: "Logout" })] }) }))] }));
};
exports.default = Dropdown;
