import React, { Component } from 'react'
import { Alert, StyleSheet, View, TextInput,ScrollView ,ListView} from 'react-native'
import { Container, Content, Header, Text, Title, Icon,Button,ListItem } from 'native-base'
import SocketIOClient from 'socket.io-client'
import moment from 'moment'

export default class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: 'Useless Multiline Placeholder',
       chats:[],
       username: this.props.userlist[this.props.userid]
    }
    this.socket = SocketIOClient('http://35.154.42.175:3000');

  }

  componentWillMount(){
      fetch('http://35.154.42.175:3000/oldchats/'+this.props.taskid)
      .then(response => response.json())
      .then((oldchats) => 
      {
        this.setState({oldchats})
      })
      this.socket.emit('join',{user:this.state.username,chatroom:this.props.taskid})
  }
  componentDidMount(){
let that = this
 let chats = this.state.chats
  this.socket.on('recieved-chats', function (data) {
  chats.push(data)
  that.setState({
    chats: chats
   })
})
}
  sendMessage(){
    if(this.state.chatText===""){
      Alert.alert("Input Text is Empty")
    }else{
      let time = moment().format('HH:mm DD-MM-YY')
    this.socket.emit('chat message', {chatroom: this.props.taskid,username: this.state.username,userid:this.props.userid,message: this.state.chatText,time: time})
    this.refs.chattext.clear()
    }
  }
  showOldchat(){
    let i = 0
return (<View>
    {
    this.state.oldchats.map(x=>{
      i++
      let chat = JSON.parse(x)
      return (
        <View key={i} style={style.ChatBubble}><Text>{chat.username} :  " {chat.message} "</Text>
    <Text style={style.ChatTime}>{chat.time} </Text></View>

      )})
    }
    </View>)

  }
  showLoading(){
    return(<Text>Loading</Text>)
  }
  showNewChats(){
       let i = 0
return (<View>
    {
    this.state.chats.map(chat=>{
      i++
      return (
        <View key={i} style={style.ChatBubble}><Text>{chat.username} :  " {chat.message} "</Text>
    <Text style={style.ChatTime}>{chat.time} </Text></View>

      )})
    }
    </View>)
  }
  render () {
    const that = this
    return (
      <Container>
        <Header>
          <Title>
            Chat
          </Title>
          
        </Header>
        <View style={style.container}>
          <View style={style.ChatList} >
            <ScrollView ref="scrollView" onContentSizeChange={(contentWidth, contentHeight)=>this.refs.scrollView.scrollTo({y:contentHeight})}>
                {this.state.oldchats ? this.showOldchat() : this.showLoading}
                {this.showNewChats()}
            </ScrollView>
        </View>
          <View style={style.ChatBox}>
            <TextInput
              ref= "chattext"
              editable={true}
              maxLength={300}
              multiline={true}
              numberOfLines={4}
              onChangeText={chatText => this.setState({chatText: chatText.trim()})} 
              style={style.TextInput}/>
              <View style={{flex:1,backgroundColor:'green',}}>
              <Button block style={style.sendButton} onPress={this.sendMessage.bind(this)}>
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
    flex: 1,
    backgroundColor:'white'
  },
  ChatBox: {
    flex: 1,
    flexDirection:'row',
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
  },
  ChatBubble:{
    borderWidth:2,
    margin:5,
    marginLeft:10,
    marginRight:10,
    borderRadius:20,
    padding:10,
    borderColor:'#2980b9'
  },
  ChatTime:{
    fontSize:12
  }


})
