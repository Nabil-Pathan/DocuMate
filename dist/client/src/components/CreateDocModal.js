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
const react_1 = require("react");
const UserContext_1 = require("../context/UserContext");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_1 = require("react-router-dom");
const CreateDocModal = ({ setShowModal }) => {
    const { user } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [title, setTitle] = (0, react_1.useState)("");
    const handleCreateDocument = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`
                }
            };
            const { data } = yield axios_1.default.post('/api/doc/create', { title }, config);
            react_hot_toast_1.default.success('Document Created');
            if (data.document) {
                navigate(`/document/${data.document._id}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none", children: (0, jsx_runtime_1.jsx)("div", { className: "relative w-full max-w-lg mx-auto my-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-semibold", children: "Create a New Document" }), (0, jsx_runtime_1.jsx)("button", { className: "p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none", onClick: () => setShowModal(false), children: (0, jsx_runtime_1.jsx)("span", { className: "bg-transparent text-black text-center h-6 w-6 text-3xl block outline-none focus:outline-none", children: "\u00D7" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative p-6 flex-auto", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "docTitle", children: "Title of Document" }), (0, jsx_runtime_1.jsx)("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "docTitle", type: "text", placeholder: "Enter document title", onChange: (e) => setTitle(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-around p-6 border-t border-solid border-gray-300 rounded-b", children: [(0, jsx_runtime_1.jsx)("button", { className: "bg-red-600 text-white font-bold uppercase px-8 py-3 text-sm rounded-md shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: () => setShowModal(false), children: "Close" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: handleCreateDocument, children: "Create" })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] }));
};
exports.default = CreateDocModal;
