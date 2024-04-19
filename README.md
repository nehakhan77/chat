## Objective 

To build a React Native chat application that provides users a chat interface and real-time messaging with the use of Firebase. This app allows users to instantly message their friends, share their current location, share images, send audio recordings and access their previous conversations when offline.

## Key Features 


Real-Time Messaging: Users can quickly enter a chatroom and start talking with family and friends.

Location Sharing: Users are able to share their current location with their friends to show where they are.

Media Sharing: Users are able to share images from their phone’s image library and take pictures with their device’s camera app to share with their friends.

Offline Mode: Users can read messages when offline.


## Prerequsites

Node.js

Expo CLI

Android Studio (for Android development)

Xcode (for iOS development)

## App User Interface


## Set Up This App

● Clone the Repository
```
https://github.com/nehakhan77/chat.git
```

● Navigate to the chat-app folder and run npm install

● Set up Firebase for your project:

● Sign in at Google Firebase

● Create a project

● Set up Firestore Database (production mode)

● Adjust rules from allow read, write: if false; to allow read, write: if true;

● Register app(</>) in Project Overview

● Navigate to the chat-app folder and install the Firebase using npm install firebase

● Initialize Firebase by copying and pasting the provided Firebase configuration into the App.js

● Download Android Studio on your computer or use the Expo Go App on your mobile device

● Run expo start
```
npx expo start
```

## References 

1. Expo   
Description - Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
https://expo.dev/

2. Gifted Chat Library 
Description - Gifted Chat is a complete chat UI for React Native & the Web.
https://github.com/FaridSafi/react-native-gifted-chat

3. Google Firebase
Description - Firebase is Google’s mobile application development platform that helps you build, improve, and grow your app. Cloud Firestore, one of its services, works by synchronizing data across multiple devices (iOS, Android, and web) and storing it in Firebase’s cloud.
https://firebase.google.com/

4. Android Studio
Description - Android Studio is the  official Integrated Development Environment (IDE) for Android app development.
https://developer.android.com/studio

5. NetInfo
Description - A cross-platform API that provides access to network information.
https://docs.expo.dev/versions/latest/sdk/netinfo/

6. AsyncStorage
Description - AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app.
https://reactnative.dev/docs/asyncstorage

7. Expo Location
Description - A library that provides access to reading geolocation information, polling current location or subscribing location update events from the device.
https://docs.expo.dev/versions/latest/sdk/location/

8. Expo ImagePicker
Description - A library that provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
https://docs.expo.dev/versions/latest/sdk/imagepicker/

9. Expo-AV
Description - A universal library that provides separate APIs for Audio and Video playback.
https://docs.expo.dev/versions/latest/sdk/av/




