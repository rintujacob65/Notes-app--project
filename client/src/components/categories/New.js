import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { startAddCategory } from '../../actions/categoriesAction'

function CategoryNew(props){
    const handleSubmit = (formData) => {
        props.dispatch(startAddCategory(formData))    
    }
    return(
        <div>
            <h2>Add Category</h2>
            <Form handleSubmit = {handleSubmit}/>
        </div>
    )
}
export default connect()(CategoryNew)