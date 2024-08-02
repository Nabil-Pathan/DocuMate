import { Request , Response } from "express"
import Document from "../models/documentSchema"

export const createDocController = async (req : Request | any , res : Response)=>{
    try {
        const userId = req.user._id
        
        const { title } = req.body

        const newDocument = await Document.create({
            title : title,
            data : '',
            owner : userId
        })

        return res.status(201).json({message : "Document Created", document: newDocument})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal Server Error"})
    }
}


export const fetchDocument = async (req : Request , res : Response)=>{
    try {
         const { documentId } = req.params

         if(!documentId){
            return res.status(400).json({error : "Document not found"})
         }

         const document = await Document.findById(documentId)
         
         if(!document){
            return res.status(400).json({error : "Document not found"})
         }
         return res.status(200).json({document})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal Server Error"})
    }
}



export const fetchALlDocuments = async (req : Request | any , res : Response)=>{
    try {
       
        const userId = req.user._id

        const documents = await Document.find({owner : userId})

       return res.json({documents})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal Server Error"})
    }
}

