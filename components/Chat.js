import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name , background } = route.params;
    const [messages, setMessages] = useState([]);

    //for sending messages
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    //for customizing message bubbles
    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor:  "#000"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: "Hello Developer",
      createdAt: new Date (),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 2,
      text: "You've entered the chatroom.",
      createdAt: new Date(),
      system: true,
    }
  ]);
}, []);

{/* Set username */}
useEffect(() => {
    navigation.setOptions({ title: name});
}, []);

return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior= "height" /> : null }                                   
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;