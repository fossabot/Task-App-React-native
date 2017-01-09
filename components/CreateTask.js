import React, { Component } from 'react'
import { Text, View, Button,TextInput,StyleSheet,Picker, Alert,ToolbarAndroid} from 'react-native'

export default class CreateTask extends Component {
  componentWillMount(){
    this.setState({
      taskname: null,
      taskdetails: null,
      taskto:"Assigned To"
    })
  }
  
  submitButton () {
    if(this.state.taskto=== "Assigned To"){
      Alert.alert("Please Choose the Assignee")
    }
    else if(this.state.taskname === null){
      Alert.alert("Task Name Required")
    }
    else if(this.state.taskdetails === null){
      Alert.alert("Task Details Required")
    }
    else{
   fetch('http://192.168.43.134:3000/appformdata', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })

})
.catch(err => Alert.alert(JSON.stringify(err)) )
.then(res => Alert.alert(JSON.stringify(res)))
    }
   
  }
  render () {
    return (
      <View style={style.scene} >
       <ToolbarAndroid style={style.toolbar} title="Create Task" />
        <View style={style.container}>
        <Picker selectedValue={this.state.taskto} 
        onValueChange={(data) => this.setState({taskto: data})}> 
        <Picker.Item label="Java" value="java" /> 
        <Picker.Item label="JavaScript" value="js" /> 
        </Picker>
        <TextInput style={style.elements} 
        onChangeText={(text) => this.setState({taskname:text})}
        />
        <TextInput style={style.elements}
         multiline={true} 
        onChangeText={(text) => this.setState({taskdetails:text})}
        />
        <Button style={style.elements} onPress={this.submitButton.bind(this)} title='Submit' />
      </View>
    </View>)
  }
}
const style = StyleSheet.create({
  scene:{
   flex:1,
  },
  container:{
    padding:10,
    justifyContent: 'space-around',
  },
  toolbar: { 
  backgroundColor: '#e9eaed', 
  height: 56, },
  elements:{
    marginBottom:15,
    height:50
  },
})