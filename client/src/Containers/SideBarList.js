import { connect } from "react-redux";
import SideBarList from "../Components/Chat/SideBarList";
import {
  getConversations,
  getMessages,
  toggleSideBar,
  getRecipient,
  createConversationDoc,
} from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    recipient: state.recipient,
    lastConversations: state.lastConversations,
    messages: state.messages,
    toggleSideBar: state.toggleSideBar,
    CreateConversationDoc: state.CreateConversationDoc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (user) => dispatch(getConversations(user)),
    getMessages: (info) => dispatch(getMessages(info)),
    toggleSideBar: () => dispatch(toggleSideBar()),
    getRecipient: (user) => dispatch(getRecipient(user)),
    createConversationDoc: (info) => dispatch(createConversationDoc(info)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBarList);
