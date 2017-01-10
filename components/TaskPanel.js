import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class TaskPanel extends Component {

  render () {
    return (<View>
              <Text key={this.props.id}>
                {this.props.title + '  Task Assigned By  ' + this.props.userlist[this.props.taskby]}
              </Text>
            </View>)
  }
}

const style = StyleSheet.create({
    
})