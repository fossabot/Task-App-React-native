import React, { Component } from 'react'
import { View, Alert, BackAndroid } from 'react-native'
import { SideMenu } from 'react-native-elements'
import { Container, Header, Title, Content, Card, CardItem, Text, Icon, Button, Spinner } from 'native-base'
import Menu from '../SideMenu/'

export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
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

  renderLoading () {
    return (
      <Content style={{alignSelf: 'center'}}>
        <Spinner color='blue' />
      </Content>)
  }
  renderData () {
    const that = this
    return ( <Content style={{padding: 17}}>
               {this.state.taskby.map(function (data) {
                  return (
                    <Card key={data.id}>
                      <CardItem header>
                        <Text>
                          {data.title}
                        </Text>
                        <Text>
                          {data.duedate}
                        </Text>
                      </CardItem>
                      <CardItem>
                        <Text>
                          {'Assigned By  ' + that.state.userlist[data.taskby]}
                        </Text>
                      </CardItem>
                    </Card>
                  )
                })}
               {this.state.taskto.map(function (data) {
                  return (
                    <Card key={data.id}>
                      <CardItem header>
                        <Text>
                          {data.title}
                        </Text>
                        <Text>
                          {data.duedate}
                        </Text>
                      </CardItem>
                      <CardItem>
                        <Text>
                          {'Assigned By  ' + that.state.userlist[data.taskby]}
                        </Text>
                      </CardItem>
                    </Card>)
                })}
             </Content>)
  }

  render () {
    const MenuComponent = <Menu
                            onItemSelected={this.onMenuItemSelected}
                            navigator={this.props.navigator}
                            user={this.props.user}
                             />

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
