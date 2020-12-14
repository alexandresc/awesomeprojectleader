import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginPasswordContext} from './LoginPasswordContext';

type User = null | {username: string};
type Email = null | string | undefined;
type Password = null | string | undefined;
type TestLoginMessage = null | string | undefined;

// eslint-disable-next-line no-spaced-func
export const AuthContext = React.createContext<{
  user: User;
  email: Email;
  password: Password;
  testloginmessage: TestLoginMessage;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  email: null,
  password: null,
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
        password,
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
              console.log('TEM TOKEN?' + '\n' + responseJson.token);
              if (responseJson.token) {
                console.log('tem token sim');
                const userLogado = responseJson.token;
                setUser(userLogado);
                AsyncStorage.setItem('user', JSON.stringify(userLogado));
              } else {
                if (responseJson.non_field_errors) {
                  console.log(JSON.stringify(responseJson.non_field_errors));
                  setTestloginmessage(
                    JSON.stringify(responseJson.non_field_errors),
                  );
                } else if ({loginEmail} || {loginPassword} == null) {
                  console.log({loginEmail});
                  console.log({loginPassword});
                  console.log('Campo login e/ou senha não podem ser vazios');
                  setTestloginmessage(
                    'Campo login e/ou senha não podem ser vazios',
                  );
                } else {
                  console.log(
                    'Campo login e/ou senha possivelmente estão errados',
                  );
                  setTestloginmessage(
                    'Campo login e/ou senha possivelmente estão errados',
                  );
                }
              }
            })
            .catch((error) => {
              console.log(error);
              setTestloginmessage(error);
            });
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
