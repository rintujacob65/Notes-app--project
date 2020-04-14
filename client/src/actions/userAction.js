import axios from '../config/axios'
import swal from 'sweetalert'

export const startRegister = (formData,redirect) => {
    return(dispatch) => {
        axios.post('/signup',formData)
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.message}`, "","error")
            } else {
                swal("Successfully Registered","","success")
               redirect()
               dispatch(setUser(response.data.user))
            }
           
        })
    }
}

export const setUser = (user) => {
    return { type : 'SET_USER', payload : user}
}
// export const startSetUser = () => {
//     console.log("startSetUser")
//     return(dispatch) => {
//         axios.get('/account', {
//             headers : {
//                 'x-auth' : localStorage.getItem('authToken')
//             }
//         })
//         .then((response) => {
//            // const user = response.data
//            // console.log('setuser', user)
//             dispatch(setUser(response.data.user))
//         })
//     }
// }
export const startSetUser = () => {
    return(dispatch) => {
        axios.get('/account',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const user = response.data
            dispatch(setUser(user))
           
        })
    }   
}

export const startSignin = (formData,redirect) => {
    return (dispatch) => {
        axios.post('/signin',formData)
        .then(response => {
            if(response.data.hasOwnProperty('error')){
                swal(`${response.data.error}`,"","error")
            } else {
                console.log("account",response.data.token)
                if( response.data.token) {
                    localStorage.setItem('authToken',response.data.token)
                //redirect()
                axios.get('/account',{
                    headers : {
                        'x-auth' : localStorage.getItem('authToken')
                    }
                })
                .then((response) => {
                    const user = response.data
                    console.log("login",user)
                    dispatch(setUser(user))
                    redirect()
                })
                } else {
                    swal('invalid email/password ',"","error")
                }
                
            }
        })
    }

}
export const removeUser = () => {
    return { type : 'REMOVE_USER' }
}

export const startLogout = () => { 
    return (dispatch) => {
         axios.delete('/logout', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
       
        .then((response) =>{  
            if(response.data.notice){ 
                console.log("authremove")
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                window.location.href = "/signin"
            }
        })
    }
}
