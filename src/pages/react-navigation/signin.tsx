import React, {useState} from 'react'
import { Button, View, StyleSheet,TextInput,Text } from 'react-native'
import Dashboard from '../react-navigation/dashboard';

function signin() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [testloginmessage,setTestloginmessage] = useState('');
    const [token,setToken] = useState('');

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
            setTestloginmessage("")
            console.log(responseJson)
            console.log("OLHA O TOKEN" + "\n" + responseJson.token)
            if (responseJson.token){
                console.log("tem token")
                setToken(responseJson.token)
                console.log({token})
                setTestloginmessage("Logado")
            } else {
                console.log("nao tem token")
                setTestloginmessage(JSON.stringify(responseJson))
            }
        }).catch((error) => {
            console.log(error)
            setTestloginmessage(JSON.stringify(error))
        }
        )
    }

    return (
        <View>
            {token !== ''  ?
            <View>
                <Dashboard />
            </View>
             : 
             <View style={styles.container}>
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
                <Button title="Test login via api" onPress={getLogin} color="purple"/>
                <Text>{testloginmessage}</Text>
            </View>
            
            }
        </View>
        


    )
}

const styles = StyleSheet.create({
    container: {
        top: 50,
        // flex:1,
        justifyContent: "center",
        width: 250,
        alignSelf: "center",
        // borderRadius: 25,        
    }
})

export default signin
