import UpdateProfile from '../components/UpdateProfile'
import {connect} from 'react-redux'

const UpdateProfileContainer = connect(state => state)(UpdateProfile)

export default UpdateProfileContainer