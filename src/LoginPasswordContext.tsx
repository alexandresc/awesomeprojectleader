import React from 'react';

type loginEmail = any;
type loginPassword = any;

interface LoginPasswordProps {}

export const LoginPasswordContext = React.createContext<{
  loginEmail: any;
  setLoginEmail: any;
  loginPassword: any;
  setLoginPassword: any;
}>({
  loginEmail: null,
  setLoginEmail: null,
  loginPassword: null,
  setLoginPassword: null,
});

// export const LoginPasswordContext = createContext(null)

// export const LoginPasswordContext = React.createContext<{}>({})

// export const LoginPasswordProvider: React.FC<LoginPasswordProps> = ({
//   children,
// }) => {
//   const [loginEmail, setLoginEmail] = useState<loginEmail>('');
//   const [loginPassword, setLoginPassword] = useState<loginPassword>('');

//   return (
//     <LoginPasswordProvider
//       value={{loginEmail, setLoginEmail, loginPassword, setLoginPassword}}>
//       {children}
//     </LoginPasswordProvider>
//   );
// };
