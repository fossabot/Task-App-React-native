import React, { Component } from 'react'
import {StyleSheet} from 'react-native'   
import {Card, CardItem, Text } from 'native-base'

export default class TaskPanel extends Component {

  render () {
    return (<CardItem style={style.container}>
    <Text>Hello World</Text></CardItem>)
  }
}

const style = StyleSheet.create({
  
  container:{
 padding:10,
    paddingTop:0,
    paddingBottom:5
  }

  
})