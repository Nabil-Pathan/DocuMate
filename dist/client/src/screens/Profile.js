"use strict";
"use client";
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
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const storage_1 = require("firebase/storage");
const firebase_1 = require("../firebase");
const axios_1 = __importDefault(require("axios"));
const Loader_1 = __importDefault(require("../components/Loader"));
const Profile = () => {
    var _a, _b, _c;
    const { user, setUser } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const fileRef = (0, react_1.useRef)(null);
    const [name, setName] = (0, react_1.useState)((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.name);
    const [email, setEmail] = (0, react_1.useState)((_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.email);
    const [pic, setPic] = (0, react_1.useState)((_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.pic);
    const [file, setFile] = (0, react_1.useState)();
    const [uploading, setUploading] = (0, react_1.useState)(false);
    // const [filePer, setFilePer] = useState<number | null>()
    const [password, setPassword] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (user && user.user) {
            setName(user.user.name);
            setEmail(user.user.email);
            setPic(user.user.pic);
        }
        else {
            // Fetch user data from local storage if available
            const storedUser = JSON.parse(localStorage.getItem("userInfo") || '{}');
            if (storedUser && storedUser.user) {
                setUser(storedUser);
                setName(storedUser.user.name);
                setEmail(storedUser.user.email);
                setPic(storedUser.user.pic);
            }
        }
    }, [user, setUser]);
    const handleLogout = () => {
        try {
            localStorage.removeItem("userInfo");
            setUser(null);
            react_hot_toast_1.default.success("Logout Successful");
            navigate('/login');
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleFileUpload = (file) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setUploading(true);
            const storage = (0, storage_1.getStorage)(firebase_1.app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = (0, storage_1.ref)(storage, fileName);
            const uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
                // setFilePer(progress)
            }, (error) => {
                console.log(error);
                setUploading(false);
            }, () => {
                (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setPic(downloadUrl);
                    setUploading(false);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setFile(file);
        }
    };
    (0, react_1.useEffect)(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);
    const handleUpdate = (e) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            e.preventDefault();
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`
                }
            };
            const { data } = yield axios_1.default.post(`/api/user/update`, { name, email, password, pic }, config);
            setUser({
                user: data.user,
                token: user === null || user === void 0 ? void 0 : user.token // retain the current token
            });
            localStorage.setItem("userInfo", JSON.stringify({
                user: data.user,
                token: user === null || user === void 0 ? void 0 : user.token
            }));
            setLoading(false);
            react_hot_toast_1.default.success("Profile updated successfully");
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: 'min-h-screen flex flex-col items-center bg-gray-100 py-8', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full md:max-w-md rounded-lg p-6', children: user && user.user ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col items-center mb-6', children: [(0, jsx_runtime_1.jsx)("input", { hidden: true, accept: 'image/*', ref: fileRef, className: 'hidden', type: "file", onChange: handleFileChange }), (0, jsx_runtime_1.jsx)("img", { onClick: () => fileRef.current && fileRef.current.click(), src: pic, alt: "Profile Picture", className: 'cursor-pointer h-24 w-24 rounded-full object-cover mb-4' }), uploading && ((0, jsx_runtime_1.jsx)("h1", { className: 'text-xl mt-3', children: "Uploading..." })), (0, jsx_runtime_1.jsxs)("h1", { className: 'text-3xl font-bold text-center mb-2', children: ["Hello, ", user.user.name] }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 text-center', children: user.user.email })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleUpdate, className: 'space-y-4', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: 'name', className: 'block text-gray-700 font-semibold mb-1', children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', id: 'name', value: name, onChange: (e) => setName(e.target.value), className: 'shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: 'email', className: 'block text-gray-700 font-semibold mb-1', children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: 'email', id: 'email', value: email, onChange: (e) => setEmail(e.target.value), className: 'shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: 'password', className: 'block text-gray-700 font-semibold mb-1', children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: 'password', id: 'password', value: password, onChange: (e) => setPassword(e.target.value), className: 'shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' })] }), (0, jsx_runtime_1.jsx)("div", { className: 'flex items-center justify-between', children: (0, jsx_runtime_1.jsx)("button", { type: 'submit', className: 'bg-gray-800 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline', children: "Update" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-6', children: (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: 'w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline', children: "Logout" }) })] })) : ((0, jsx_runtime_1.jsx)("h1", { className: 'text-center text-gray-700', children: "Loading..." })) }) })) }));
};
exports.default = Profile;
