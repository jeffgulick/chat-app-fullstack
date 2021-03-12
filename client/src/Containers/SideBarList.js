import { connect } from "react-redux";
import SideBarList from '../Components/Chat/SideBarList';
import { getConversations, getMessages, toggleSideBar } from "../Redux/actions";

const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient,
        lastConversations: state.lastConversations,
        messages: state.messages,
        toggleSideBar: state.toggleSideBar
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: (user) => dispatch(getConversations(user)),
        getMessages: (info) => dispatch(getMessages(info)),
        toggleSideBar: () => dispatch(toggleSideBar())
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(SideBarList);