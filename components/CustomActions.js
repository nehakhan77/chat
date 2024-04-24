import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
//do not need to install @expo/react-native-action-sheet because it is already installed with react-native-gifted-chat module
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//create child component
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, id }) => {
    const actionSheet = useActionSheet();
    //reference to the recording object returned when calling Audio.Recording.createAsync()// intializing with null
    let recordingObject = null;

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Record Sound', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        return;
                    case 3:
                        startRecording();
                        return;
                    default:
                }
            },
        );
    };

    //create async function to get location data
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
            //call onSend()
            onSend({
            location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            },
            });
        } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    };

    //To upload multiple images, you need to use a unique reference string each time a new file is uploaded
    const generateReference = (uri) => {
        const timeStamp = new Date().getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${id}-${timeStamp}-${imageName}`;
    };

    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        console.log("File has been uploaded successfully");
        const imageURL = await getDownloadURL(snapshot.ref);
        onSend({ image: imageURL });
        });
    };

    //create async function to get permission to media library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        else Alert.alert("Permissions haven't been granted.");
        }
    };

    //create async function to get permission to camera
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        else Alert.alert("Permissions haven't been granted.");
        }
    };

    //create async function to get permission to audio
    const startRecording = async () => {
        try {
            let permissions = await Audio.requestPermissionsAsync();
            if (permissions?.granted) {
                // iOS specific config to allow recording on iPhone device
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY).then(results => {
                    return results.recording;
                }).then(recording => {
                    recordingObject = recording;
                    Alert.alert("You are recording...", undefined, [
                        { text: "Cancel", onPress: () => { stopRecording() } },
                        { text: "Stop and Send", onPress: () => { sendRecordedSound() } },
                    ],
                    { cancelable: false }
                    );
                })
            }
        } catch (err) {
            Alert.alert("Failed to record!");
        }
    }
    
    const stopRecording = async () => {
        await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
        });
        await recordingObject.stopAndUnloadAsync();
    };

    const sendRecordedSound = async () => {
        await stopRecording();
        const uniqueRefString = generateReference(recordingObject.getURI());
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(recordingObject.getURI());
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const soundURL = await getDownloadURL(snapshot.ref);
        onSend({ audio: soundURL });
        });
    };

    useEffect(() => {
        return () => {
        if (recordingObject) recordingObject.stopAndUnloadAsync();
        };
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
            <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
        </TouchableOpacity>
    );
};

//create style
const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: "#b2b2b2",
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: "#b2b2b2",
        fontWeight: "bold",
        fontSize: 10,
        backgroundColor: "transparent",
        textAlign: "center",
        paddingTop: 3,
    },
});

export default CustomActions;
