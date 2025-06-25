

import { View,Text,StyleSheet,Image,FlatList } from 'react-native';
import { useFavoritos } from '../components/FavoritosProvider.js';
import { Button } from 'react-native-web';

import Card from '../components/card.js';

export default function FilmesFavoritos({nome,genero,imagem,ano,nota,ondeAssistir}){
    const {favoritos,removerFilme} = useFavoritos();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            <FlatList
            data={favoritos}
            renderItem={({item,index}) => (
                <Card
                    nome={item.nome}
                    genero={item.genero}
                    imagem={item.imagem}
                    ano={item.ano}
                    nota={item.nota}
                    ondeAssistir={item.ondeAssistir}
                    remover={() => {
                        removerFilme(index);
                    }}
                />
            )}  
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // fundo preto Netflix
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#E50914', // vermelho Netflix
        letterSpacing: 1,
    },

    img:{
        width: 100,
        height: 140,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E50914',
        marginBottom: 10,
        backgroundColor: '#222',
    }

})