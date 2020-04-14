import React from 'react'
import { connect } from 'react-redux'
import { findNote } from '../../selectors/noteSelector'
import { withRouter} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import  TextareaAutosize  from '@material-ui/core/TextareaAutosize'
import { Select } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import MenuItem  from '@material-ui/core/MenuItem'

class NoteForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : props.note ? props.note.title :'',
            body : props.note ? props.note.body : '',
            category : props.note ? props.note.category._id :''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            body : this.state.body,
            category : this.state.category
        }
        this.props.handleSubmit(formData)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
            <Container style={{maxWidth : '500px'}}>
                <form onSubmit={this.handleSubmit}>
                    <ListItem text>
                        <ListItemText primary="Title" />
                        <TextField primary="Title"
                             value={this.state.title}
                             onChange={this.handleChange} 
                             name="title" 
                             id="title"
                        />
                    </ListItem>
                    <ListItem text>
                        <ListItemText primary="Description" />
                        <TextareaAutosize primary="Description"
                             value={this.state.body}
                             name="body"
                             onChange={this.handleChange} 
                             id="body"
                             style = {{ width : '195px'}}
                        />
                    </ListItem>
                    <ListItem text>
                        <ListItemText primary="Category" />
                        <Select id="category" name="category" 
                        value={this.state.category} 
                        onChange={this.handleChange}
                        style = {{ width : '195px'}}
                        >
                        <MenuItem  defaultValue>select</MenuItem >
                        {
                             this.props.category ? this.props.category.map(category => {
                                return (<MenuItem  key={category._id} value={category._id}>{category.name}</MenuItem >)
                            }) : 'loading'
                        }
                    </Select>
                    </ListItem>

                    <Input   type="submit" 
                        style={{ backgroundColor : '#3f51b5',
                        width : '150px',
                        height : '50px',
                        margin: '49px 5px 0px 145px',
                        borderRadius: '9px',
                        color : '#fff',
                        cursor: 'pointer'}}/>
                </form>
            </Container>
        )
    }
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        category : state.categories,
        note : findNote(state.notes,id)
    }
}
export default withRouter(connect(mapStateToProps)(NoteForm))