import React from 'react'
import {Link,BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import  NoteList  from './components/notes/List'
import NoteNew from './components/notes/New'
import CategoryList from './components/categories/List'
import CategoryEdit from './components/categories/Edit'
import NoteEdit from './components/notes/Edit'
import Signup from './components/x-auth/Signup'
import Signin from './components/x-auth/Signin'
import Account from './components/x-auth/Account'
import { makeStyles } from '@material-ui/core/styles'; //material design
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { startLogout } from './actions/userAction'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'

//verical tab
function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <Typography>
          {value === index && 
          <Box p={3}>
              {children}
          </Box>}
      </Typography>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }

const useStyles = makeStyles(theme => ({
    
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    //vertical tab
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 224
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
      }
  }));

function App(props){
    const handleLogout = () => {
        props.dispatch(startLogout())
    }
    //material design
    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const handleMenu = event => {
    setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
    setAnchorEl(null);
    };

    return(
       <BrowserRouter>
       { Object.keys(props.user).length == 0 ? (
           <div>
           </div>
       ) :(
        <div style = {{ margin : "-8px"}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" 
                    className={classes.menuButton} 
                    color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                   Notes App
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                        <AccountCircle />
                         </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                            style = {{ top : '48px'}}
                        >
        <MenuItem onClick={handleClose}>
            <Link to="/account">
                Account
            </Link>
        </MenuItem>
        <MenuItem onClick={ () => {
            handleLogout()
        }}>Logout</MenuItem>
      </Menu>
    </div>
  )}
</Toolbar>
</AppBar>
     
        <div className={classes.root} style={{width:'161px',height:"500px",float :'left'}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
            >
               <Link to="/notes">
                    <Tab label="Notes" {...a11yProps(0)} />
               </Link>
               <Link to="/categories">
                    <Tab label="Categories" {...a11yProps(1)} />
                </Link>
            </Tabs>
         </div>
    </div>
       )}
            
            <Switch>
            <Route path="/" component={Signin}  exact={true}/>
              <Route path="/signup" component={Signup} exact={true} />
                <Route path="/signin" component={Signin}  exact={true}/>
                <Route path="/notes" component={NoteList} exact={true}/>
                <Route path="/account" component ={Account} exact={true}/>
                <Route path="/categories" component={CategoryList} exact={true}/>
                <Route path="/notes/new" component={NoteNew} />
                <Route path="/categories/edit/:id" component={CategoryEdit} />
                <Route path="/notes/edit/:id" component={NoteEdit} />
               
            </Switch>
       </BrowserRouter>
    )
}
const mapStateToProps = (state) => {
    return {
        user :  state.user
    }
}
export default connect(mapStateToProps)(App)