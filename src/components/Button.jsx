// src/components/Button.js
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from 'expo-av';

export default function Button({ isActive, setIsActive, setTime, time }) {

    const [isWorking, setIsWorking] = useState(false);
    useEffect(() => {
        let interval = null;

        if (isActive) {
        interval = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        } else {
        clearInterval(interval);
        }

        if (time === 0) {
            playAlarm();
            setIsActive(false);
            setIsWorking((prev) => !prev);
            setTime(isWorking ? 300 : 1500);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStartStop = () => {
        playSound();
        setIsActive(!isActive);
    }

    async function playAlarm() {
        const { sound } = await Audio.Sound.createAsync(
        require('../../assets/alarm.mp3')
        );
        await sound.playAsync();
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
        require('../../assets/click.mp3')
        );
        await sound.playAsync();
    }

  return (
    <View>
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {isActive ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  }
});
