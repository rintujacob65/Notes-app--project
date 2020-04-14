import { createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import notesReducer from '../reducers/notesReducer'
import categoriesReducer from '../reducers/categoriesReducer'
import userReducer from '../reducers/userReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        notes : notesReducer,
        categories : categoriesReducer,
        user : userReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore

