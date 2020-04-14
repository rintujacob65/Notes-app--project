import React from 'react'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import { startRegister } from '../../actions/userAction'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            password : ''
        }
    }
    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            firstname :this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password
        }
        console.log("signup", formData)
        const redirect = () => {
            return this.props.history.push('/signin')
        }
        this.props.dispatch(startRegister(formData,redirect))
    }
    render(){
        return(
            <div>
                 <div>
                <Card style={{width : "400px",margin : "0 auto",border : "1px"}}>
                    <CardContent>
                        <h3 style={{textAlign : "center"}}>Sign Up</h3>
                        <form noValidate autoComplete="off" style={{width : "100%"}}
                            onSubmit = {this.handleSubmit}>
                            <Grid container spacing = {2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="First Name"
                                        name="firstname"
                                        autoComplete="firstname"
                                        autoFocus
                                        value = { this.state.firstname}
                                        onChange = {this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="Last Name"
                                        autoFocus
                                        value = { this.state.lastname}
                                        onChange = {this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs ={12}>
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
                                        value = { this.state.email}
                                        onChange = {this.handleChange}
                                    />
                                </Grid>
                            <Grid item xs ={12}>
                                <TextField 
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange = {this.handleChange}
                                    value = { this.state.password}
                                />
                            </Grid>
                        </Grid>
                           <Button 
                                type = "submit"
                                fullWidth
                                variant = "contained" 
                                color = "primary"
                                style = {{marginTop : "20px"}}
                               >
                                SIGN UP
                            </Button>
                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item style = {{marginTop : "20px"}}>
                                    <Link to = "/signin" >
                                    Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
            </div>
        )
    }
}

export default connect()(Signup)