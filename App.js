
import 'react-native-gesture-handler';  
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const Stack= createStackNavigator();
  return (
    <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Cadastro' component={SignUp}/>
    <Stack.Screen options={{headerShown:false}} name='HomeTab' component={HomeTabs}/>
    




  </Stack.Navigator>



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
