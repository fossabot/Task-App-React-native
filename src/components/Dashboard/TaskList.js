import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'   
import {Icon, Text } from 'native-base'

export default class TaskPanel extends Component {

  render () {
    return (
        <View>
           <View style={style.cardHeader}>
                         <Text style={style.TaskName}>
                          {this.props.task.title.toUpperCase()}
                        </Text>
                        <Text style={style.DueDate}>
                        {this.props.task.duedate}
                        </Text>
                        </View>
                        <View style={style.persons}>
                          <Text style={style.textStyle}>
                            {this.props.userlist[this.props.task.taskby]}    
                          </Text>
                          <Icon name="ios-arrow-round-forward" />  
                          <Text style={style.textStyle}>
                            {this.props.userlist[this.props.task.taskto]}
                          </Text>
            </View>
            </View>
    )
  }
}

const style = StyleSheet.create({
  persons: {
    flexDirection:"row",
    flex:1,
    justifyContent:"space-between"
  },
  cardHeader:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  TaskName:{
       color:'#131418',
    alignSelf:'center',
    fontSize:17,
    fontWeight:"500",
    flex:2
  },
  DueDate:{
     color:'#131418',
    fontSize:16,
    fontWeight:"400",
    flex:1
  },


})