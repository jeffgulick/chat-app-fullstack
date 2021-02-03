import { combineReducers } from 'redux';
import initState from './state';

const loggedIn = (state = initState, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return true
        case 'SIGN_OUT':
            return false
        default:
            return state
    }
}
const getUserName = (state = {}, action) => {
    switch(action.type){
        case 'GET_USER':
            return action.value;
        default:
            return state
    }
}
const chats = (state={},action)=>{
    switch(action.type){
        case 'GET_CHATS':
            return {...state, chats: action.value }
        default:
            return state;
    }
}
export default combineReducers({ loggedIn, getUserName, chats })