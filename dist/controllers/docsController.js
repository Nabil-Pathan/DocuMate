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
exports.fetchALlDocuments = exports.fetchDocument = exports.createDocController = void 0;
const documentSchema_1 = __importDefault(require("../models/documentSchema"));
const createDocController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { title } = req.body;
        const newDocument = yield documentSchema_1.default.create({
            title: title,
            data: '',
            owner: userId
        });
        return res.status(201).json({ message: "Document Created", document: newDocument });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createDocController = createDocController;
const fetchDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.params;
        if (!documentId) {
            return res.status(400).json({ error: "Document not found" });
        }
        const document = yield documentSchema_1.default.findById(documentId);
        if (!document) {
            return res.status(400).json({ error: "Document not found" });
        }
        return res.status(200).json({ document });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.fetchDocument = fetchDocument;
const fetchALlDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const documents = yield documentSchema_1.default.find({ owner: userId });
        return res.json({ documents });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.fetchALlDocuments = fetchALlDocuments;
