import React , { Component } from 'react'
import { View, StyleSheet,Alert } from 'react-native'
import { Container, Header, Title, Content, Text, Spinner, Button, Input, InputGroup, List, ListItem, Icon } from 'native-base'

export default class CreateProfileForm extends Component {
  componentWillMount(){
    this.setState({
      fname:"",
      lname:"",
      email:""
    })
  }
submitButton () {
    if (this.state.fname === '' || this.state.lname === '' || this.state.email === '') {
      Alert.alert('Please Fill all Details')
    }else {
      fetch('http://35.154.42.175:3000/appcreateprofile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          id: this.props.id,
          phone: this.props.phone
        })
      }).then(reply => {
        this.props.navigator.push({
          name: 'createtask',
          passProps:{
            data:this.props.data
          }
        })
      }).catch(err => console.log(err))
    }
  }
  render () {
    // console.log(this.state)
    return (
      <Container style={{ backgroundColor: 'white'}}>
        <Header>
          <Title>
            Update Profile
          </Title>
        </Header>
        <Content style={{padding: 10}}>
          <InputGroup style={style.elements} disabled>
            <Icon name='ios-call' />
            <Input defaultValue={this.props.phone.toString()} />
          </InputGroup>
          <InputGroup style={style.elements}>
            <Icon name='ios-contact' />
            <Input placeholder='First Name' onChangeText={text => this.setState({fname: text.trim()})} />
          </InputGroup>
          <InputGroup style={style.elements}>
            <Icon name='ios-contacts' />
            <Input placeholder='Last Name' onChangeText={text => this.setState({lname: text.trim()})} />
          </InputGroup>
          <InputGroup style={style.elements}>
            <Icon name='ios-at-outline' placeHolder='email' />
            <Input placeholder='Email Address' onChangeText={text => this.setState({email: text.trim()})} />
          </InputGroup>
          <Button block style={style.elements} onPress={this.submitButton.bind(this)}>
            Create Profile
          </Button>
        </Content>
      </Container>

    )
  }
}

const style = StyleSheet.create({
  elements: {
    marginTop: 17
  }

})
