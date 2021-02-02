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
export default combineReducers({ loggedIn })