import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {

    const initialLocation = props.navigation.getParam('initialLocation');

    const readOnly =  props.navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const selectedSolactionHandler = event => {

        if(readOnly) {
            return;
        }

        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    };


    // an workaround to pass the savePickedLocationHandler to the navigation button
    // using useCallback to avoid infinity looping
    // this function will be created when a new seletedLocation is selected
    const savePickedLocationHandler = useCallback(() => {

        if(!selectedLocation) {
            return;
        }

        props.navigation.navigate(
            'NewPlace',
            {
                pickedLocation: selectedLocation
            }
        );

    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler})
    }, [savePickedLocationHandler]);

    // --------------------------------------------------------------------------

    // latitudeDelta describe the span around the target
    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.7,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    let markerCoordinates;

    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView 
            region={mapRegion}
            style={styles.map}
            onPress={selectedSolactionHandler}
        >
            { selectedLocation && (<Marker title='Picked Location' coordinate={markerCoordinates}></Marker>) }
        </MapView>
    );
    
}

MapScreen.navigationOptions = navData => {

    const saveFunction = navData.navigation.getParam('saveLocation');

    const reado =  navData.navigation.getParam('readonly');

    if(reado) {
        return {};
    }

    return {
        headerRight: () => (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={saveFunction}
                            >
                                <Text style={styles.headerButtonText}>Save</Text>
                            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({

    map: {
        flex: 1
    },

    headerButton: {
        marginHorizontal: 20
    },

    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;

