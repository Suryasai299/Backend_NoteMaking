import express from 'express'
import { createNote , getAllNotes , updateNote , deleteNote , renderMarkdown , uploadFiles  } from '../controllers/noteController.js'
import protect from '../middleware/authMIddleware.js'
import upload from "../middleware/uploadMiddleware.js"
import checkRole from '../middleware/roleMiddleware.js'

const router = express.Router()

router.post('/createNote',protect ,createNote)

router.get('/getAllNotes',protect ,getAllNotes)
router.get('/render/:id', protect, renderMarkdown)

router.put('/updateNote/:id',protect , updateNote)
router.delete('/deleteNote/:id',protect ,checkRole(['Admin','User']), deleteNote)

router.post("/upload", protect , upload.array("files", 5), uploadFiles)

export default router