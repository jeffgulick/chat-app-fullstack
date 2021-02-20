import { connect } from "react-redux";
import Chat from '../Components/Chat';
import { getChats } from "../Redux/actions";


const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getChats: ()=> dispatch(getChats()),
        // afterPostMessage: (data) => dispatch(afterPostMessage(data))
    }
}
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chat);