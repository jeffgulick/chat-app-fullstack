import { connect } from "react-redux";
import Contacts from "../Components/Chat/Contacts";
import { getRecipient } from "../Redux/actions";
import { createConversationDoc } from "../Redux/actions";

const mapStateToProps = (state) => {
  return {
    recipient: state.recipient,
    conversationDoc: state.conversationDoc
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipient: (user) => dispatch(getRecipient(user)),
    createConversationDoc: (info) => dispatch(createConversationDoc(info))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
