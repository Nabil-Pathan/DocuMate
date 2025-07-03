"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../middlewares/verifyUser");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/update', verifyUser_1.verifyToken, userController_1.updateProfile);
exports.default = router;
