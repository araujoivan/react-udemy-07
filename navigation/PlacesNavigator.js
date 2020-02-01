import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import PlacesListScreen from '../screens/PlaceListScreen';
import PlacesDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
{

    PlacesList: PlacesListScreen,
    PlacesDetail: PlacesDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, 
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },

        headerTintColor: Platform.OS !== 'android' ? Colors.primary : 'white'
    }

});




export default createAppContainer(PlacesNavigator);

