import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginPasswordContext} from './LoginPasswordContext';

type User = null | {username: string};
type Email = null | string | undefined;
type Password = null | string | undefined;
type TestLoginMessage = null | string | undefined;
// type setEmail = null | string
// type setPassword = null | string

// eslint-disable-next-line no-spaced-func
export const AuthContext = React.createContext<{
  user: User;
  email: Email;
  // setEmail: setEmail,
  password: Password;
  // setPassword: setPassword,
  testloginmessage: TestLoginMessage;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  email: null,
  // setEmail: null,
  password: null,
  // setPassword: null,
  testloginmessage: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const [email] = useState<Email>(null);
  const [password] = useState<Password>(null);
  const [testloginmessage, setTestloginmessage] = useState<TestLoginMessage>(
    null,
  );
  const {loginEmail, loginPassword} = useContext(LoginPasswordContext);

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        // setEmail,
        password,
        // setPassword,
        testloginmessage,
        login: () => {
          // fetch('https://webhook.site/2c1da83a-950d-4120-87e5-348b689e14df',{
          fetch(
            'https://delivery.leaderaplicativos.com.br/api/api-token-auth/',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                // email: JSON.stringify({email}),
                // password: JSON.stringify({password}),
                // email: {email}.email,
                // password: {password}.password,
                // email: 'usuario@teste.com',
                // password: 'usuario_test_@@',
                email: {loginEmail}.loginEmail,
                password: {loginPassword}.loginPassword,
              }),
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              console.log('OLHA O TOKEN' + '\n' + responseJson.token);
              if (responseJson.token) {
                console.log('tem token');
                console.log('loginEmail: \n' + loginEmail);
                console.log('loginPassword: \n' + loginPassword);
                const userLogado = responseJson.token;
                setUser(userLogado);
                AsyncStorage.setItem('user', JSON.stringify(userLogado));
              } else {
                console.log('nao tem token');
                console.log('loginEmail: \n' + loginEmail);
                console.log('loginPassword: \n' + loginPassword);
                setTestloginmessage('nao tem token');
              }
            })
            .catch((error) => {
              console.log(error);
              setTestloginmessage(error);
              console.log('loginEmail: \n' + loginEmail);
              console.log('loginPassword: \n' + loginPassword);
            });

          // const fakeUser = { username: "bob" };
          // setUser(fakeUser);
          // AsyncStorage.setItem("user", JSON.stringify(fakeUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('user');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
