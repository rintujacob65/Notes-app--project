const notesInitialState = []

const notesReducer = (state = notesInitialState, action) => {
    switch(action.type) {
        case 'SET_NOTES' : {
            return [...action.payload]
        }
        case 'REMOVE_NOTE' : {
            return state.filter (note => note._id != action.payload)
        }
        case 'UPDATE_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id) {
                    return {...note, ...action.payload}
                } else {
                    return { ...note}
                }
            })
        }
        default : {
            return [...state]
        }
    }
}
export default notesReducer