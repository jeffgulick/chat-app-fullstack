import { connect } from "react-redux";
import SideBarList from '../Components/Chat/SideBarList';
import { getConversations } from "../Redux/actions";

const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient,
        lastConversations: state.lastConversations
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: (user) => dispatch(getConversations(user))
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(SideBarList);