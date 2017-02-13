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
    fetch('http://35.154.42.175:3000/getuserdata')
      .then(res => res.json())
      .then((reply) => {
        this.setState({
          data: reply,
          taskname: null,
          taskdetails: null,
          taskto: 'Assigned To',
          datetext: 'DD/MM/YYYY',
        date: null})
      })
  }
  dateChange () {
    DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date()
    })
      .then((result) => {
        if (result.action === DatePickerAndroid.dismissedAction) {
          this.setState({
            datetext: this.state.datetext,
            date: this.state.date
          })
        }else {
          let newdate = new Date (result.year, result.month, result.day)
          this.setState({
            datetext: newdate.toLocaleDateString(),
            date: newdate

          })
        }
      })
  }

  submitButton () {
    const that = this
    if (this.state.taskto === 'Assigned To') {
      Alert.alert('Please Choose the Assignee')
    }
    else if (this.state.taskname === null) {
      Alert.alert('Task Name Required')
    }
    else if (this.state.taskdetails === null) {
      Alert.alert('Task Details Required')
    }
    else if (this.state.date === null) {
      Alert.alert('Select Date')
    }else {
      fetch('http://35.154.42.175:3000/appcreatetask', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskto: this.state.taskto,
          taskname: this.state.taskname,
          taskdetails: this.state.taskdetails,
          date: this.state.datetext,
          id:this.props.user.id
        })

      }).then(reply => {
        this.props.navigator.push({
          name: 'dashboard'
        })
      }).catch(err => err)
    }
  }

  renderLoading () {
    return (
      <Content style={{alignSelf: 'center'}}>
        <Spinner color='blue' />
      </Content>)
  }
  renderData () {
    let tasktoArray = [{value: 0,label: 'Assigned To'}]
    this.state.data.forEach(val => tasktoArray.push({value: val.id,label: val.fname + ' ' + val.lname}))
    return (
      <Content style={{padding: 10}}>
        <Picker selectedValue={this.state.taskto} onValueChange={x => this.setState({taskto: x})}>
          {tasktoArray.map(function (val) {
             return (
               <Picker.Item key={val.value} value={val.value} label={val.label} />
             )
           })}
        </Picker>
        <InputGroup style={{marginTop:15}}>
          <Input placeholder='Task Name' onChangeText= { text => this.setState({taskname: text})} />
        </InputGroup>
        <TextInput
          placeholder='Task Details'
          style={{ fontSize: 15, borderBottomWidth:1,borderBottomColor:'#D8D8D6', marginBottom:20}}
          multiline={true}
          numberOfLines={5}
          editable={true}
          maxLength={400}
          onChangeText={text => this.setState({taskdetails: text})} />

        <TouchableWithoutFeedback onPress={this.dateChange.bind(this)} style={{marginBottom:10}}>
          <View style={{alignItems: 'center'}}>
            <Text style={style.datepicker}>
               <Icon name="md-calendar"/> {this.state.datetext}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Button info block onPress={this.submitButton.bind(this)} style={{marginTop:10}}>
          Submit
        </Button>
      </Content>
    )
  }

  render () {
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
              Create Task
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
    fontSize: 15,
  },
  datepicker: {
    fontSize: 18,
    height: 50,
  }
})
