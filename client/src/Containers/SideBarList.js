import { connect } from "react-redux";
import SideBarList from '../Components/Chat/SideBarList';
import { getConversations, getMessages } from "../Redux/actions";

const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient,
        lastConversations: state.lastConversations,
        messagesByUser: state.messagesByUser
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: (user) => dispatch(getConversations(user)),
        getMessages: (info) => dispatch(getMessages(info))
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(SideBarList);