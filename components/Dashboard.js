import React, { Component } from 'react'
import { Container, Header, Title, Content, Card, CardItem, Text } from 'native-base'
import TaskPanel from './TaskPanel'

export default class Dashboard extends Component {

  buttonHandle () {
    this.props.navigator.pop()
  }
  componentWillMount () {
    fetch('http://35.154.42.175:3000/appdashboard/'+this.props.id)
      .then(response => response.json())
      .then((reply) => {
        this.setState({
          taskby: reply.taskby,
          taskto: reply.taskto,
          userlist: reply.userlist
        })
      })
  }
  render () {
    const that = this
    if (!this.state) {
      return (
        <Container>
          <Header>
            <Title>
              Dashboard
            </Title>
          </Header>
          <Content>
            <Text>
              Loading
            </Text>
          </Content>
        </Container>)
    }
    return (
      <Container>
        <Header>
          <Title>
            Dashboard
          </Title>
        </Header>
        <Content style={{padding:5}}>
          {this.state.taskby.map(function (data) {
             return (
               <TaskPanel
                 key={data.id}
                 id={data.id}
                 title={data.title}
                 duedate={data.duedate}
                 userlist={that.state.userlist}
                 taskby={data.taskby} />)
           })}
          {this.state.taskto.map(function (data) {
             return (
               <TaskPanel
                 key={data.id}
                 id={data.id}
                 duedate={data.duedate}
                 title={data.title}
                 userlist={that.state.userlist}
                 taskby={data.taskby} />)
           })}
        </Content>
      </Container>
    )
  }
}
