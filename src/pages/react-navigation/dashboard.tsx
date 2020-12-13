import React from 'react'
import {Text,View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import home from './home'
import details from './details'

const Stack = createStackNavigator();

function dashboard() {
    return (
        <Stack.Navigator>
          
          <Stack.Screen name="Home" component={home}/>
          <Stack.Screen name="Details" component={details}/>

        </Stack.Navigator>
    )
}

export default dashboard
