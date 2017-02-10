import React, { Component } from 'react'
import { StyleSheet, View, TextInput,ScrollView } from 'react-native'
import { Container, Content, Header, Text, Title, Icon,Button,ListItem } from 'native-base'

export default class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: 'Useless Multiline Placeholder',
       chats:[]
    }
  }

  componentWillMount(){
      fetch('http://35.154.42.175:3000/oldchats/5172')
      .then(response => response.json())
      .then((reply) => {
        console.log(reply)
        this.setState({

          oldchats: reply
        })
    })
  }
  render () {
    return (
      <Container>
        <Header>
          <Title>
            Chat
          </Title>
        </Header>
        <View style={style.container}>
          <View style={style.ChatList} >
              <ScrollView>
           
                    </ScrollView>
        </View>
          <View style={style.ChatBox}>
            <TextInput
              editable={true}
              maxLength={300}
              multiline={true}
              numberOfLines={4}
              onChangeText={chatText => this.setState({chatText})} 
              style={style.TextInput}/>
              <View style={{flex:1,backgroundColor:'green',}}>
              <Button block style={style.sendButton}>
               <Icon name='md-send' />
                  </Button>
                  </View>
          </View>
        </View>
      </Container>
    )
  }

}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  ChatBox: {
    flex: 1,
    flexDirection:'row',
    borderWidth: 1,
         backgroundColor:'#5265ff'
  },
  ChatList: {
    padding:-1,
    flex: 6,
  },
  TextInput:{
margin:3,
 flex:5,
 backgroundColor:'white'
  },
  sendButton:{
      flex:1
  }


})
