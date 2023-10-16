import React, {useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import songs from "../model/Data";
import Discos from "../Discos";

function Estilo(props){
  const navegar = useNavigation();

  function MostrarAlbuns(props){
    navegar.navigate('Discos', {numeroEstilo: props});
  }
  return(    
    <View style={estilos.containerEstilo}>
      <View style={estilos.notasMusicais}>
      <Ionicons name="musical-notes-outline" size={50} color='#CCC' />
      <Text style={estilos.estiloTexto}>{props.data.estilo}</Text>
      </View>
      <TouchableOpacity
        onPress={()=> MostrarAlbuns(props.data.id)}
      >
        <Ionicons name="play-circle-outline" size={50} color='#BBB' />
      </TouchableOpacity>
    </View>
  );
}


export default function Estilos() {
  const [estyles, setEstilos] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(()=>{
    async function album1() {    
      try {
        const resultados = await songs.get('album/api/v1/estilos/');
        setEstilos(resultados.data);
        setLoading(false)
     } catch(error) {
        console.log(error)
     } 
    }

    album1();
  }, []);

  if(loading){
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#222831' }}>
        <ActivityIndicator color='#FFF' size={45}/>
      </View>
    )
  }else{} 

  return (
    <View style={estilos.container}>
      <FlatList 
        data={estyles}
        renderItem={({item})=> <Estilo data={item}/>}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#222831',
    padding: 5,   
  },
  containerEstilo:{
    borderWidth: 1,
    borderColor: '#FFF',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center'
  },
  estiloTexto:{
    color: '#CCC',
    fontSize: 26,
    fontWeight: '600',
    paddingLeft: 10
  },
  notasMusicais:{
    flexDirection:'row',
    alignItems: 'center'
  }
})