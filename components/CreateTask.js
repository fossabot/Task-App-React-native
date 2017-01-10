import React, { Component } from 'react'
import { TouchableWithoutFeedback, Text, DatePickerAndroid, View, Button, TextInput, StyleSheet, Picker, Alert, ToolbarAndroid } from 'react-native'

export default class CreateTask extends Component {
  componentWillMount () {
       fetch('http://192.168.42.210:3000/getuserdata')
       .then(res => res.json())
       .then((reply) => {
      this.setState({
       data: reply,
       taskname: null,
      taskdetails: null,
      taskto: 'Assigned To',
      datetext: 'DD/MM/YYYY',
      date: null})
    })
  }

  dateChange () {
    DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date()
    })
      .then((result) => {
        if (result.action === DatePickerAndroid.dismissedAction) {
          this.setState({
            datetext: this.state.datetext,
            date: this.state.date
          })
        }else {
          this.setState({
            datetext: new Date().toLocaleDateString(),
            date: new Date()

          })
        }
      })
  }
  submitButton () {
    const that = this
    if (this.state.taskto === 'Assigned To') {
      Alert.alert('Please Choose the Assignee')
    }
    else if (this.state.taskname === null) {
      Alert.alert('Task Name Required')
    }
    else if (this.state.taskdetails === null) {
      Alert.alert('Task Details Required')
    }
    else if (this.state.date === null) {
      Alert.alert('Select Date')
    }else {
      fetch('http://192.168.42.210:3000/appformdata', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskto: this.state.taskto,
          taskname: this.state.taskname,
          taskdetails: this.state.taskdetails,
          date: this.state.datetext
        })

      }).then(reply=>{
         this.props.navigator.push({
        name: 'home'
      })
      }).catch(err => err)
     
    }
  }
  render () {
      if (!this.state) {
      return (<View style={style.scene}>
       <ToolbarAndroid style={style.toolbar} title='Create Task' />
        <View style={style.container}>
               <Text>Patience You Must Have My Young Padawan</Text>
               </View>
      </View>)
    }
    let tasktoArray = [{value:0,label:"Assigned To"}]
    this.state.data.forEach(val => tasktoArray.push({value:val.id,label:val.fname+" "+val.lname}))
    return (  
      <View style={style.scene}>
        <ToolbarAndroid style={style.toolbar} title='Create Task' />
        <View style={style.container}>
          <Picker selectedValue={this.state.taskto} onValueChange={(x) => this.setState({taskto: x})}>
            {tasktoArray.map(function (val) {
                 return (
                   <Picker.Item key={val.value} value={val.value} label={val.label} />
                  )
              })}
          </Picker>
          <TextInput style={style.elements} onChangeText={(text) => this.setState({taskname: text})} />
          <TextInput style={style.elements} multiline={true} onChangeText={(text) => this.setState({taskdetails: text})} />
          <TouchableWithoutFeedback onPress={this.dateChange.bind(this)}>
            <View style={{alignItems: 'center'}}>
              <Text style={style.datepicker}>
                {this.state.datetext}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Button style={style.elements} onPress={this.submitButton.bind(this)} title='Submit' />
        </View>
      </View>)
  }
}
const style = StyleSheet.create({
  scene: {
    flex: 1
  },
  container: {
    padding: 10,
    justifyContent: 'space-around'
  },
  toolbar: {
    backgroundColor: '#e9eaed',
  height: 56 },
  elements: {
    fontSize: 20,
    marginBottom: 15,
    height: 50
  },
  datepicker: {
    fontSize: 25,
    marginBottom: 15,
    height: 50
  }
})
