import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Card, CardItem, Text, Button, Icon } from 'native-base'

export default class TaskPanel extends Component {
  updateTask (taskid, userid, status) {
    fetch('http://35.154.42.175:3000/appupdatetask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskid,
        userid,
      status})
    }).then(reply => {
      this.props.navigator.push({
        name: 'dashboard'
      })
    }).catch(err => console.log(err))
  }

  deleteTask (taskid, taskby) {
    fetch('http://35.154.42.175:3000/appdeletetask', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskid,
      taskby})
    }).then(reply => {
      this.props.navigator.push({
        name: 'dashboard'
      })
    }).catch(err => console.log(err))
  }

  openChat(taskid){
    this.props.navigator.push({
      name: 'chat',
      passProps:{taskid}
    })
  }
  render () {
    return (
      <View>
        <CardItem style={style.container}>
          <Text>
            Hello World
          </Text>
        </CardItem>
        <CardItem style={style.buttonContainer}>
          <Text style={style.AssignedOn}>
            Assigned on
          </Text>
          <Button info style={style.buttons} onPress={this.updateTask.bind(this, this.props.task.id, this.props.userid, this.props.task.status)}>
            <Icon name='ios-refresh' />
          </Button>
          {(this.props.userid == this.props.task.taskby) ? ( 
              <Button danger style={style.buttons} onPress={this.deleteTask.bind(this, this.props.task.id, this.props.task.taskby)}>
            <Icon name='md-trash' />
          </Button>
          ) : null}
          <Button success style={style.buttons} onPress={this.openChat.bind(this,this.props.task.id)}>
            <Icon name='ios-chatboxes' />
          </Button>
        </CardItem>
      </View>)
  }
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5
  },
  AssignedOn: {
    flex: 3,
    fontSize: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttons: {
    marginLeft: 3,
    flex: 1
  }

})
