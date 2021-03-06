import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, } from 'react-native';
import {Provider} from 'react-redux'
import configStore from './src/store/configStore'

import Dashboard from './src/components/Dashboard/'
import Main from './src/components/Main/'
import CreateTask from './src/components/CreateTask/'
import Chat from './src/components/Dashboard/Chat'
import UpdateProfile from './src/components/UpdateProfile/'
import CreateProfile from './src/components/CreateProfile/'

const store = configStore()

 export default class app extends Component {
     renderComponent (route, navigator) {
    if (route.name === 'dashboard') {
      return <Dashboard navigator={navigator} {...route.passProps}/>
    }
    if (route.name === 'createprofile') {
      return <CreateProfile navigator={navigator} {...route.passProps}/>
    }
     if (route.name === 'main') {
      return <Main navigator={navigator}/>
    }
     if (route.name === 'updateprofile') {
      return <UpdateProfile navigator={navigator} style={style}/>
    }
    if (route.name === 'createtask') {
      return <CreateTask navigator={navigator} {...route.passProps}/>
    }
    if (route.name === 'chat') {
      return <Chat navigator={navigator} {...route.passProps}/>
    }
  }


  render() {
    return (
        <Provider store={store}>
        <Navigator initialRoute={{ name: 'main'}} renderScene={this.renderComponent.bind(this)} />
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