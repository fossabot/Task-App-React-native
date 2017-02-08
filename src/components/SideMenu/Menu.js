import React, {Component} from 'react'
import {Container,Header,Title,List,ListItem,Text,Content,Icon} from 'native-base'
const { 
  ScrollView,
  View,
  Image
} = require('react-native');


export default class Menu extends Component {
    buttonHandle(e){
        this.props.SideBarClose()
         this.props.navigator.push({
      name: e
     })
    }
    logOutButton(){
        this.props.SideBarClose()
        this.props.onLogoutClick()
        this.props.navigator.resetTo({
            name:'main'
        })
    }

  render() {

    return (
      <Container style={{zIndex:-1}}>
      <Header>
      </Header>
       <Content>
                    <List>
                    <ListItem button iconRight onPress={this.buttonHandle.bind(this,"dashboard")}>
                            <Text>Dashboard</Text>
                            <Icon name="ios-list-box-outline"/>
                        </ListItem>
                        <ListItem button iconRight onPress={this.buttonHandle.bind(this,"createtask")}>
                            <Text>Create Task</Text>
                            <Icon name="ios-add-circle-outline"/>
                        </ListItem>
                        <ListItem button iconRight onPress={this.buttonHandle.bind(this,"updateprofile")}>
                            <Text>Update Profile</Text>
                            <Icon name="ios-contact-outline" />
                        </ListItem>
                        <ListItem button iconRight onPress={this.logOutButton.bind(this)}>
                            <Text>Logout</Text>
                            <Icon name="ios-log-out" />
                        </ListItem>
                    </List>
                </Content>
      </Container>
    );
  }
};