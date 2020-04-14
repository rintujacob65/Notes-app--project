import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { startSetNotes,startRemoveNote} from '../../actions/notesAction'
import { startSetCategories } from '../../actions/categoriesAction'
import Swal from 'sweetalert2'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit';

function NoteList(props){
    if(props.notes.length == 0 ){
        props.dispatch(startSetCategories())
        props.dispatch(startSetNotes())
    }
    const  handleRemove = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              props.dispatch(startRemoveNote(id))
            }
            
          })
        }
    
    
    return(
        <Container maxWidth="md">
            {
                 props.notes? 
                (
                    <Container>
                     <Grid container>
                         <Grid item xs={6}>
                            <h2>Notes-{props.notes.length}</h2>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/notes/new">
                                <NoteAddIcon titleAccess="Add note" 
                                style={{marginTop : "23px"}}/>
                            </Link>
                        </Grid>
                     </Grid>
                      <Grid item lg={12}>
                                {
                                  props.notes &&  props.notes.map(note => {
                                        return <Card key={note._id} style={{backgroundColor:"#c8cfd6",float : "left",margin:"3px"}}>
                                        <CardContent >
                                        <h2>{note.title}</h2>
                                        <Typography>Description : {note.body}</Typography>
                                   { props.categories.name !==  0 && 
                                    (<Typography> Category :{note.category.name}</Typography>)}
                                       <Grid container style = {{marginTop : "20px"}}>
                                        <Grid item xs={6}>
                                            <Link to={`/notes/edit/${note._id}`}>
                                                    <EditIcon titleAccess="Edit note"/>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={6}><Link to="/notes">
                                                <DeleteIcon titleAccess="Delete note"
                                                onClick={() =>{
                                                    handleRemove(note._id)
                                                }} style={{marginBottom:"20px"}}  />
                                                
                                                </Link>
                                            </Grid>
                                       </Grid>
                                        </CardContent>
                                        </Card> 
                                     })
                                }
                            </Grid>
                        
           
           </Container>
                ) : (
                    <div>
                        <p>loading</p>
                    </div>
                )
            }
        
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        notes : state.notes,
        categories : state.categories 
    }
}
export default connect(mapStateToProps)(NoteList)