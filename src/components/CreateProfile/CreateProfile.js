import React , {Component} from 'react'
import {StyleSheet, View, Text, ActivityIndicator,BackAndroid} from 'react-native'
import Dashboard from '../Dashboard/'
import CreateProfileForm from './CreateProfileForm'

export default class CreateProfile extends Component {
  componentWillMount () {
    fetch('http://35.154.42.175:3000/appdashboard/' + this.props.id)
      .then(response => response.json())
      .then((reply) => {
        console.log(reply)
        this.setState({
          taskby: reply.taskby,
          taskto: reply.taskto,
          userlist: reply.userlist,
          ftu:reply.ftu,
          isOpen: false
        })
      })
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop()
        return true // do not exit app
      } else {
        return false // exit app
      }
    })
  }
  showWait(){
    return (
    <View style={style.content}>
        <ActivityIndicator size="large" />
        <Text>Please Wait..</Text>
  
    </View>
    )
  }
render(){
if(!this.state) return (this.showWait())
if (!this.state.ftu) return (<Dashboard navigator={this.props.navigator} data={this.state}/>)
  return (
    <CreateProfileForm navigator={this.props.navigator} phone={this.props.phone} id={this.props.id} data={this.state} / >
    )
}
    
}

const style = StyleSheet.create({
  content : {
    flex : 1,
    backgroundColor:'white',
      justifyContent: 'center',
    alignItems: 'center',
  }
})