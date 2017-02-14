import React, { Component } from 'react'
import { Text, View, Button,StyleSheet,TouchableOpacity, Switch,Image,PermissionsAndroid ,AsyncStorage} from 'react-native'
import AccountKit, {LoginButton, Color,StatusBarStyle} from 'react-native-facebook-account-kit'
import Dashboard from '../Dashboard/'
import codePush from "react-native-code-push";


export default class Login extends Component {
   state = {
    authToken: null,
    loggedAccount: null
  }
  requestSMSPermission= async function () {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        'title': 'Auto Read SMS',
        'message': 'Auto Read OTP From Account Kit.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Auto Read OTP Enabled")
    } else {
      console.log("Auto Read OTP denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
componentWillMount(){
      this.checkLogin()
}

  componentDidMount(){
    this.requestSMSPermission()
    
      codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE
        });
}
checkLogin = async () => {
  try {
    
  const value = await AsyncStorage.getItem('@taskapp:userdata');
  if (value !== null){
    const data = JSON.parse(value)
      this.props.onLoginClick(data.id)
      this.props.navigator.push({
      name: 'createprofile',
      passProps:{ id: data.id,
        phone: data.phoneNumber.number}
     })
  }
} catch (error) {
    console.log(error)
}
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
     this.saveLogin(account)
     this.props.onLoginClick(account.id)
     this.props.navigator.push({
      name: 'createprofile',
      passProps:{ id: account.id,
        phone: account.phoneNumber.number}
     })
    
      }).catch(err => console.log(err))
    }
  }

 saveLogin = async (obj) => {
    try {
      await AsyncStorage.setItem('@taskapp:userdata',JSON.stringify(obj));
    } catch (error) {
     Alert.alert("Please Try Again")
     console.log(error)
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
    fontSize: 45,
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
