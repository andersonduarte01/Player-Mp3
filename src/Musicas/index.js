import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from "react-native-track-player";

import songs from '../model/Data';
import Musica from '../Musica';


export default function Musicas(props){
    const[musicas, setMusicas] = useState([])
    const api = `album/api/v1/musica/${props.data}/`
    useEffect(()=>{
        async function album1() {    
          try {
            const resultados = await songs.get(`album/api/v1/musica/${props.data}/`);
            setMusicas(resultados.data);
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(musicas);            
         } catch(error) {
            console.log(error)
         } 
        }
    
        album1();
      }, [props]);
      
    return(
        <View style={estilos.container}>
            <FlatList 
            data={musicas}
            renderItem={({item})=> <Musica data={item} />}
            />
        </View>
    );
}


const estilos = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10,
        paddingTop: 10
    },
});