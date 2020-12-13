import React, { useContext } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppParamList } from './AppParamList';
import { Center } from './Center';
import { Button, Text } from 'react-native';
import { AuthContext } from './AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-ionicons'
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';


interface AppTabsProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            let iconName:string = undefined || '';

            if (route.name === 'Home') {
                iconName = 'home'
                // return <Icon name='home' />;
            } else if (route.name === 'Search') {
                iconName = 'search';
                // return <Icon name='search' />;
            }

            // You can return any component that you like here!
            // return <Icon name={iconName} size={size} color={color} />;
            return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
    >
        <Tabs.Screen name="Home" component={HomeStack} options={{ tabBarBadge: 1 }}/>
        <Tabs.Screen name="Search" component={SearchStack} />
    </Tabs.Navigator>
    );
}