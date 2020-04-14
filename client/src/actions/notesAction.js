import axios from '../config/axios'
import Swal from 'sweetalert2' 

export const setNotes = (notes) => {
    return {
        type : 'SET_NOTES',
        payload : notes
    }
}
export const startSetNotes = () => {
    return(dispatch) => {
        axios.get('/notes',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            console.log("data",response.data)
            const notes = response.data
            dispatch(setNotes(notes))
        })
    }
}

export const startAddNote = (obj) => {
    return(dispatch) => {
        axios.post('/notes',obj.formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
           console.log("addnote",response.data)
           Swal.fire(
               'Added',
               'Note Successfully created',
               'success'
           )
           dispatch(startSetNotes())
           obj.redirect()
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const removeNote = (id) =>{
    return {
        type : 'REMOVE_NOTE',
        payload : id
    }
}
export const startRemoveNote = (id) => {
    return(dispatch) => {
        axios.delete(`/notes/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const note = response.data
            dispatch(removeNote(note._id))
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const updateNote = (note) => {
    return {
        type : 'UPDATE_NOTE',
        payload : note
    }
}
export const statUpdateNote = (formData, id, redirect) =>{
    return(dispatch) =>{
        axios.put(`/notes/${id}`, formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const note = response.data
            Swal.fire(
                'updated',
                'Note Successfully updated',
                'success'
            )
            dispatch(updateNote(note))
            dispatch(startSetNotes())
            redirect()
        })
        .catch((err) => {
            console.log(err)
        })
    }
}