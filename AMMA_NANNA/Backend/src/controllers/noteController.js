import Note from '../models/Note.js'
import User from '../models/User.js'
import { marked } from 'marked'
import path from 'path'
import fs from 'fs'

const ensureUploadsDirectory = () => {
    const uploadsDir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
    }
    return uploadsDir
}

//helper
const saveMarkdownFile = ( title , content) => {
    const fileName = `${Date.now()}-${title.replace(/\s+/g,'_')}.md`
    const filePath = path.join('uploads',fileName)
    fs.writeFileSync(filePath , content )
    return filePath
}

export const renderMarkdown = async ( req , res ) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id)

        if(!note){
            return res.status(404).json({ error: 'Note not found with the given ID '})
        }
        const renderedHTML = marked(note.content)

        res.status(200).json({
            markdown: note.content,
            html: renderedHTML
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error rendering Markdown'})
    }
}

// create note and save as a file
export const createNote = async (req , res ) => {
 try {
    const { title  , content , tags } = req.body

    if(!title || !content){
        return res.status(400).json({error: "Title and content required "})
    }
    ensureUploadsDirectory()
    const userId = req.user.id
    const filePath = saveMarkdownFile(title , content )

    const newNote = new Note({ 
        title ,
        content ,
        tags ,
        filePaths: [filePath],
        user: userId
        })
    await newNote.save()

    await User.findByIdAndUpdate(userId , { $push: { notes: newNote._id}})
 
    res.status(201).json(newNote)
 }
 catch (error){
    res.status(500).json({ error: ' Error creating note '})
 }
}

// get a note by id and will read content from file
export const getNoteById =async ( req, res ) => {
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({ error: ' Note not found '})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({ error: ' Unauthorizeed'})
        }
        const filePath = note.filePaths[0]
        if(filePath && fs.existsSync(filePath)){
            note.content = fs.readFileSync(filePath, 'utf-8')
        }
        res.status(200).json(note)
    } catch (error){
        res.status(500).json({ error : ' Error fetching note '})
    }
}

export const getAllNotes = async (req , res ) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch(error){
        res.status(500).json({ error: ' Error fetching Notes '})
    }
}

// update note and overwrite file
export const updateNote = async (req, res)=> {
    try {
        const { id } = req.params
        const { title , content , tags } = req.body

        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({ error: ' Note not found '})
        }

        const filePath = note.filePaths[0]
        if( filePath && fs.existsSync(filePath)){
            fs.writeFileSync(filePath , content)
        }

        note.title = title || note.title
        note.content = content || note.content
        note.tags = tags || note.tags
        await note.save()

        res.status(200).json({ message: 'Note updated Successfully', note})
    } catch ( error ){
        res.status(500).json({ error: ' Error Updating Note'})
    }
}

export const deleteNote = async (req, res )=> {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({error: 'Note not found -Issue with the Id '})
        }

        if( req.user.role !== 'Admin' && note.user.toString() !== req.user.id){
            return res.status(403).json({error: 'Unauthorized - Access '})
        }
        const filePath = note.filePaths[0]
        if(filePath && fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }

        await Note.findByIdAndDelete(id)
        res.status(200).json({ message : ' Note Deleted Successfully '})
    } catch (error) {
        res.status(500).json({error:'Error deleting note'})
    }
}

export const uploadFiles = async ( req , res) => {
    try {
        if(!req.files || req.files.length === 0){
            return res.status(400).json({error: "No files uploaded"})
        }

        const note = await Note.findById(req.body.noteId)
        if(!note){
            return res.status(404).json({error:"Note not found "})
        }
        req.files.forEach( file => {
            if(!note.filePaths.includes(file.path)){
                note.filePaths.push(file.path)
            }
        })
        await note.save()

        res.status(200).json({ message: "File uploaded successfully ", filepaths: note.filePaths})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: " Error uploading file "})
    }
}