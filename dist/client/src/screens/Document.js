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
const react_router_dom_1 = require("react-router-dom");
require("quill/dist/quill.snow.css");
const quill_1 = __importDefault(require("quill"));
const UseSocket_1 = require("../hooks/UseSocket");
const axios_1 = __importDefault(require("axios"));
const UserContext_1 = require("../context/UserContext");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Document = () => {
    const SAVE_INTERVAL_MS = 2000;
    const { id } = (0, react_router_dom_1.useParams)();
    const [quill, setQuill] = (0, react_1.useState)();
    const socket = (0, UseSocket_1.useSocket)();
    const { user } = (0, UserContext_1.useUserContext)();
    const fetchDocument = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`
                }
            };
            const { data } = yield axios_1.default.get(`/api/doc/get/${id}`, config);
            if (quill) {
                quill.setContents(data.document.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        if (quill && user) {
            fetchDocument();
        }
    }, [quill, user]);
    (0, react_1.useEffect)(() => {
        if (socket == null || quill == null)
            return;
        socket.emit('join-document', id, user === null || user === void 0 ? void 0 : user.user.name);
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user')
                return;
            // Log oldDelta to avoid unused variable error
            console.log('Previous Changes:', oldDelta);
            socket.emit('send-changes', id, delta);
        };
        quill.on('text-change', handler);
        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill]);
    (0, react_1.useEffect)(() => {
        if (socket == null || quill == null)
            return;
        const receiveHandler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on('receive-changes', receiveHandler);
        return () => {
            socket.off('receive-changes', receiveHandler);
        };
    }, [socket, quill]);
    (0, react_1.useEffect)(() => {
        if (socket == null || quill == null)
            return;
        const interval = setInterval(() => {
            socket.emit('save-document', id, quill.getContents());
        }, SAVE_INTERVAL_MS);
        return () => {
            clearInterval(interval);
        };
    }, [socket, quill]);
    (0, react_1.useEffect)(() => {
        if (socket == null || quill == null)
            return;
        const handler = (username) => {
            if (username !== (user === null || user === void 0 ? void 0 : user.user.name)) {
                react_hot_toast_1.default.success(`${username} joined the document`);
            }
        };
        socket.on("user-joined", handler);
        return () => {
            socket.off("user-joined", handler);
        };
    }, [socket, quill]);
    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ align: [] }],
        ['image', 'blockquote', 'code-block'],
        ['clean'],
    ];
    const wrapperRef = (0, react_1.useCallback)((wrapper) => {
        if (wrapper == null)
            return;
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new quill_1.default(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
        setQuill(q);
    }, []);
    const handleCopyUrl = () => __awaiter(void 0, void 0, void 0, function* () {
        const url = window.location.href;
        yield navigator.clipboard.writeText(url);
        react_hot_toast_1.default.success("Url Copied");
    });
    const handleDownload = () => {
        if (!quill)
            return;
        const doc = document.createElement("html");
        const body = document.createElement("body");
        const head = document.createElement("head");
        const style = document.createElement("style");
        style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
        }
    `;
        head.appendChild(style);
        body.innerHTML = quill.root.innerHTML;
        doc.appendChild(head);
        doc.appendChild(body);
        const blob = new Blob(['<!DOCTYPE html>', doc.outerHTML], {
            type: 'application/msword',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = 'document.doc';
        a.click();
        URL.revokeObjectURL(url);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center justify-end gap-4 px-4 py-3', children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleCopyUrl, className: 'bg-blue-600 text-white px-4 py-3 rounded mb-2', children: "Share" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleDownload, className: 'bg-green-600 text-white px-4 py-3 rounded mb-2', children: "Download" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'container', ref: wrapperRef })] }));
};
exports.default = Document;
