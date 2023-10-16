import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

export default function SliderComp() {
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const playbackState = usePlaybackState();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  useEffect(() => {
    const updateProgress = async () => {
      const currentPosition = await TrackPlayer.getPosition();
      const currentDuration = await TrackPlayer.getDuration();
      setPosition(currentPosition);
      setDuration(currentDuration);
    };

    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playbackState === TrackPlayer.STATE_PLAYING && isSeeking) {
      TrackPlayer.pause();
    }
  }, [isSeeking, playbackState]);

  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.round(secs - minutes * 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleChange = val => {
    setSeek(val);
  };

  const handleSlidingComplete = async val => {
    setIsSeeking(false);
    await TrackPlayer.seekTo(val);
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: 320, height: 40 }}
        minimumValue={0}
        value={isSeeking ? seek : position}
        onValueChange={value => {
          setIsSeeking(true);
          setSeek(value);
        }}
        maximumValue={duration}
        minimumTrackTintColor="#ffffff"
        onSlidingComplete={handleSlidingComplete}
        maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
        thumbTintColor="#fff"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers}>
          {formatTime(isSeeking ? seek : position)}
        </Text>
        <Text style={styles.timers}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timers: {
    color: '#fff',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
