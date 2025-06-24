
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


function HomeTabs(){
  const BottomTab = createBottomTabNavigator();

  return(
  <BottomTab.Navigator

      screenOptions={{
        tabBarActiveTintColor:"#841584",
        tabBarActiveBackgroundColor:"#d6b6cb",
        tabBarInactiveBackgroundColor:"#e6e1aa",
        tabBarInactiveTintColor:"red",
        headerStyle:{
          backgroundColor:'#d6b6cb',
        },
        headerTintColor:"#841584",
        //headerTitleAlign:'center',


      }}
      >

   
        <BottomTab.Screen name='Home' component={Home}
        options={{
          tabBarIcon:() => (
            <MaterialIcons name="home" size={40} color="black" />
          )
        }}
        />
{/*         <BottomTab.Screen name='CadastroFilmes' component={CadastroFilmes}
        options={{
          tabBarIcon:() => (
            <MaterialIcons name="CadastroFilmes" size={40} color="black" />
          )
        }}
        /> */}
        <BottomTab.Screen name='FilmesFavoritos' component={FilmesFavoritos}
        options={{
          tabBarIcon:() => (
            <MaterialIcons name="FilmesFavoritos" size={40} color="black" />
          )
        }}
        />     

      </BottomTab.Navigator>
  )
}







export default function App() {
  const Stack= createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Cadastro' component={CadastroUsuario}/>
    <Stack.Screen name='CadastroFilmesADM' component={CadastroFilmes}/>
    <Stack.Screen options={{headerShown:false}} name='HomeTab' component={HomeTabs}/>
    

  </Stack.Navigator>
 </NavigationContainer>

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
