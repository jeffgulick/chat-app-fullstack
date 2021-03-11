import { connect } from "react-redux";
import Chat from '../Components/Chat/Chat';


const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient,
        messages: state.messages
    }
  }
  
  export default connect(mapStateToProps)(Chat);