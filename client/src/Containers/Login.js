import Login from '../Components/Login';
import { connect } from 'react-redux';
import { signIn, getUserName } from '../Redux/actions';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
        getUserName: (user) => dispatch(getUserName(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)