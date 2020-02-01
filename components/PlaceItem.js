import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';
import Colors from '../constants/Colors';

const PlaceItem = props => {

    const dispatch = useDispatch();

    const deleteLocationHandler = () => {

        Alert.alert(
            'Alert',
            'Do you want to delete this item?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                  text: 'Yes', 
                  onPress: () => {
                    dispatch(placesActions.removePlace(props.id, props.image));
                  }
              },
            ],
            {cancelable: false},
          );
    }


    return (
        <TouchableOpacity
            onPress={props.onSelect}
            style={styles.placeItem}
            onLongPress={deleteLocationHandler}
        >
            <Image 
                style={styles.image}
                source={{ uri: props.image }}
            />
            <View  style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Colors.primary,
        borderWidth: 1,
    },

    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },

    address: {
        color: '#666',
        fontSize: 16
    }

});

export default PlaceItem;