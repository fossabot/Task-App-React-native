import { connect } from 'react-redux'
import CreateTask from './CreateTask'
import CreateLogoutAction from '../../actions/LogoutAction'
import SideBarOpen from '../../actions/SideBarOpen'


const mapStateToProps = state => ({ user : state })

const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch(CreateLogoutAction()),
    SideBarOpen: () => dispatch(SideBarOpen())
})

export default CreateTaskContainer = connect(mapStateToProps, mapDispatchToProps)(CreateTask)