import React, { useEffect, useState, useRef } from "react";

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image, ActivityIndicator, FlatList, Platform } from "react-native";
import Slider from "@react-native-community/slider";

import { setupPlayer, addTracks, playPreviousTrack, playNextTrack} from '../Service';

import Ionicons from "react-native-vector-icons/Ionicons";
import songs from "../model/Data";
import Musica from '../Musica';
import TrackPlayer, { Event } from "react-native-track-player";

const {width, height} = Dimensions.get('window');

const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.round(secs - minutes * 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

function Duracao(){
    const[duration, setDuration] = useState(0);
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
        const duracao = await TrackPlayer.getDuration();
        setDuration(duracao);
      })
      
    return(
        <Text style={estilos.progressBarLabelText}>{formatTime(duration)}</Text> 
    )  
}


function Musicas(props){
    const[musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async function album1() {
          let isSetup = await setupPlayer();              
          try {
            const resultados = await songs.get(`album/api/v1/musica/${props.data}/`);
            setMusicas(resultados.data);
            await addTracks(resultados.data);
            setLoading(false);                  
         } catch(error) {
            console.log(error)
         } 
        }
    
        album1();
      }, [props]);
      
      if(loading){
        return(
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#222831' }}>
            <ActivityIndicator color='#FFF' size={45}/>
          </View>
        )
      }else{}  

      
    return(
        <View style={estilos.container}>
            <FlatList 
            data={musicas}
            renderItem={({item})=> <Musica data={item} />}
            />
        </View>
    );
}

export default function MusicPlayer({ route }){
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loading, setLoading] = useState(true);
    const[album, setAlbum] = useState([]);
    const[cantor, setCantor] = useState('...');
    const[imagem, setImagem] = useState('https://static.dicionariodesimbolos.com.br/upload/9d/cb/notas-musicais-1_xl.jpeg');

    useEffect(() => {
        TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
        const duration = await TrackPlayer.getDuration();
        const currentTime = await TrackPlayer.getCurrentTime();
        setDuration(duration);
        setCurrentTime(currentTime);
        });
    }, []);

    
    useEffect(()=>{        
        async function album1() {    
          try {
            const resultados = await songs.get(`album/api/v1/album/${route.params.numeroAlbum}/`);
            setAlbum(resultados.data);
            setImagem(resultados.data.capa);
            setCantor(resultados.data.cantor);
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
      
    return(
        
        <SafeAreaView style={estilos.container}>
                <View style={estilos.mainContainer}>
                    
                {/* image */}

                    <Image 
                        style={[estilos.imageCapa, estilos.imageWrapper]}
                        source={{uri: imagem}}
                    />
                    
                {/*<FlatList 
                        renderItem={renderSongs}
                        data={album}
                        keyExtractor={item => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={()=>{}}
                    />*/}
                                
                {/* songs content */}
                
                <View>
                    <Text style={[estilos.songsTitle, estilos.songsContainer]}>Titulo </Text>
                    <Text style={[estilos.songsArtist, estilos.songsContainer]}>{cantor}</Text>
                </View>

                {/* slider */}
                    <View>
                        <Slider
                            style={estilos.progressBar} 
                            value={1}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="#FFF"
                            minimumTrackTintColor="#BBB"
                            maximumTrackTintColor="#FFF"
                            onSlidingComplete={(value) => {
                                TrackPlayer.seekTo(value);
                              }}
                        />    
                    </View>
                {/* music progress duration */}
                <View style={estilos.progressLevelDuration}>
                    <Text style={estilos.progressBarLabelText}>00:00</Text>
                    <Duracao />
                </View>                
                {/* controls */}
                <View style={estilos.musicControlsContainer}>
                        <TouchableOpacity onPress={playPreviousTrack}>
                            <Ionicons name="play-skip-back-outline" size={20} color='#CCC' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={TrackPlayer.play}>
                            <Ionicons name={"pause-circle-outline"} size={50} color='#CCC' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playNextTrack}>
                        <Ionicons name="play-skip-forward-outline" size={20} color='#CCC' />
                        </TouchableOpacity>
                </View> 
                            
                </View>                    

                <View style={estilos.bottomContainer}>
                    <View style={estilos.bottomIconWrapper}>
                        <TouchableOpacity onPress={()=> {}}>
                            <Ionicons name="heart-outline" size={25} color='#888888' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {}}>
                            <Ionicons name="repeat" size={25} color='#888888' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {}}>
                            <Ionicons name="share-outline" size={25} color='#888888' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {}}>
                            <Ionicons name="ellipsis-horizontal" size={25} color='#888888' />
                        </TouchableOpacity>
                    </View>
                </View>
                    <Musicas data={album.id}/>
           </SafeAreaView>    
    )
}

const estilos = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#222831',
        paddingTop: 40        
    },
    mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer:{
        width: width,
        alignItems: 'center',
        paddingVertical: 40,
        borderBottomColor: '#393e46',
    },
    bottomIconWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    imageCapa:{
        width: '100%',
        height: '100%',
        borderRadius: 15
               
    },
    imageWrapper:{
        height: 179,
        width: 150,
        marginBottom: 10,
    },
    elevation:{
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84
    },
    songsContainer:{
        textAlign: 'center',
        color: '#EEE'
    },    
    songsTitle:{
        fontSize: 14,
        fontWeight: '600',
        
    },
    songsArtist:{
        fontSize: 13,
        fontWeight: '300',
    },
    progressBar:{
        width: 350,
        height: 20,
        marginTop: 15,
        flexDirection: 'row'
    },
    progressLevelDuration:{
        flexDirection: 'row',
        width: 340,
        justifyContent:'space-between'
    },
    progressBarLabelText:{
        color: '#FFF',
        fontWeight: '400'
    },
    musicControlsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 10
    }
})