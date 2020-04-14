import React from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { findCategory } from '../../selectors/categorySelector'

class CategoryForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.category ? props.category.name :''
        }
    }
    handleChange = (e) => {
       this.setState({
           [e.target.name] : e.target.value
       })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
        }
        this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} 
                            onChange={this.handleChange} name="name"/>
                    <input variant="contained"
        color="primary" type="submit"/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        category : findCategory(state.categories,id)
    }
}
export default withRouter(connect(mapStateToProps)(CategoryForm))