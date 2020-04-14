import axios from '../config/axios'

export const setCategories = (categories) => {
    return {
        type : 'SET_CATEGORIES',
        payload : categories
    }
}
export const startSetCategories = () =>{
    return(dispatch) => {
        axios.get('/categories',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const categories = response.data
            dispatch(setCategories(categories))
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const addCategory = (category) => {
    return {
        type : 'ADD_CATEGORY',
        payload : category
    }
}
export const startAddCategory = (formData) => {
    return(dispatch) => {
        axios.post('/categories', formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const category = response.data
            console.log("catgories data",category)
            dispatch(addCategory(category))
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const removeCategory = (id) => {
    return {
        type : 'REMOVE_CATEGORY',
        payload : id
    }
}
export const startRemoveCategory = (id) => {
   return(dispatch) => {
       axios.delete(`/categories/${id}`,{
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
       .then((response) => {
           const category = response.data
           dispatch(removeCategory(category._id))
       })
       .catch((err) =>{
        console.log(err)
        })
   }
}

export const updateCategory = (category) => {
    return {
        type : 'UPDATE_CATEGORY',
        payload : category
    }
}
export const startUpdateCategory = (formData,id,redirect) =>{
    return(dispatch) => {
        axios.put(`/categories/${id}`,formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const category = response.data
            dispatch(updateCategory(category))
            redirect()
        })
        .catch((err) => {
            console.log(err)
        })
    }
}