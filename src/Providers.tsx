import React, {useState} from 'react';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';
import {LoginPasswordContext} from './LoginPasswordContext';

interface ProviderProps {}

export const Providers: React.FC<ProviderProps> = ({}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  return (
    <LoginPasswordContext.Provider
      value={{
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
      }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </LoginPasswordContext.Provider>
  );
};

export default Providers;
