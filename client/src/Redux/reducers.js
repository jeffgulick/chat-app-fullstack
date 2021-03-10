import { combineReducers } from "redux";
import initState from "./state";

const loggedIn = (state = initState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;
    case "SIGN_OUT":
      return false;
    default:
      return state;
  }
};
const user = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      let username = action.value;
      return username;
    default:
      return state;
  }
};
const recipient = (state = initState.recipient, action) => {
  switch (action.type) {
    case "GET_RECIPIENT":
      return action.value;
    default:
      return state;
  }
};
const lastConversations = (state = {}, action) => {
  switch (action.type) {
    case "GET_CONVERSATIONS":
      return action.value;
    default:
      return state;
  }
};
const conversationId = (state = {}, action) => {
  switch (action.type) {
    case "GET_CONVERSATION_ID":
      return action.value;
    default:
      return state;
  }
};

export default combineReducers({
  loggedIn,
  user,
  recipient,
  lastConversations,
  conversationId,
});
