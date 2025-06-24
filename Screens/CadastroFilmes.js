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



    const cadastrarFilme = async () => {
        try {
            await addDoc(collection(db, "filmes"), {
                nome,
                genero,
                imagem,
                sinopse,
                autor,
                ano: parseInt(ano),
            });
            setNome("");
            setGenero("");
            setImagem("");
            setSinopse("");
            setAutor("");
            setAno("");
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















            <TouchableOpacity style={styles.button} onPress={cadastrarFilme}>

                <Text style={styles.buttonText}>Cadastrar</Text>

            </TouchableOpacity>
        </View>
    





    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#ff8c00',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

});
