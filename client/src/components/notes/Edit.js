import React from 'react'
import NoteForm from './Form'
import { connect } from 'react-redux'
import { statUpdateNote } from '../../actions/notesAction'

function NoteEdit (props) {
    const handleSubmit = (formData) => {
        const id = props.match.params.id
        const redirect = () => props.history.push('/notes')
        props.dispatch(statUpdateNote(formData, id, redirect))
    }
    return(
        <div >
            <h2 style={{marginLeft : '177px'}}>Edit Note</h2>
            <NoteForm handleSubmit = {handleSubmit}/>
        </div>
    )
}
export default connect ()(NoteEdit)

