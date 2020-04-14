export const findNote = (notes,id) => {
    return notes.find(note => note._id == id)
}