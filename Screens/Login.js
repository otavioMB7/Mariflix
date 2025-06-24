import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../controller.js';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificaUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            console.log("Usuário logado com sucesso:", userCredential.user.email);

            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                if (userData.role === "admin") {
                    navigation.navigate('CadastroFilmesADM');
                } else {
                    navigation.navigate('HomeTab');
                }
            } else {
                console.log("Documento de usuário não encontrado no Firestore.");
            }

        } catch (error) {
            console.log("Erro ao logar usuário:", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/marilogo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>LOGIN</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#ccc"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={VerificaUser}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.registerText}>Cadastre-se</Text>
            </TouchableOpacity>

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
        color: '#fff',
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
        borderColor: '#444',
        backgroundColor: '#2c2c2c',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#fff',
    },
    registerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c', // Vermelho vivo para links e textos de ação
        textAlign: 'center',
        marginTop: 15,
    },
    footerText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 40,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    button: {
        backgroundColor: '#e74c3c', // Vermelho mais vibrante
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#e74c3c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Sombra no Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
