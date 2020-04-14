import React from 'react'
import Form from './Form'
import { startUpdateCategory } from '../../actions/categoriesAction'
import { connect } from 'react-redux'

function CategoryEdit(props){
    const handleSubmit = (formData) => {
        const id = props.match.params.id
        const redirect = () => props.history.push('/categories')
        props.dispatch(startUpdateCategory(formData,id,redirect))
    }
    return(
        <div>
            <h2>Edit Category</h2>
            <Form handleSubmit = {handleSubmit} />
        </div>
    )
}
export default connect()(CategoryEdit)