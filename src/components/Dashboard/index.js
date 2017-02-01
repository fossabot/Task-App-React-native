import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import CreateLogoutAction from '../../actions/LogoutAction'

const mapStateToProps = state => ({ user : state })
const mapDispatchToProps = dispatch => ({onLogoutClick: () => dispatch(CreateLogoutAction())})

export default DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)