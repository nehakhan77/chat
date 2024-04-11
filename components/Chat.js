import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation , db}) => {
    const { userID } = route.params;
    const { name , background } = route.params;
    const [messages, setMessages] = useState([]);

    //for sending messages
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0]);
    };

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
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({ id: doc.id, ...doc.data(),  createdAt: new Date(doc.data().createdAt.toMillis())})
      });
      setMessages(newMessages);
    });

  //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 }
});

export default Chat;