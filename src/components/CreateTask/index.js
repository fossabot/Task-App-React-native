import { connect } from 'react-redux'
import CreateTask from './CreateTask'
import CreateLogoutAction from '../../actions/LogoutAction'

const mapStateToProps = state => ({ user : state })
const mapDispatchToProps = dispatch => ({onLogoutClick: () => dispatch(CreateLogoutAction())})

export default CreateTaskContainer = connect(mapStateToProps, mapDispatchToProps)(CreateTask)