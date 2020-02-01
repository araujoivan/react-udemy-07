import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import CustomImagePicker from '../components/ImagePicker';
import LocationPicker from  '../components/LocationPicker';

import { useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';

const NewPlaceScreen = props => {

    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const savePlaceHandler = () => {

        dispatch(placesActions.addPlace(title, selectedImage, selectedLocation));
        props.navigation.goBack();
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    // avoid this function being created every render cycle
    // this function is passed as parameter to a inner LocationPicker component
    const locationPickedHandler = useCallback(location => {

        setSelectedLocation(location);

    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}
                />
                <CustomImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker 
                    navigation={props.navigation} 
                    onLocationPicked={locationPickedHandler}
                />
                <Button
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
    
}

NewPlaceScreen.navigationOptions = {

    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({

    form: {
        margin: 30
    },

    label: {
        fontSize: 18,
        marginBottom: 15
    },

    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;

