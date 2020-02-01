import React, { useState}  from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { verifyPermissions } from '../helpers/permission';
import * as Permissions from 'expo-permissions';

const CustomImagePicker = props => {

    const [pickedImage, setPickedImage] = useState();

    const takeImageHandler = async () => {

        const failPermissionCallback = () => {
            Alert.alert('Insufficient permissions!', 
            'You need to grant camera permissions to use this app',
             [{ text: 'Ok'}]);
        };

        const hasPermission = await verifyPermissions([Permissions.CAMERA, Permissions.CAMERA_ROLL], failPermissionCallback);

        if(!hasPermission) {
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // enables cropping
            aspect: [16, 9],
            quality: 0.5 // 1 is the highest value

        });

        if(!image.cancelled) {
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (<Text>No image picked yet</Text>) :
                (<Image 
                    style={styles.image}
                    source={{uri: pickedImage}}
                />)}
            </View>
            <Button 
                title='Take Image'
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    )
};

const styles = StyleSheet.create({

    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },

    imagePreview: {

        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },

    image: {
        width: '100%',
        height: '100%'
    }
});

export default CustomImagePicker;