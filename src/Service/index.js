import TrackPlayer, {
        AppKilledPlaybackBehavior,
        Capability,
        RepeatMode,
        Event
      } from 'react-native-track-player';
      
      export async function setupPlayer() {
        let isSetup = false;
        try {
          await TrackPlayer.getCurrentTrack();
          isSetup = true;
        }
        catch {
          await TrackPlayer.setupPlayer();
          await TrackPlayer.updateOptions({
            android: {
              appKilledPlaybackBehavior:
                AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                progressUpdateEventInterval: 1000,
            },
            capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
              Capability.SeekTo,
              Capability.Stop
            ],
            compactCapabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
              Capability.Stop,              
            ],
            progressUpdateEventInterval: 2,
          });
      
          isSetup = true;
        }
        finally {
          return isSetup;
        }
      }
      
      export async function addTracks(props) {
        await TrackPlayer.reset();
        const tracks = props.map((item) => {
            return { 
                id: item.id,
                url: item.arquivo_musical,
                musica: item.musica 
            };
        }) 
        await TrackPlayer.add(tracks);
      }
      

      export async function playbackService() {
        TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
        TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
        TrackPlayer.addEventListener(Event.RemoteNext, () => playNextTrack());
        TrackPlayer.addEventListener(Event.RemotePrevious, () => playPreviousTrack());        
      }

     export async function playNextTrack() {
        await TrackPlayer.skipToNext();
    }

    export async function playPreviousTrack() {
      await TrackPlayer.skipToPrevious();
  }

  export const playTrackPlayer = async () => {
    const duration = await TrackPlayer.getDuration()
    console.log('Tempo: ' + (duration / 60));
    return(
      <Text style={estilos.progressBarLabelText}>{duration}</Text>
    )   
}
  export const MusicaTempo = async () => {
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
      const duracao = await TrackPlayer.getDuration();
      setDuration(duracao);
    })
  }