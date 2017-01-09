import React, {Component} from 'react'
import {Text, View,Button,TextInput} from 'react-native'

export default class UpdateProfile extends Component {
    componentWillMount(){
        fetch('http://35.154.42.175:3000/appuserdata/140699849744149')
        .then((response)=> response.json())
        .then((reply)=>{
      this.setState({
        data: JSON.stringify(reply)
      })
    })
    
    }
    buttonHandle () {
    this.props.navigator.pop()
  }
  render () {
      if(!this.state){
          return (<View style={this.props.style.container}>
              <Text>
                Create Task
              </Text>
              <Button onPress={this.buttonHandle.bind(this)} title='Back' />
            </View>)
      }
    return (<View style={this.props.style.container}>
            
              <Text>
                {this.state.data}
              </Text>
              <Button onPress={this.buttonHandle.bind(this)} title='Back' />
            </View>)
  }
}
