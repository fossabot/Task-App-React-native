import React, { Component} from 'react';
import { View, Text} from 'react-native';
import AccountKit, {LoginButton, Color,StatusBarStyle,BackAndroid,} from 'react-native-facebook-account-kit'

export default class Main extends Component {
    configureAccountKit() {
    AccountKit.configure({
      defaultCountry: "IN"
    })
  }
  redirectDashboard(account){
      console.log(account)
      this.props.navigator.push({
           name:'dashboard',
            passProps: {
            id: account.id
    }
      })
  }
  redirectLogin(){
      this.props.navigator.push({
          name:'login'
      })
  }
    componentWillMount() {
    this.configureAccountKit()
    AccountKit.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          AccountKit.getCurrentAccount()
            .then((account) => {
             this.redirectDashboard(account)
            })
        } else {
          this.redirectLogin()
        }
      })
      .catch((e) => console.log('Failed to get current access token', e))
  }
    render(){
        return (<View><Text> </Text></View>)
    }
}