import Login from '../components/Login'
import { connect } from 'react-redux'
import CreateLoginAction from '../actions/LoginAction'

const mapStateToProps = (state) => ({ user : state })
    

const mapDispatchToProps = (dispatch) => ({onLoginClick: (id) => dispatch(CreateLoginAction(id))})

export default LoginConatiner = connect(mapStateToProps, mapDispatchToProps)(Login)