import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

import songs from '../model/Data';
import { useNavigation } from '@react-navigation/native';


function Album(props){
  const navegar = useNavigation();

  function TocarMusicas(props){
    navegar.navigate('Player', {numeroAlbum: props});
  }
  return(
    <View style={estilos.album}>
      <Image
        source={{uri: props.data.capa}} 
        style={estilos.imagem}
      />
      <View style={estilos.containerTexto}>
        <Text style={estilos.texto}>{props.data?.nome_album}</Text>
        <Text style={estilos.textoCantor}>{props.data?.cantor}</Text>
        <Text style={estilos.textoMusicas}>10 Musicas</Text>
        <TouchableOpacity 
          style={estilos.botaoOuvir}
          onPress={()=>{TocarMusicas(props.data.id)}}
        >
          <Ionicons name="musical-notes-outline" size={20} color='#CCC' />
          <Text style={estilos.textoOuvir}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default function Discos({route}){    
  const[albuns, setAlbuns] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{    
    async function album1() {    
      try {
        const resultados = await songs.get(`album/api/v1/estilo/${route.params.numeroEstilo}/`);        
        const results = await songs.get(`album/api/v1/selecao/estilo/albuns/${resultados.data.id}/`);
        setAlbuns(results.data);
        setLoading(false);
     } catch(error) {
        console.log(error)
     } 
    }

    album1();
  }, [route]);

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
          data={albuns}
          renderItem={({item})=> <Album data={item} />}
        />
    </View>
    )
}

const estilos = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#222831',
    paddingTop: 10 
  }, 
  album:{
    flexDirection: 'row',
    margin: 10,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',    
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5      
    
  },
  imagem:{
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 5   
  },
  texto:{
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    color: '#FFF',
    marginTop: 1
  },
  textoCantor:{
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 20,
    color: '#FFF',
    marginTop: 1
  },
  textoMusicas:{
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 20,
    color: '#FFF',
    marginTop: 1
  },
  containerTexto:{
    flex: 1,
    alignItems: 'flex-start',
  }, 
  botaoOuvir:{
    flexDirection: 'row',
    marginLeft: 20,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#AAA',
    marginTop: 3
  },
  textoOuvir:{
    color: '#FFF',
    marginLeft: 3,
    marginRight: 3
  }
});
