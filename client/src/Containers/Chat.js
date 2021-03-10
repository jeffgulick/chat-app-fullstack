import { connect } from "react-redux";
import Chat from '../Components/Chat/Chat';


const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient,
        conversationId: state.conversationId
    }
  }
  
  export default connect(mapStateToProps)(Chat);