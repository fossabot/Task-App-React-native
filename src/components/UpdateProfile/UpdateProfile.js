import React, { Component } from 'react'
import { TouchableWithoutFeedback, DatePickerAndroid, View, TextInput, StyleSheet, Picker, Alert, ToolbarAndroid } from 'react-native'
import { Container, Header, Title, Content, Text, Spinner, Button, Input, InputGroup, List, ListItem, Icon } from 'native-base'
import Menu from '../SideMenu/'
import { SideMenu } from 'react-native-elements'

export default class CreateTask extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  toggleSideMenu () {
        this.props.SideBarOpen()

    this.setState({
      isOpen: true
    })
  }
  componentWillMount () {
    fetch('http://35.154.42.175:3000/appuserdata/'+this.props.user.id)
        .then((response)=> response.json())
        .then((reply)=>{
      this.setState({
        data: reply,
        fname: reply.fname,
        lname: reply.lname,
        email: reply.email
        })
      }).catch(err => console.log(err))
  }

  submitButton(){
    if(this.state.fname === "" || this.state.lname === "" || this.state.email === "" ){
      Alert.alert("Please Fill all Details")
    }
    else{
      fetch('http://35.154.42.175:3000/appupdateuser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          id: this.state.data.id
        })
      }).then(reply => {
        this.props.navigator.push({
          name: 'updateprofile'
        })
      }).catch(err => console.log(err))
    }
  }
  
  renderLoading () {
    return (
      <Content style={{alignSelf: 'center'}}>
        <Spinner color='blue' />
      </Content>)
  }
  renderData () {
    return (
      <Content style={{padding: 10}}>
        <InputGroup style={style.elements}>
          <Icon name="ios-contact"/>
         <Input defaultValue={this.state.data.fname} onChangeText={text => this.setState({fname : text.trim()})}/>
        </InputGroup>
         <InputGroup style={style.elements}>
          <Icon name="ios-contacts" />
         <Input defaultValue={this.state.data.lname} onChangeText={text => this.setState({lname : text.trim()})}/>
        </InputGroup>
         <InputGroup style={style.elements}>
         <Icon name="ios-at-outline" placeHolder="email"/>
         <Input defaultValue={this.state.data.email} onChangeText={text => this.setState({email : text.trim()})}/>
        </InputGroup>
        <Button block style={style.elements} onPress={this.submitButton.bind(this)}>
        Update
        </Button>
      </Content>
  )
  }

  render () {
    console.log(this.props.user)
    const MenuComponent = <Menu
                            onItemSelected={this.onMenuItemSelected}
                            navigator={this.props.navigator}
                            user={this.props.user}
                            />
    return (
      <SideMenu isOpen={this.props.user.sideBarStatus} menu={MenuComponent} menuPosition='right'>
        <Container style={{ backgroundColor: 'white'}}>
          <Header iconRight>
            <Button transparent onPress={() => this.props.navigator.pop()}>
              <Icon name='ios-arrow-back' />
            </Button>
            <Title>
              Update Profile
            </Title>
            <Button transparent onPress={() => this.toggleSideMenu()}>
              <Icon name='ios-menu' />
            </Button>
          </Header>
          {this.state.data ? this.renderData() : this.renderLoading()}
        </Container>
      </SideMenu>

    )
  }
}
const style = StyleSheet.create({
  elements: {
    marginTop: 17
  },
  
})
