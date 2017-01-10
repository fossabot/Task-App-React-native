import React, { Component} from 'react';
import { View, Text,Button,Alert,ListView,ScrollView} from 'react-native';
import TaskPanel from './TaskPanel'

export default class Dashboard extends Component {

  buttonHandle(){
    this.props.navigator.pop();

  }
  componentWillMount(){
    fetch('http://35.154.42.175:3000/appdashboard/140699849744149')
    .then(response => response.json())
    .then((reply)=>{
      this.setState({
        taskby:reply.taskby,
        taskto:reply.taskto,
        userlist:reply.userlist
      })
    })
    
  }
  render () { 
    const that = this
       if(!this.state){
       return (
         <View style={this.props.style.container}> 
         <Text>Loading</Text>
         </View>)
       }
        return ( 
     <View style={this.props.style.container}> 
<ScrollView>
{
  this.state.taskby.map(function(data){
    return (<TaskPanel key={data.id} id={data.id} title={data.title} userlist={that.state.userlist} taskby={data.taskby} />)
  })
}
{
  this.state.taskto.map(function(data){
    return (<TaskPanel key={data.id} id={data.id} title={data.title} userlist={that.state.userlist} taskby={data.taskby} />)
  })
}
</ScrollView>
     </View>
     ) 
}
}
