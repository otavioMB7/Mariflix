import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Card from '../components/card.js';
import { db } from '../controller.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useFavoritos } from '../components/FavoritosProvider.js';

export default function Product({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [plataformaSelecionada, setPlataformaSelecionada] = useState('Todos');
  const [notaMinima, setNotaMinima] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const { adicionarFilme } = useFavoritos();

  useEffect(() => {
    async function carregarFilmes() {
      try {
        let filtros = [];

        if (generoSelecionado !== 'Todos') {
          filtros.push(where("genero", "==", generoSelecionado));
        }

        if (plataformaSelecionada !== 'Todos') {
          filtros.push(where("ondeAssistir", "==", plataformaSelecionada));
        }

        let q;
        if (filtros.length > 0) {
          q = query(collection(db, "filmes"), ...filtros);
        } else {
          q = query(collection(db, "filmes"));
        }

        const querySnapshot = await getDocs(q);
        let lista = [];
        querySnapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ...doc.data()
          });
        });

        
        if (notaMinima) {
          lista = lista.filter(item => Number(item.nota) >= Number(notaMinima));
        }
        if (anoSelecionado) {
          lista = lista.filter(item => String(item.ano) == String(anoSelecionado));
        }

        setFilmes(lista);

      } catch (error) {
        console.log("Erro ao carregar filmes", error);
      }
    }

    carregarFilmes();
  }, [generoSelecionado, plataformaSelecionada, notaMinima, anoSelecionado]);

  const generos = ['Todos', 'Ação', 'Comédia', 'Drama', 'Terror', 'Romance'];
  const plataformas = ['Todos', 'Netflix', 'Prime Video', 'Disney+', 'MAX'];

  const limparFiltros = () => {
    setGeneroSelecionado('Todos');
    setPlataformaSelecionada('Todos');
    setNotaMinima('');
    setAnoSelecionado('');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.filtros}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Filtros</Text>

          
          <Text style={styles.label}>Gênero</Text>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Todos' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Todos')}
>
  <Text style={styles.textFiltro}>Todos</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Ação' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Ação')}
>
  <Text style={styles.textFiltro}>Ação</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Comédia' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Comédia')}
>
  <Text style={styles.textFiltro}>Comédia</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Drama' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Drama')}
>
  <Text style={styles.textFiltro}>Drama</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Terror' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Terror')}
>
  <Text style={styles.textFiltro}>Terror</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    generoSelecionado === 'Romance' && styles.botaoSelecionado
  ]}
  onPress={() => setGeneroSelecionado('Romance')}
>
  <Text style={styles.textFiltro}>Romance</Text>
</TouchableOpacity>

          
<Text style={styles.label}>Plataforma</Text>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    plataformaSelecionada === 'Todos' && styles.botaoSelecionado
  ]}
  onPress={() => setPlataformaSelecionada('Todos')}
>
  <Text style={styles.textFiltro}>Todos</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    plataformaSelecionada === 'Netflix' && styles.botaoSelecionado
  ]}
  onPress={() => setPlataformaSelecionada('Netflix')}
>
  <Text style={styles.textFiltro}>Netflix</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    plataformaSelecionada === 'Prime Video' && styles.botaoSelecionado
  ]}
  onPress={() => setPlataformaSelecionada('Prime Video')}
>
  <Text style={styles.textFiltro}>Prime Video</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    plataformaSelecionada === 'Disney+' && styles.botaoSelecionado
  ]}
  onPress={() => setPlataformaSelecionada('Disney+')}
>
  <Text style={styles.textFiltro}>Disney+</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.botaoFiltro,
    plataformaSelecionada === 'MAX' && styles.botaoSelecionado
  ]}
  onPress={() => setPlataformaSelecionada('MAX')}
>
  <Text style={styles.textFiltro}>MAX</Text>
</TouchableOpacity>

          
          <Text style={styles.label}>Nota mínima</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#aaa"
            value={notaMinima}
            keyboardType="numeric"
            onChangeText={setNotaMinima}
          />

          
          <Text style={styles.label}>Ano de publicação</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#aaa"
            value={anoSelecionado}
            keyboardType="numeric"
            onChangeText={setAnoSelecionado}
          />

          
          <TouchableOpacity style={styles.botaoLimpar} onPress={limparFiltros}>
            <Text style={styles.textLimpar}>Limpar Filtros</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      
      <View style={styles.listaFilmes}>
        <Text style={styles.text}>Lista de Filmes</Text>
        <FlatList
          data={filmes}
          renderItem={({ item }) => (
            <Card
              nome={item.nome}
              genero={item.genero}
              imagem={item.imagem}
              ano={item.ano}
              nota={item.nota}
              ondeAssistir={item.ondeAssistir}
              adicionar={() => {
                adicionarFilme(item);
                navigation.navigate('Favoritos');
              }}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  filtros: {
    width: '30%',
    backgroundColor: '#111',
    padding: 10,
  },
  listaFilmes: {
    width: '70%',
    padding: 10,
  },
  text: {
    fontSize: 24,
    color: '#E50914',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#E50914',
    marginTop: 15,
    marginBottom: 5,
  },
  botaoFiltro: {
    backgroundColor: '#181818',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  botaoSelecionado: {
    borderColor: '#E50914',
    borderWidth: 2,
  },
  textFiltro: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#181818',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  botaoLimpar: {
    backgroundColor: '#E50914',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30, 
  },
  textLimpar: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
