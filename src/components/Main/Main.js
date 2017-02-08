import React, { Component } from 'react'
import { Text, View, Button,StyleSheet,TouchableOpacity, Switch } from 'react-native'
import AccountKit, {LoginButton, Color,StatusBarStyle,BackAndroid,} from 'react-native-facebook-account-kit'

export default class Login extends Component {
   state = {
    authToken: null,
    loggedAccount: null
  }

  configureAccountKit() {
    AccountKit.configure({
      defaultCountry: "IN"
    })
  }
   onLogin(token) {
    if (!token) {
      console.warn('User canceled login')
      this.setState({})
    } else {
      AccountKit.getCurrentAccount()
        .then((account) => {
          this.setState({
            authToken: token,
            loggedAccount: account
          })
          this.props.onLoginClick(account.id)
          this.props.navigator.push({
      name: 'dashboard',
      passProps: {
        id: account.id,
        phone: account.phoneNumber.number
      }
    })
    
      })
    }
  }

  onLoginError(e) {
    console.log('Failed to login', e)
  }

  onLogoutPressed() {
    AccountKit.logout()
      .then(() => {
        this.setState({
          authToken: null,
          loggedAccount: null
        })
        
      })
      .catch((e) => console.log('Failed to logout'))
  }

  buttonHandle () {
    this.props.onLoginClick("140699849744149")
     this.props.navigator.push({
      name: 'dashboard'
     })

  }

  render () {
    return ( <View style={styles.container}>
          <LoginButton style={styles.button} type="phone"
          onLogin={(token) => this.onLogin(token)} onError={(e) => this.onLogin(e)}>
          <Text style={styles.buttonText}>SMS</Text>
        </LoginButton>
              <Button onPress={this.buttonHandle.bind(this)} title='Direct Login' />
            </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: '#085b7f',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})
