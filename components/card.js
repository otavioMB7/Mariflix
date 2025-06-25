import { View,Text,StyleSheet,Image } from 'react-native';
import { Button } from 'react-native-web';

export default function Card({nome,genero,ano,nota,imagem,ondeAssistir,adicionar,remover}){
    return(
        <View style={styles.card}>

            <Image style={styles.img} source={{uri: imagem}}></Image>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.genero}>{genero}</Text>
            <View style={styles.anoNota}>
                <Text style={styles.ano}>{ano}</Text>
                <Text style={styles.nota}> {nota}/5★</Text>
            </View>
            <Text style={styles.ondeAssistir}>{ondeAssistir}</Text>
            {adicionar && <View style={styles.button}><Button title="Favoritar" color="#E50914" onPress={adicionar}/></View>}
            {remover && <View style={styles.button}><Button title="Remover" color="#E50914" onPress={remover}/></View>}
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        width: 170,
        minHeight: 280,
        backgroundColor: '#181818', // cinza escuro Netflix
        borderRadius: 12,
        margin: 10,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    img:{
        width: 120,
        height: 160,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E50914', // vermelho Netflix
        marginBottom: 10,
        backgroundColor: '#333',
    },
    nome:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 4,
    },
    genero:{
        fontSize: 14,
        color: '#b3b3b3',
        marginBottom: 2,
    },
    anoNota:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 2,
    },
    ano:{
        fontSize: 13,
        color: '#b3b3b3',
    },
    nota:{
        fontSize: 13,
        color: '#E50914',
        fontWeight: 'bold',
    },
    ondeAssistir:{
        fontSize: 12,
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    button:{
        marginTop: 6,
        width: '100%',
    }
})