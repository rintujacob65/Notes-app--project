import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'

function Account (props){
    return(
        <div>
            <Card style={{width : "400px",margin : "0 auto"}}>
               <CardContent>
                    <h2>User Account Info</h2>
                    <h3>Name--{props.user.firstname}</h3>
                    <h3>Email--{props.user.email}</h3>
               </CardContent>
            </Card>
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}
export default connect(mapStateToProps)(Account)