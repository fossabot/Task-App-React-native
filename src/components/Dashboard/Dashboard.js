import React, { Component } from 'react'
import { View, Alert, BackAndroid, StyleSheet } from 'react-native'
import { SideMenu } from 'react-native-elements'
import { Container, Header, Title, Content, Card, CardItem, Text, Icon, Button, Spinner } from 'native-base'
import Menu from '../SideMenu/'
import Taskpanel from './TaskPanel'
import TaskList from './TaskList'

export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      panelid: null
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop()
        return true // do not exit app
      } else {
        return false // exit app
      }
    })
  }
  componentWillMount () {
    fetch('http://35.154.42.175:3000/appdashboard/' + this.props.user.id)
      .then(response => response.json())
      .then((reply) => {
        this.setState({
          taskby: reply.taskby,
          taskto: reply.taskto,
          userlist: reply.userlist,
          isOpen: false
        })
      })
  }

  toggleSideMenu () {
    this.props.SideBarOpen()
    this.setState({
      isOpen: true
    })
  }

  panelOpen (e) {
    if (this.state.panelid === e) {
      this.setState({
        panelid: null
      })
    }else {
      this.setState({
        panelid: e
      })
    }
  }

  renderLoading () {
    return (
      <Content style={{alignSelf: 'center'}}>
        <Spinner color='blue' />
      </Content>)
  }
  renderData () {
    const that = this
    return ( <Content style={{padding: 10}}>
               {this.state.taskby.map(function (data) {
                    let StatusStyle = style.Incomplete
                    if(data.status === 'Completed') StatusStyle = style.Completed
                    return (
                      
                      <Card key={data.id} style={StatusStyle}>
                        <CardItem style={style.CardBody} button onPress={that.panelOpen.bind(that,data.id)}>
                            <TaskList task={data} userlist={that.state.userlist} />
                        </CardItem>
                        {(that.state.panelid === data.id) ? (<Taskpanel task={data} userid={that.props.user.id} navigator={that.props.navigator}/>): null}
                      </Card>
                    )
                  })}
               {this.state.taskto.map(function (data) {
                        let StatusStyle = style.Incomplete
                        if(data.status === 'Completed') StatusStyle = style.Completed
                      return (
                              <Card key={data.id} style={StatusStyle}>
                                <CardItem style={style.CardBody} button onPress={that.panelOpen.bind(that,data.id)}>
                                  <TaskList task={data} userlist={that.state.userlist} />
                                </CardItem>
                                {(that.state.panelid === data.id) ? (<Taskpanel task={data} userid={that.props.user.id} navigator={that.props.navigator}/>): null}
                              </Card>
                    )
                    })}
               <Text>
               </Text>
             </Content>)
  }

  render () {
    console.log(this.state)
    const MenuComponent = <Menu onItemSelected={this.onMenuItemSelected} navigator={this.props.navigator} user={this.props.user} />

    return (
      <SideMenu isOpen={this.props.user.sideBarStatus} menu={MenuComponent} menuPosition='right'>
        <Container style={{ flex: 1, backgroundColor: 'white'}}>
          <Header iconRight style={{marginRight: -14}}>
            <Title>
              Dashboard
            </Title>
            <Button transparent onPress={() => this.toggleSideMenu()}>
              <Icon name='ios-menu' />
            </Button>
          </Header>
          {this.state.userlist ? this.renderData() : this.renderLoading()}
        </Container>
      </SideMenu>

    )
  }
}
const style = StyleSheet.create({
  CardBody: {
    padding: 10,
    paddingTop: 4,
    paddingBottom: 5
  },
  Completed: {
    borderColor: '#09bc21'
  },
  Incomplete: {
    borderColor: '#fc5050'
  }
})
