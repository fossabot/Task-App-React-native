import { connect } from 'react-redux'
import CreateProfile from './CreateProfile'


const mapStateToProps = state => ({ user : state })



export default CreateProfileContainer = connect(mapStateToProps)(CreateProfile)