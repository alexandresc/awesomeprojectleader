import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Button, Text, TextInput} from 'react-native';
import {AuthNavProps, AuthParamList} from './AuthParamList';
import {AuthContext} from './AuthProvider';
import {Center} from './Center';
import {LoginPasswordContext} from './LoginPasswordContext';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({navigation}: AuthNavProps<'Login'>) {
  const {login, testloginmessage} = useContext(AuthContext);
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
  } = useContext(LoginPasswordContext);

  return (
    <Center>
      <Text>I am a login screen</Text>
      <TextInput
        style={{}}
        onChangeText={setLoginEmail}
        value={loginEmail}
        placeholder="email"
      />
      <TextInput
        style={{}}
        onChangeText={setLoginPassword}
        value={loginPassword}
        placeholder="password"
      />
      <Button
        title="Test login via api"
        onPress={() => login()}
        color="purple"
      />
      <Text>{testloginmessage}</Text>

      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </Center>
  );
}

function Register({navigation, route}: AuthNavProps<'Register'>) {
  return (
    <Center>
      <Text>route name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate('Login');
          // navigation.goBack()
        }}
      />
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login">
      <Stack.Screen
        options={{
          headerTitle: 'Sign In',
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Sign Up',
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
