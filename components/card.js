import { View,Text,StyleSheet,Image } from 'react-native';
import { Button } from 'react-native-web';

export default function Card({nome,genero,ano,autor,imagem,adicionar,remover}){
    return(
        <View style={styles.card}>

            <Image style={styles.img} source={{uri: imagem}}></Image>
            <Text style={styles.filmes}>{nome}</Text>
            <Text style={styles.filmes}>{genero}</Text>
            <Text style={styles.filmes}>{ano}</Text>
            <Text style={styles.filmes}>{autor}</Text>
            {adicionar && <Button title="Adicionar" onPress={adicionar}/>}
            {remover && <Button title= 'Remover' onPress={remover}/>} 
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        width: 150,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    img:{
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    filmes:{
        fontSize: 16,
        fontWeight: 'bold',
    }
})