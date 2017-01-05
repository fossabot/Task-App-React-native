import React, { Component } from 'react'
import { Text, View, Button,StyleSheet,TouchableOpacity, Switch } from 'react-native'
import AccountKit, {LoginButton, Color,StatusBarStyle,BackAndroid,} from 'react-native-facebook-account-kit'

export default class Login extends Component {
   state = {
    authToken: null,
    loggedAccount: null
  }
  componentWillMount() {
    this.configureAccountKit()
    AccountKit.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          AccountKit.getCurrentAccount()
            .then((account) => {
              this.setState({
                authToken: token,
                loggedAccount: account
              })
            })
        } else {
          console.log('No user account logged')
        }
      })
      .catch((e) => console.log('Failed to get current access token', e))
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

  renderUserLogged() {
    const { id, phoneNumber } = this.state.loggedAccount;

    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => this.onLogoutPressed()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Account Kit Id</Text>
        <Text style={styles.text}>{id}</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.text}>{phoneNumber ? `${phoneNumber.countryCode} ${phoneNumber.number}` : ''}</Text>
      </View>
    )
  }
    renderLogin() {
    return (
      <View>
        <LoginButton style={styles.button} type="phone"
          onLogin={(token) => this.onLogin(token)} onError={(e) => this.onLogin(e)}>
          <Text style={styles.buttonText}>SMS</Text>
        </LoginButton>
      </View>
    )
  }

  buttonHandle () {
    this.props.navigator.pop()
  }

  render () {
    return ( <View style={styles.container}>
        { this.state.loggedAccount ? this.renderUserLogged() : this.renderLogin() }
              <Button onPress={this.buttonHandle.bind(this)} title='Back' />
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
