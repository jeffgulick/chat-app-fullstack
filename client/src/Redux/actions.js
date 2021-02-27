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
export const getRecipient = (user) => {
    return {
        type: 'GET_RECIPIENT',
        value: user
    }
}
