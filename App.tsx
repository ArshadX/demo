import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native';
import Root from './src/router/Root';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';



const App = () => {
  return ( 
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Root />
    </NavigationContainer>
    </PersistGate>
    </Provider>
   );
}
 
export default App;
