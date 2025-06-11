import { StyleSheet, Text, TextInput, Button, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';


import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../controller.js';

export default function Login({navigation}) {
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");

    const VerificaUser = () => {
        signInWithEmailAndPassword(auth, email, senha)
        .then(userCredential => {
            console.log("Usuario logado com sucesso", userCredential.user.email);
            navigation.navigate('HomeTab');
        })
        .catch((error) => {
            console.log("Erro ao logar usuario", error.message);
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login MariFlix</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
            </View>
            <Button
                title="Entrar"
                onPress={VerificaUser}
            />
            <TouchableOpacity>
                <Text style={styles.registerText} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>O palco das suas críticas cinematográficas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc', // beige color
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#000', // black color
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#000', // black border
        paddingHorizontal: 10,
        backgroundColor: '#fff', // white background
        borderRadius: 5,
    },
    registerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000', // black color
        textAlign: 'center',
        marginTop: 10,
    },
    footerText: {
        textAlign: 'center',
        color: '#000', // black color
        marginTop: 30,
        fontSize: 14,
    },
});
