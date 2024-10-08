import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import BlogList from '../screens/BlogList';
import BlogDetails from '../screens/BlogDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()
const Root = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen component={BlogList} name='Blogs'/>
            <Stack.Screen component={BlogDetails} name='Details'/>
        </Stack.Navigator>
     );
}
 
export default Root;