import { connect } from "react-redux";
import Contacts from "../Components/Chat/Contacts";
import { getRecipient } from "../Redux/actions";
import { getConversationId } from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    recipient: state.recipient,
    conversationId: state.conversationId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipient: (user) => dispatch(getRecipient(user)),
    getConversationId: (id) => dispatch(getConversationId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
