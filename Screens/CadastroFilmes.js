import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { db } from '../controller.js';
import { collection, addDoc } from 'firebase/firestore';



export default function CadastroFilmes({navigation}) {
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [imagem, setImagem] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [autor, setAutor] = useState("");
    const [ano, setAno] = useState("");
    const [nota, setNota] = useState("");
    const [ondeAssistir, setOndeAssistir] = useState("");



    const cadastrarFilme = async () => {
        try {
            await addDoc(collection(db, "filmes"), {
                nome,
                genero,
                imagem,
                sinopse,
                autor,
                ano: parseInt(ano),
                nota: parseFloat(nota),
                ondeAssistir,
            });
            setNome("");
            setGenero("");
            setImagem("");
            setSinopse("");
            setAutor("");
            setAno("");
            setNota("");
            setOndeAssistir("");

            console.log("Produto cadastrado com sucesso!");

        } catch (error) {
            console.error("Erro ao cadastrar produto: ", error);
        }
    }

    



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Produto</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Filme"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Gênero do filme"	
                value={genero}
                onChangeText={setGenero}
            />
            <TextInput
                style={styles.input}
                placeholder="URL da Imagem"
                value={imagem}
                onChangeText={setImagem}
            />
            <TextInput
                style={styles.input}
                placeholder="Sinopse"
                value={sinopse}
                onChangeText={setSinopse}
            />
            <TextInput
                style={styles.input}
                placeholder="Autor"
                value={autor}
                onChangeText={setAutor}
            />
            <TextInput
                style={styles.input}
                placeholder="Ano de Lançamento"
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nota"
                value={nota}
                onChangeText={setNota}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Onde Assistir"
                value={ondeAssistir}
                onChangeText={setOndeAssistir}
            />



            <TouchableOpacity style={styles.button} onPress={cadastrarFilme}>

                <Text style={styles.buttonText}>Cadastrar</Text>

            </TouchableOpacity>
        </View>
    





    )
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
        color: '#ff8c00', // Laranja escuro para o texto do link
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
        backgroundColor: '#ff8c00', // Botão laranja escuro
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#ff8c00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
