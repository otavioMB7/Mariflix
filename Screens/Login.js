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
        <View style={styles.tudo}>
            <Text style={styles.title}>Login JuniorFit GYM</Text>

            <View style={styles.inputs}>
                <TextInput style={styles.input}
                    placeholder="Login"
                    value={email}
                    onChangeText={setEmail}

                />
                <TextInput style={styles.input}
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
{/*             <Button
                title="Cadastre-se"
                onPress={() => navigation.navigate('Cadastro')}
            /> */}
            <TouchableOpacity>
                <Text style={styles.texto2} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
            </TouchableOpacity>
            <Text style={styles.creditos}>Maior academia de Criciúma e região;</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tudo: {
        flex: 1,
        backgroundColor: 'orange',
        padding: '50px',
        paddingTop: '150px',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    title: {   
        color: '#000',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    inputs: {
        gap: '10px'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#bdf',
        borderRadius: '10px'
    },
    texto2: {   
        fontSize: '20px',
        fontWeight: 'bold',

        color: "white",
        textAlign: 'center',
    },
    imgLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img: {
        width: '100px',
        height: '100px',
    },
    creditos: {
        textAlign: 'center',
        color: '#105',
        paddingTop: '100px'
    }
});
