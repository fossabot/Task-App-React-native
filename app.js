import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, } from 'react-native';
import {Provider} from 'react-redux'
import configStore from './store/configStore'


import Dashboard from './components/Dashboard'
import CreateTask from './components/CreateTask'
import Home from './components/Home' 
import UpdateProfileConatiner from './containers/UpdateProfileConatiner'
import LoginConatiner from './containers/LoginContainer'
import Main from './components/Main'

const store = configStore()

 export default class app extends Component {
     renderComponent (route, navigator) {
    if (route.name === 'dashboard') {
      return <Dashboard navigator={navigator} {...route.passProps}/>
    }
     if (route.name === 'main') {
      return <Main navigator={navigator}/>
    }
     if (route.name === 'updateprofile') {
      return <UpdateProfileConatiner navigator={navigator} style={style}/>
    }
    if (route.name === 'createtask') {
      return <CreateTask navigator={navigator} style={style}/>
    }
     if (route.name === 'login') {
      return <LoginConatiner navigator={navigator} style={style}/>
    }
     if (route.name === 'home') {
      return <Home navigator={navigator} style={style}/>
    }
  }


  render() {
    return (
        <Provider store={store}>
        <Navigator initialRoute={{ name: 'home'}} renderScene={this.renderComponent.bind(this)} />
        </Provider>
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