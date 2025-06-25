
import 'react-native-gesture-handler';  
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Login from './Screens/Login.js';
import CadastroUsuario from './Screens/CadastroUsuario.js';
import Home from './Screens/Home.js';
import CadastroFilmes from './Screens/CadastroFilmes.js';
import FilmesFavoritos from './Screens/FilmesFavoritos.js';
import { FavoritosProvider } from './components/FavoritosProvider.js';


function HomeTabs(){
  const BottomTab = createBottomTabNavigator();

  return(
<BottomTab.Navigator
  screenOptions={{
    tabBarActiveTintColor: "#E50914", // vermelho Netflix
    tabBarInactiveTintColor: "#fff",
    tabBarActiveBackgroundColor: "#181818", // cinza escuro
    tabBarInactiveBackgroundColor: "#181818",
    tabBarStyle: {
      backgroundColor: "#181818",
      borderTopColor: "#E50914",
      borderTopWidth: 2,
      height: 65,
      paddingBottom: 8,
      paddingTop: 8,
    },
    headerShown: false, // remove o header de cima
    tabBarLabelStyle: {
      fontWeight: 'bold',
      fontSize: 14,
      letterSpacing: 1,
    },
  }}
>
  <BottomTab.Screen
    name='Home'
    component={Home}
    options={{
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="home" size={32} color={color} />
      ),
      tabBarLabel: 'Início',
    }}
  />
  <BottomTab.Screen
    name='FilmesFavoritos'
    component={FilmesFavoritos}
    options={{
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="favorite" size={32} color={color} />
      ),
      tabBarLabel: 'Favoritos',
    }}
  />
</BottomTab.Navigator>
  )
}







export default function App() {
  const Stack= createStackNavigator();
  return (
   <FavoritosProvider>
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Cadastro' component={CadastroUsuario}/>
    <Stack.Screen name='CadastroFilmesADM' component={CadastroFilmes}/>
    <Stack.Screen options={{headerShown:false}} name='HomeTab' component={HomeTabs}/>
    

  </Stack.Navigator>
 </NavigationContainer>
 </FavoritosProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
