import 'react-native-gesture-handler';
import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import MusicPlayer from "./src/sreens/MusicPlayer";
import Estilos from "./src/Estilos";
import Contato from "./src/Contato";
import Albuns from "./src/Albuns";
import Musicas from "./src/Musicas";
import Discos from "./src/Discos";


const Menu = ()=>{
  return(
    <Tab.Navigator initialRouteName="Estilos" 
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: '500', color: '#FFF', marginTop: 10, marginBottom: 10},
        tabBarItemStyle: { alignContent: 'space-between', alignItems: 'center' },
        tabBarStyle: { backgroundColor: '#222831', shadowColor: 'white'},         
        tabBarPressColor: '#323b48',
        tabBarIndicatorStyle: {backgroundColor: '#FFF'}
      }}
    >
      <Tab.Screen name="Estilos" component={Estilos} />                
      <Tab.Screen name="Albuns" component={Albuns} />
      <Tab.Screen name="Player" component={MusicPlayer} />          
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>  
  );
}


export default function App(){
  return(
    <SafeAreaView style={estilos.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />
          <Stack.Screen name="Discos" component={Discos} options={{
            headerTitle: 'Inicio', 
            headerStyle:{
              backgroundColor: '#222831',
            },
              headerTintColor: '#BBB',              
              }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#222831'        
  },
})