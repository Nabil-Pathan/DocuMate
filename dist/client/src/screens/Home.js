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
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const CreateDocModal_1 = __importDefault(require("../components/CreateDocModal"));
const document2_png_1 = __importDefault(require("../images/document2.png"));
const Loader_1 = __importDefault(require("../components/Loader"));
const react_router_dom_2 = require("react-router-dom");
const Home = () => {
    const { user } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [documents, setDocuments] = (0, react_1.useState)([]);
    const fetchDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`
                }
            };
            const { data } = yield axios_1.default.get(`/api/doc/getall`, config);
            setDocuments(data.documents);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);
    const handleShowModal = () => {
        if (user === null) {
            navigate('/login');
        }
        setShowModal(true);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showModal ? ((0, jsx_runtime_1.jsx)(CreateDocModal_1.default, { setShowModal: setShowModal })) : loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: 'container mx-auto md:px-10 px-4 md:py-8 py-3', children: (0, jsx_runtime_1.jsxs)("div", { className: 'grid md:grid-cols-5 grid-cols-2', children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleShowModal, children: (0, jsx_runtime_1.jsx)("div", { className: 'bg-gray-200  flex items-center justify-center py-12', children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { className: 'text-3xl', icon: free_solid_svg_icons_1.faPlus }) }) }), documents.map((document) => {
                        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/document/${document._id}`, children: (0, jsx_runtime_1.jsxs)("div", { className: 'p-3 flex flex-col items-center justify-center ', children: [(0, jsx_runtime_1.jsx)("img", { className: 'h-28 w-28', src: document2_png_1.default, alt: "" }), (0, jsx_runtime_1.jsx)("h1", { className: 'text-center  font-bold', children: document.title })] }) }) }));
                    })] }) })) }));
};
exports.default = Home;
