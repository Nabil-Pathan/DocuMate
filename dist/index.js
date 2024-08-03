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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const docsRoutes_1 = __importDefault(require("./routes/docsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const documentSchema_1 = __importDefault(require("./models/documentSchema"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/doc', docsRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
const __dirname1 = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname1, "/client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname1, "client", "dist", "index.html"));
    });
}
const Port = process.env.PORT;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    // console.log(`Connected ${socket.id}`);
    socket.on('join-document', (documentId, username) => {
        socket.join(documentId);
        socket.to(documentId).emit("user-joined", username);
        // console.log(`Socket ${socket.id} joined document ${documentId}`);
    });
    socket.on('send-changes', (documentId, delta) => {
        // console.log('Inside Send Changes : ', documentId , delta);
        socket.to(documentId).emit('receive-changes', delta);
    });
    socket.on('save-document', (documentId, delta) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(delta);
            const updatedDocument = yield documentSchema_1.default.findByIdAndUpdate(documentId, { data: delta }, { new: true });
            yield (updatedDocument === null || updatedDocument === void 0 ? void 0 : updatedDocument.save());
            // console.log(updatedDocument);
            // console.log('Document Updated');
        }
        catch (error) {
            console.error('Error saving document:', error);
        }
    }));
});
db_1.connection.on('open', () => {
    console.log('Connected to Database');
});
server.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
});
