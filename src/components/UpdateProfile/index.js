import { connect } from 'react-redux'
import UpdateProfile from './UpdateProfile'
import CreateLogoutAction from '../../actions/LogoutAction'
import SideBarOpen from '../../actions/SideBarOpen'

const mapStateToProps = state => ({ user : state })

const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch(CreateLogoutAction()),
    SideBarOpen: () => dispatch(SideBarOpen())
})

export default UpdateProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)