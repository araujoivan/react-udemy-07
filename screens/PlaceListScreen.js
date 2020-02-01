import React, { useEffect } from 'react';
import {  StyleSheet, Platform, FlatList } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';

// userSelector to get access to the redux state object
import { useSelector, useDispatch } from  'react-redux';


import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from  '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlaceListScreen = props => {

    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]); // runs only once when the component is created

    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => <PlaceItem
                id={itemData.item.id}
                image={itemData.item.imageUri}
                title={itemData.item.title}
                address={itemData.item.address}
                onSelect={() => {
                    props.navigation.navigate('PlacesDetail', {
                        placeTitle: itemData.item.title,
                        placeId: itemData.item.id
                    });
                }}
            />}
        />
    );
    
};

PlaceListScreen.navigationOptions = navData => {
   return {
        headerTitle: 'All Places',
        headerRight: () => (
        
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace');
                    }}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({

});


export default PlaceListScreen;