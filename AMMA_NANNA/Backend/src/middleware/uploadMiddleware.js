import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads/'
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir , { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , uploadDir)
    },
    filename: ( req, file , cb ) => {
        const uniqueSuffix  = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null , uniqueSuffix + path.extname(file.originalname))
    }
})
const fileFilter = ( req , file , cb ) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf" , "text/markdown", "text/plain"]
    if (allowedTypes.includes(file.mimetype)){
        cb(null , true)
    } else {
        cb(new Error("Invalid file type, Only Allows : JPEG , PNG , PDF , MARKDOWN AND TEXT "), false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5MB limit
    fileFilter 
})

export default upload