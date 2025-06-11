
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';

import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../controller.js';
import { useState } from 'react';

export default function SignUp({navigation}) {
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    
    
    const cadastroUser = () => {
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log("Usuario cadastrado com sucesso", userCredential.user.email);
            navigation.navigate('Login');
        })
        .catch((error) => {
            console.log("Erro ao cadastrar usuario", error.message);
        });
    }

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro MariFlix</Text>

            <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                placeholder="Email"
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
            title="Cadastrar"
            onPress={cadastroUser}
            />
            <Text style={styles.footerText}>O palco das suas críticas cinematográficas</Text>
        </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#f5f5dc', // Beige color
        padding: 50,
        paddingTop: 150,
        justifyContent: 'space-between',
        },
        title: {   
        color: '#000', // Black color
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        },
        inputContainer: {
        gap: 10,
        },
        input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff', // White for input background
        borderRadius: 10,
        borderColor: '#000', // Black border
        },
        footerText: {
        textAlign: 'center',
        color: '#000', // Black color
        paddingTop: 100,
        },
    });
