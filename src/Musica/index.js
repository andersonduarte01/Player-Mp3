import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";

export default function Musica(props){
    return(
      <View style={estilos.container}>
        <View style={estilos.music}>
        <Ionicons name="musical-notes-outline" size={24} color='#CCC' />
        <Text style={estilos.texto}>{props.data.musica}</Text>
        </View>
        
        <View>
          <TouchableOpacity>
            <Ionicons name="play-circle-outline" size={28} color='#CCC' />
          </TouchableOpacity>  
        </View>        
      </View>
    );
  }

  const estilos = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#393e46',
      padding: 10,
      marginTop: 5,
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    texto:{
      color: '#BBB',
      fontSize: 16,
      marginLeft: 10,
      width: '80%'
    },
    music:{
      flexDirection: 'row',
      alignItems: 'center'
    }
  });