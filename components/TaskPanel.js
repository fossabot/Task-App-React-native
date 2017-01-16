import React, { Component } from 'react'
import {Card, CardItem, Text } from 'native-base'

export default class TaskPanel extends Component {

  render () {
    return (   <Card>
                   <CardItem header>
                     <Text>
                     {this.props.title}
                     </Text>
                       <Text>
                     {this.props.duedate}
                     </Text>
                   </CardItem>
                   <CardItem>
                    <Text> {'Assigned By  ' + this.props.userlist[this.props.taskby]}</Text>
                   </CardItem>
                 </Card>)
  }
}
