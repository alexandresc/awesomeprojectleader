import React, { useContext, useEffect, useState } from 'react'
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { NavigationContainer, RouteProp } from "@react-navigation/native"
// import signin from './pages/react-navigation/signin'
import { ActivityIndicator, Button, Text, View } from 'react-native'
import { Center } from './Center'
import { AuthNavProps, AuthParamList } from './AuthParamList'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack'


interface RoutesProps {

}



export const Routes: React.FC<RoutesProps> = ({}) => {
    const {user,login,logout} = useContext(AuthContext)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        // check if the user is logged in or not
        AsyncStorage.getItem("user")
          .then(userString => {
            if (userString) {
              // decode it
              login();
            }
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);


    if (loading){
        return (
        <Center>
            <ActivityIndicator size="large" color="#0000ff" />
        </Center>
        );
    }

    return (
        <NavigationContainer>
            { user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Routes;