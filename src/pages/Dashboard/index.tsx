import React, { useContext, useState } from 'react';
import {View, Button, StyleSheet, TextInput, Text} from 'react-native';
import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');



    // const {signed, signIn} = useContext(AuthContext)
    const { signed, signOut } = useContext(AuthContext)

    // console.log(signed)

    function handleSignOut(){
        // email,password
        // const response = await signIn();

        // console.log(response)
        // console.log("Logar")
        signOut();
        console.log(!signed)
    }

    function getLogin(){
        // fetch('https://webhook.site/97ad4128-312a-4d8e-8b91-07d5b80d4b81',{
        fetch('https://delivery.leaderaplicativos.com.br/api/api-token-auth/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // email: JSON.stringify({email}), 
                // password: JSON.stringify({password}),
                email: {email}.email, 
                password: {password}.password,
                // email: 'usuario@teste.com',
                // password: 'usuario_test_@@',
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
        })
    }

    return (
        <View style={ styles.container } >
            <TextInput 
                style={{}}
                onChangeText={setEmail}
                value={email}
                placeholder='email'
            />
            <TextInput 
                style={{}}
                onChangeText={setPassword}
                value={password}
                placeholder='password'
            />
            {/* <Text>
                {email}
            </Text>
            <Text>
                {password}
            </Text> */}
            <Button title="Test login via api" onPress={getLogin} />
            <Button title="Sign out" onPress={handleSignOut} color="purple"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
    }
})

export default Dashboard;