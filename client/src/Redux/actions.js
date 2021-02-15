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
export const getUser = (user) => {
    return {
        type: 'GET_USER',
        value: user
    }
}
export function getChats(){
    const request = axios.get('/api/messages/getChats')
        .then(response => response.data);
    
    return {
        type: 'GET_CHATS',
        value: request
    }
}
export function afterPostMessage(data){

    return {
        type: 'AFTER_POST_MESSAGE',
        value: data
    }
}

