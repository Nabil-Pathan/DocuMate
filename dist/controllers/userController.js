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
exports.updateProfile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, password, pic } = req.body;
        const userId = req.user._id;
        const user = yield userSchema_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if (password !== "") {
            password = yield bcryptjs_1.default.hash(password, 10);
        }
        else {
            // If password is not provided, remove it from the update object
            password = undefined;
        }
        const updateObject = { name, email, pic };
        if (password !== undefined) {
            updateObject.password = password;
        }
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, {
            $set: updateObject
        }, { new: true });
        updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.save();
        res.status(200).json({ message: "User Updated", user: updatedUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateProfile = updateProfile;
