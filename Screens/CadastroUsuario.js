
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../controller.js';

import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../controller.js';
import { useState } from 'react';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const cadastroUser = () => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then(async (userCredential) => {
                console.log("Usuário cadastrado com sucesso", userCredential.user.email);

                // Salvar no Firestore
                const user = userCredential.user;
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        role: "user"
                    });
                    console.log("Usuário salvo no Firestore com role user");
                } catch (firestoreError) {
                    console.log("Erro ao salvar no Firestore:", firestoreError.message);
                }

                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log("Erro ao cadastrar usuário:", error.message);
            });
    }

    

    
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/marilogo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>CADASTRO</Text>

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
            backgroundColor: '#1c1c1c',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: 140,
            height: 140,
            marginBottom: 20,
            opacity: 0.85,
        },
        title: {
            color: '#888',
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 25,
            textAlign: 'center',
        },
        inputContainer: {
            width: '100%',
            marginBottom: 25,
        },
        input: {
            height: 45,
            borderWidth: 1,
            borderColor: '#444', // Cinza escuro para a borda
            backgroundColor: '#2c2c2c', // Cinza chumbo no fundo do input
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 15,
            fontSize: 16,
            color: '#fff', // Texto branco nos inputs
        },
        registerText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#c0392b', // Vermelho escuro
            textAlign: 'center',
            marginTop: 15,
        },
        footerText: {
            textAlign: 'center',
            color: '#888', // Cinza médio
            marginTop: 40,
            fontSize: 14,
            fontWeight: '600',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
        },
        button: {
            backgroundColor: '#c0392b', // Vermelho escuro
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            marginTop: 10,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });
    
