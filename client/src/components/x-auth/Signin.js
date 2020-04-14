import React from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { startSignin } from '../../actions/userAction'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
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
            email : this.state.email , 
            password : this.state.password
        }
        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(startSignin(formData,redirect))
    }
    render(){
        return(
            <div>
                <Card style={{width : "400px",margin : "0 auto"}}>
                    <CardContent>
                        <h3 style={{textAlign : "center"}}>Sign in</h3>
                        <form noValidate autoComplete="off" style={{width : "100%"}}
                             onSubmit={this.handleSubmit}>
                            <TextField 
                                 variant="outlined"
                                 margin="normal"
                                 required
                                 fullWidth
                                 id="email"
                                 label="Email Address"
                                 name="email"
                                autoComplete="email"
                                autoFocus
                                value = {this.state.email}
                                onChange = { this.handleChange}
                             />
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value = {this.state.password}
                                onChange = { this.handleChange}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control = { <Checkbox value = "remember" color = "primary" /> }
                                label = "Remember me"
                            />
                            <Button 
                                type = "submit"
                                fullWidth
                                variant = "contained" 
                                color = "primary"
                                style = {{marginTop : "20px"}}
                               >
                                SIGN IN
                            </Button>
                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item style = {{marginTop : "20px"}}>
                                    <Link to = "/signup" >
                                    Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withRouter(connect()(Signin))