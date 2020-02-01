import * as FileSystem from 'expo-file-system';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE'; 
export const DELETE_PLACE = 'DELETE_PLACE'; 

import { insertPlace, selectAllPlaces, deletePlace } from '../helpers/db';

export const removePlace = (id, fileUri) => {

    return async dispatch => {

        try {

            const dbResult = await deletePlace(id);

            await FileSystem.deleteAsync(fileUri);

            dispatch({ type: DELETE_PLACE, id: id});

        } catch(err) {
            console.log('Something went wrong with database', err)
            throw err;
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {

        try {

            const dbResult = await selectAllPlaces();

            let rows = [];

            if( dbResult.rows &&  dbResult.rows._array ) {
                rows =  dbResult.rows._array;
            }
          
            dispatch({ type: SET_PLACE, places: rows});
        } catch(err) {
            console.log('Something went wrong with database', err)
            throw err;
        }
    }
}

export const addPlace = (title, image, location) => {

    //redux thunk
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }
        
        const resData = await response.json();

        if(!resData.results) {
            throw new Error('Something went wrong!');
        }

        const address = resData.results[0].formatted_address

        // split the image path and get the last element which is the filename
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {

            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);

            dispatch( 
                { type: ADD_PLACE, placeData: { 
                                                id: dbResult.insertId, 
                                                title: title, 
                                                image: newPath,
                                                address: address,
                                                coords: {
                                                    lat: location.lat,
                                                    lng: location.lng
                                                }
                                              } } );

        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}