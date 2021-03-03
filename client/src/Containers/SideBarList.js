import { connect } from "react-redux";
import SideBarList from '../Components/Chat/SideBarList';

const mapStateToProps = state => {
    return {
        user: state.user,
        recipient: state.recipient
    }
  }
  
  
  export default connect(mapStateToProps)(SideBarList);