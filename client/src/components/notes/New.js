import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { startAddNote } from '../../actions/notesAction'

function NoteNew(props){
    const handleSubmit = (formData) => {
      const redirect = () => props.history.push('/notes')  
        props.dispatch(startAddNote({formData, redirect}))
    }
    return(
        <div>
            <h2>Add Note</h2>
            <Form handleSubmit = { handleSubmit}/>
        </div>
    )
}
export default connect()(NoteNew)