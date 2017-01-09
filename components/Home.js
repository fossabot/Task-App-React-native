import React, { Component, PropTypes } from 'react';
import { View, Text,Button,Alert,StyleSheet,BackAndroid} from 'react-native';

const style = StyleSheet.create({
    buttonList:{
        flex:2,
        justifyContent:'space-around'
    }
    
})

export default class Home extends Component {
    buttonHandle(e){
        this.props.navigator.push({
            name:e
        })

    }
      componentDidMount(){
 BackAndroid.addEventListener("hardwareBackPress", () => {
  if (this.props.navigator.getCurrentRoutes().length > 1) {
   this.props.navigator.pop();
    return true // do not exit app
  } else {
    return false // exit app
  }
})
  }
  render () { return ( 
     <View style={this.props.style.container}> 
     <Text style={this.props.style.textStyle}>Main</Text> 
     <View style={style.buttonList}>
         <Button onPress={this.buttonHandle.bind(this, 'login')} title="Login"/> 
    <Button onPress={this.buttonHandle.bind(this, 'dashboard')} title="Dashboard"/> 
    <Button onPress={this.buttonHandle.bind(this, 'updateprofile')} title="Update Profile"/> 
    <Button onPress={this.buttonHandle.bind(this, 'createtask')} title="Create Task"/> 
        </View>
     </View>
     ) }
}
