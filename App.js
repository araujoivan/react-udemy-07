import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init().then((success) => {
}).catch(error => {
});

const rootReducer = combineReducers({
  places: placesReducer
});

// applyMiddleware injects ReduxThunk into reducer store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  
    return (
      <Provider
        store={store}
      >
        <PlacesNavigator />
      </Provider>
    );

}