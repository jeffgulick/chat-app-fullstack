import Login from '../Components/Login';
import { connect } from 'react-redux';
import { signIn } from '../Redux/actions';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)