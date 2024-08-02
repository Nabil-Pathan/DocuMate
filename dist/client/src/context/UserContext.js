"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserContext = void 0;
const react_1 = require("react");
const UserContext = (0, react_1.createContext)(null);
const useUserContext = () => {
    const context = (0, react_1.useContext)(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
exports.useUserContext = useUserContext;
exports.default = UserContext;
