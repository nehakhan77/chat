// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
//storage to save images and videos
import { getStorage } from "firebase/storage";

import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import Start from './components/Start';
import Chat from './components/Chat';

import { LogBox, Alert } from "react-native";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const firebaseConfig = {
  apiKey: "AIzaSyBwvpbj7hHjhI6n0U1ZA8q0OnEcjnZ6NnU",
  authDomain: "chat-demo-app-a8507.firebaseapp.com",
  projectId: "chat-demo-app-a8507",
  storageBucket: "chat-demo-app-a8507.appspot.com",
  messagingSenderId: "864821913520",
  appId: "1:864821913520:web:f1e148bc4fcfc66ba85875"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  //Initialize storage handler
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
    Alert.alert("Connection is lost!");
    disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
       </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
