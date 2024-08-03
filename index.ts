import express from 'express';
import dotenv from 'dotenv';
import { connection } from './db/db';
import authRoutes from './routes/authRoutes';
import docsRoutes from './routes/docsRoutes';
import userRoutes from './routes/userRoutes';
import Document from './models/documentSchema';
import { Server, Socket } from 'socket.io';
import http from 'http';
import path from "path"

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/doc', docsRoutes);
app.use('/api/user', userRoutes);



const __dirname1 = path.resolve() 

if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname1 ,"/client/dist")))

   app.get("*", (req,res)=>{
     res.sendFile(path.resolve(__dirname1, "client","dist","index.html"))
   })
}


const Port = process.env.PORT;

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket: Socket) => {
    // console.log(`Connected ${socket.id}`);

    socket.on('join-document', (documentId: string, username : string) => {
        socket.join(documentId);    
        socket.to(documentId).emit("user-joined", username)
        // console.log(`Socket ${socket.id} joined document ${documentId}`);
    });

    socket.on('send-changes', (documentId: string, delta: any) => {
        // console.log('Inside Send Changes : ', documentId , delta);
        socket.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (documentId: string, delta: any) => {
        try {
            // console.log(delta);
            const updatedDocument = await Document.findByIdAndUpdate(documentId, { data: delta } , { new : true});
            await updatedDocument?.save()
            // console.log(updatedDocument);
            // console.log('Document Updated');
        } catch (error) {
            console.error('Error saving document:', error);
        }
    });
});

connection.on('open', () => {
    console.log('Connected to Database');
});

server.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
});
