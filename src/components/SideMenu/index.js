import { connect } from 'react-redux'
import Menu from './Menu'
import CreateLogoutAction from '../../actions/LogoutAction'
import SideBarClose from '../../actions/SideBarClose'


const mapStateToProps = state => ({ user : state })

const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => dispatch(CreateLogoutAction()),
    SideBarClose: () => dispatch(SideBarClose())
})

export default SideMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)