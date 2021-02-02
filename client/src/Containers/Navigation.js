import { connect } from 'react-redux';
import Navigation from '../Components/Navigation';
import { signOut } from '../Redux/actions';

const mapStateToProps = (state) => {
    return{
        loggedIn: state.loggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);