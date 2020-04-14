import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CategoryNew from './New'
import { startSetCategories,startRemoveCategory} from '../../actions/categoriesAction'
import Swal from 'sweetalert2' 
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
import {Button} from '@material-ui/core'

function CategoryList(props){
    if(props.categories.length == 0) {
        props.dispatch(startSetCategories())
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
          props.dispatch(startRemoveCategory(id))
        }
        
      })
    }

    return(
        <div>
             <Card style={{width : "400px",margin : "0 auto"}}>
               <CardContent>
               { props.categories ?(
               <div>
                    <h2>Categories -{props.categories.length}</h2>
                    <table>
                        <tbody>
                        {
                         props.categories.map((category,i) => {
                            return <tr key={i}>
                            <td>{category.name}</td>
                            <td>
                                <Link to={`/categories/edit/${category._id}`}>
                                    <Button  variant="contained"  color="primary">EDIT</Button>
                                </Link>
                            </td>
                            <td>
                                <Link to="/categories">
                                    <Button variant="contained" color="secondary" onClick={() => {
                                        handleRemove(category._id)
                                    }}>
                                        REMOVE
                                    </Button>
                                </Link>
                            </td>
                            </tr>
                            })
                        }
                        </tbody>
                    </table>
                    <CategoryNew/>
                </div>
           ) : (
               <div>
                   <p> loading...</p>
               </div>
           )
           
            }
               </CardContent>
              </Card>
          
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        categories : state.categories
    }
}
export default connect(mapStateToProps)(CategoryList)