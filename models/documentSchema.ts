import mongoose , { Document as MongooseDocument} from "mongoose";

interface Document extends MongooseDocument {
    title : string
    data: any;
    owner: mongoose.Schema.Types.ObjectId;
    collaborators : mongoose.Schema.Types.ObjectId[]
}

const DocumentSchema = new mongoose.Schema<Document>({
    title : {
        type : String,
        required : true
    },
    data: Object,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model<Document>('Document', DocumentSchema);