"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = void 0;
const react_1 = require("react");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const END_POINT = "https://documate-3c2s.onrender.com";
// const END_POINT = "http://localhost:5000"
const useSocket = () => {
    const [socket, setSocket] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!socket) {
            const newSocketConnection = (0, socket_io_client_1.default)(END_POINT);
            setSocket(newSocketConnection);
        }
    }, []);
    return socket;
};
exports.useSocket = useSocket;
