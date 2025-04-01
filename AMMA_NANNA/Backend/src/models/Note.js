import mongoose from 'mongoose'

export const noteSchema = new mongoose.Schema({
    title:{ 
        type: String ,
        required: true
     },
    content: {
         type: String , 
         required: true
        },
    tags: {
        type: [String],
        default: [],
    },
    filePaths: {
        type: [String],
        default: []
    }
},
{ 
    timestamps: true 
})

const Note = mongoose.model('Note', noteSchema)
export default Note

