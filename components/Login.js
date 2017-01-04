import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class Login extends Component {
  buttonHandle () {
    this.props.navigator.pop()
  }
  render () {
    return (<View style={this.props.style.container}>
              <Text>
                Login
              </Text>
              <Button onPress={this.buttonHandle.bind(this)} title='Back' />
            </View>)
  }
}
