import React, { useContext } from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {

    const {signed, signIn} = useContext(AuthContext)

    // console.log(signed)

    function handleSignIn(){
        // email,password
        // const response = await signIn();

        // console.log(response)
        // console.log("Logar")
        signIn();
        console.log(!signed)
    }

    return (
        <View style={ styles.container } >
            <Button title="Sign In" onPress={handleSignIn} color="purple"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
    }
})

export default SignIn;