import React, { Component } from 'react';
import {StyleSheet,Text, View,Navigator,} from 'react-native';
import Dashboard from './components/Dashboard'
import CreateTask from './components/CreateTask'
import Home from './components/Home' 
import UpdateProfile from './components/UpdateProfile'
import Login from './components/Login'
import Main from './components/Main'


 export default class app extends Component {
     renderComponent (route, navigator) {
    if (route.name === 'dashboard') {
      return <Dashboard navigator={navigator} {...route.passProps}/>
    }
     if (route.name === 'main') {
      return <Main navigator={navigator}/>
    }
     if (route.name === 'updateprofile') {
      return <UpdateProfile navigator={navigator} style={style}/>
    }
    if (route.name === 'createtask') {
      return <CreateTask navigator={navigator} style={style}/>
    }
     if (route.name === 'login') {
      return <Login navigator={navigator} style={style}/>
    }
     if (route.name === 'home') {
      return <Home navigator={navigator} style={style}/>
    }
  }


  render() {
    return (
        <Navigator initialRoute={{ name: 'home'}} renderScene={this.renderComponent.bind(this)} />
    );
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  },
  textStyle:{
    fontSize:50
  },
    button:{
        justifyContent:'flex-end'
    }
})