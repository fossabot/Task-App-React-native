import React, { Component} from 'react';
import { View, Text,Button,Alert,} from 'react-native';

export default class Dashboard extends Component {

  buttonHandle(){
    this.props.navigator.pop();

  }
  componentWillMount(){
    fetch('http://35.154.42.175:3000/appdashboard/140699849744149').then((reply)=>{
      this.setState({
        data:JSON.stringify(reply)
      })
    })
    
  }

  render () { 
       if(!this.state){
       return (
         <View style={this.props.style.container}> 
         <Text>Loading</Text>
         </View>)
       }
        return ( 
     <View style={this.props.style.container}> 
     <Text >Dashboard</Text> 
     <Button onPress={this.buttonHandle.bind(this)} title="Back" style={this.props.style.button}/>
     <Text>{this.state.data}</Text>
     </View>
     ) 
}
}
