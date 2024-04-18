import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';


const Chat = ({ route, navigation , db, isConnected, storage }) => {
    const { name, background, id } = route.params;
    const [messages, setMessages] = useState([]);
    let soundObject = null;

  //Messages database
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name});

    if (isConnected === true) {
    
    // unregister current onSnapshot() listener to avoid registering multiple listeners when
    // useEffect code is re-executed.
    if (unsubMessages) unsubMessages();
    unsubMessages = null;
  
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // Subscribe to changes in the "messages" collection using onSnapshot.
    // This function will be called whenever there are changes in the collection.
    unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(),  createdAt: new Date(doc.data().createdAt.toMillis())})
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //clean up code
    //use the isConnected prop as a dependency value which will allow the component to call the callback of useEffect whenever the isConnected prop’s value changes.
    return () => {
        if (unsubMessages) unsubMessages();
        if (soundObject) soundObject.unloadAsync();
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //load when there is no connection and cannot fetch data from Firestore database
  const loadCachedMessages = async () => {
    const cachedMessages =  await AsyncStorage.setItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  };

  //for sending messages
  const onSend = (newMessages) => {
    console.log("new Messages", newMessages);
    addDoc(collection(db, "messages"), newMessages[0]);
  };

    //for customizing message bubbles
  const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#484848",
        },
        left: {
          backgroundColor: "#fff",
        },
      }}
    />
  );
  };

  const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    };


   const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  const renderAudioBubble = (props) => {
    return <View {...props}>
    <TouchableOpacity
      style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5}}
      onPress={async () => {
        if (soundObject) soundObject.unloadAsync();
        const { sound } = await Audio.Sound.createAsync({ uri: props.currentMessage.audio });
        soundObject = sound;
        await sound.playAsync();
      }}>
      <Text style={{ textAlign: "center", color: "black", padding: 5 }}>Play Sound</Text>
    </TouchableOpacity>
    </View>
  }

  return (
  <View style={[styles.container, {backgroundColor: background}]}>
    <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderAudioBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: id,
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