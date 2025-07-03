import express from "express"
import { createDocController, fetchALlDocuments, fetchDocument } from "../controllers/docsController"
import { verifyToken } from "../middlewares/verifyUser"

const router = express.Router()

router.post('/create',verifyToken , createDocController)
router.get('/get/:documentId',verifyToken,  fetchDocument)
router.get('/getall', verifyToken, fetchALlDocuments)

export default router