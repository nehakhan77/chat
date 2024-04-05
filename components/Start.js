import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [background, setBackground] = useState("");
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    return(
        <ImageBackground source={require('../img/BackgroundImage.png')} resizeMode='cover' style={styles.backgroundImage}>
            <Text style={styles.appTitle}>Welcome!</Text>
            <View style={styles.container}>
                {/* Container for user input*/}
                <TextInput 
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder='Type your username here'
                />
                {/* View with text and colors container */}
                <Text style={styles.backgroundColorText}>Choose Your Background Color</Text>
                {/* Color selection buttons */}

                <View style={styles.colorButtonsBox}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selected]}
                            onPress={() => setBackground(color)}
                        />
                    ))}
                </View>

                {/* Button to start chatting */}
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
                <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
 container: {
   alignItems: 'center',
   backgroundColor: '#ffffff',
   width: '88%',
   height: '44%',
   marginBottom: 30,
   justifyContent: 'space-evenly',
   borderRadius: 10,
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
    width: "88%",
    backgroundColor: "#757083",
    padding: 15,
    marginTop: 25,
    marginBottom: 15,
    alignItems: "center"
 },
 buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#ffffff',
 },
 backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
 },
 backgroundColorText: {
    fontSize: 18,
    color: "#757083",
    fontWeight: "300",
    marginBottom: 20,
 },
 appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 50
 },
 colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25
 },
 colorButtonsBox: {
    display: "flex",
    flexDirection: 'row',
    width: '80%',
    justifyContent: "space-between",
    marginBottom: 20,
 },
 });


export default Start;