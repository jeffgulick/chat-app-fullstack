import { connect } from "react-redux";
import SideBarList from "../Components/Chat/SideBarList";
import {
  getConversations,
  getMessages,
  toggleSideBar,
  getContacts,
  getRecipient
} from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    contacts: state.contacts,
    lastConversations: state.lastConversations,
    messages: state.messages,
    toggleSideBar: state.toggleSideBar,
    recipient: state.recipient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (user) => dispatch(getConversations(user)),
    getMessages: (info) => dispatch(getMessages(info)),
    toggleSideBar: () => dispatch(toggleSideBar()),
    getContacts: () => dispatch(getContacts()),
    getRecipient: (user) => dispatch(getRecipient(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBarList);
