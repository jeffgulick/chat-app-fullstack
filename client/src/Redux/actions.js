import { CHAT_SERVER } from '../Components/Config';
import axios from 'axios';

export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}
export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}
export const getUserName = (user) => {
    return {
        type: 'GET_USER',
        value: user
    }
}
export function getChats(){
    const request = axios.get(`${CHAT_SERVER}/getChats`)
        .then(response => response.data);
    
    return {
        type: 'GET_CHATS',
        payload: request
    }
}

