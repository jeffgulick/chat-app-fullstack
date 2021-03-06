import axios from "axios";

export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
export const getUser = (user) => {
  return {
    type: "GET_USER",
    value: user,
  };
};
export const getRecipient = (user) => {
  return {
    type: "GET_RECIPIENT",
    value: user,
  };
};
export const getConversationId = (id) => {
  return {
    type: "GET_CONVERSATION_ID",
    value: id,
  };
};
export const getConversations = (user) => {
  return (dispatch) => {
    axios
      .post("/api/messages/conversations", { senderId: user })
      .then((data) => {
        const action = {
          type: "GET_CONVERSATIONS",
          value: data.data,
        };
        dispatch(action);
      });
  };
};
export const getMessages = (info) => {
  return (dispatch) => {
    axios
      .post("/api/messages/chats", info)
      .then (data =>{
        const action = {
          type: "GET_MESSAGES",
          value: data.data
        }
        dispatch(action);
      })
  }
}
export const toggleSideBar = () => {
  return {
    type: "TOGGLE_SIDEBAR",
    value: true
  }
}
