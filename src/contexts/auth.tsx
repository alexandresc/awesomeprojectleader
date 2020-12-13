import React, { createContext, useState, useEffect } from 'react';
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData{
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] = useState<object | null>(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user')
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token')

            if (storagedToken && storagedUser){
                setUser(JSON.parse(storagedUser))
                console.log("storagedToken && storagedUser on = setLoading to false")
                setLoading(false);
            }
        }

        loadStorageData();
    },[])

    async function signIn(){
        const response = await auth.signIn();

        const { token,user } = response;

        setUser(response.user);

        await AsyncStorage.setItem('@RNAuth:user',JSON.stringify(response.user))
        await AsyncStorage.setItem('@RNAuth:token',response.token)
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        }

        )
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;