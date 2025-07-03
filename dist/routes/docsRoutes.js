"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const docsController_1 = require("../controllers/docsController");
const verifyUser_1 = require("../middlewares/verifyUser");
const router = express_1.default.Router();
router.post('/create', verifyUser_1.verifyToken, docsController_1.createDocController);
router.get('/get/:documentId', verifyUser_1.verifyToken, docsController_1.fetchDocument);
router.get('/getall', verifyUser_1.verifyToken, docsController_1.fetchALlDocuments);
exports.default = router;
