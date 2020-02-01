import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import { verifyPermissions } from '../helpers/permission';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    // this param comes from MapScreen.js
    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    // destructring sintax
    const {onLocationPicked} = props;

    useEffect(() => {

        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }

    }, [mapPickedLocation, onLocationPicked])

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

    const getLocationHandler = async () => {

        const failPermissionCallback = () => {
            Alert.alert('Insufficient permissions!', 
            'You need to grant location permissions to use this app',
             [{ text: 'Ok'}]);
        };
    
        const hasPermission = await verifyPermissions([Permissions.LOCATION], failPermissionCallback);

        if(!hasPermission) {
            return;
        }

        try {

            setIsFetching(true);

            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });

            setIsFetching(false);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        } catch(err) {
            Alert.alert(
                        'Could not fetch location', 
                        'Please try again later or pick a location on the map',
                        [{text: 'Ok'}]
                    );
        }
    };

    return (<View style={styles.locationPicker}>
                <MapPreview 
                    style={styles.mapPreview}
                    location={pickedLocation}
                    onPress={pickOnMapHandler}
                >
                    {isFetching ? (<ActivityIndicator
                        size='large'
                        color={Colors.primary}
                    />) : (<Text>No location chosen yet</Text>)}
                </MapPreview>
                <View 
                    style={styles.action}
                >
                    <Button
                        title='Get User Location'
                        color={Colors.primary}
                        onPress={getLocationHandler}
                    />
                    <Button
                        title='Pick on Map'
                        color={Colors.primary}
                        onPress={pickOnMapHandler}
                    />
                </View>
            </View>
            );

}

const styles = StyleSheet.create({

    locationPicker: {
        marginBottom: 15
    },

    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1 
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }

});

export default LocationPicker;