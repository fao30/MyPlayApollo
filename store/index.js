//index.js file for store using redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import userReducer from './reducer/userReducer'

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
