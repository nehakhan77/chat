import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState("");

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../img/BackgroundImage.png')} resizeMode='cover' style={styles.backgroundImage}>
                <Text style={styles.appTitle}>Welcome to Chat App!</Text>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username here'
                />



                <TouchableOpacity
                style={styles.button}
                title="Enter the Chatroom"
                onPress={() => navigation.navigate('Chat', { name: name})}
                />
            </ImageBackground>
        </View>
        );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    opacity: 50
 },
 button: {
    fontSize: 16,
    fontWeight: "600",
    fontColor: "#FFFFFF",
    buttonColor: "#757083"
 },
 backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
 },
 appTitle: {
    fontSize: 45,
    fontWeight: "600",
    fontColor: "#FFFFFF",
    margin: 20
 }
});


export default Start;