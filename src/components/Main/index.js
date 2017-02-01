import Main from './Main'
import { connect } from 'react-redux'
import CreateLoginAction from '../../actions/LoginAction'

const mapStateToProps = (state) => ({ user : state })
    

const mapDispatchToProps = (dispatch) => ({onLoginClick: (id) => dispatch(CreateLoginAction(id))})

export default MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)