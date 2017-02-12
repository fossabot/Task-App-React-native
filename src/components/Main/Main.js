import React, { Component } from 'react'
import { Text, View, Button,StyleSheet,TouchableOpacity, Switch,Image } from 'react-native'
import AccountKit, {LoginButton, Color,StatusBarStyle,BackAndroid,} from 'react-native-facebook-account-kit'

export default class Login extends Component {
   state = {
    authToken: null,
    loggedAccount: null
  }

  configureAccountKit() {
    AccountKit.configure({
      defaultCountry: "IN",
      countryWhitelist: ['IN'], // [] by default
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
      name: 'createprofile',
      passProps:{ id: account.id,
        phone: account.phoneNumber.number}
     })
    
      }).catch(err => console.log(err))
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
      name: 'createprofile',
      passProps:{ id: 140699849744149,
        phone: 9981017770}
     })

  }

  render () {
    return ( <View style={styles.container}>
      <View style={styles.headertext}>
          <Text style={styles.text}>Task Master</Text>
          <Text> </Text>

      </View>
      <View style={styles.elements} >
          <LoginButton style={styles.button} type="phone"
          onLogin={(token) => this.onLogin(token)} onError={(e) => this.onLogin(e)}>
          <Text style={styles.buttonText}>Login via SMS</Text>
        </LoginButton>
        </View>
            </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  button: {
    height: 50,
    width: 300,
    borderRadius:25,
    backgroundColor: '#3498db',
    marginBottom: 10
  },
  buttonText: {
    color:'white',
    fontSize: 25,
    fontWeight:"500",
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
    color:'white',
    fontSize: 50,
    textAlign: 'center',
    fontWeight:'700'
  },
   text2: {
    color:'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight:'500'
  },
  elements:{
    flex:1,
  },
    headertext:{
      justifyContent:'center',
      alignItems:'center',
    flex:1
  }
})
