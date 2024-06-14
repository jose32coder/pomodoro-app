import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './src/components/Header'
import Timer from './src/components/Timer';
import Button from './src/components/Button';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK');



  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors[currentTime]}]}
    >
      <View style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'android' && 50,
          borderWidth: 3
        }}>
        <Text style={styles.text}>Pomodoro App</Text>
        <Header 
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          />
        <Timer time={time}/>
        <Button 
          isActive={isActive}
          setIsActive={setIsActive}
          setTime={setTime}
          time={time}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});
