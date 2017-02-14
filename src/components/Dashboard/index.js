import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import CreateLogoutAction from '../../actions/LogoutAction'
import SideBarOpen from '../../actions/SideBarOpen'
import SideBarClose from '../../actions/SideBarClose'

const mapStateToProps = state => ({ user : state })

const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch(CreateLogoutAction()),
    SideBarOpen: () => dispatch(SideBarOpen()),
 SideBarClose: () => dispatch(SideBarClose())

})

export default DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)