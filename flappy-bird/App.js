import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './src/components/bird';

export default function App() {
  const birdWidth = Dimensions.get('screen').width ;
  const birdHeight = Dimensions.get('screen').height ;

   const birdLeft = birdWidth/ 2 ;
   const [birdBottom, setBirdBottom] = useState(birdHeight / 2) ;

   const gravity = 3 ;

   let gameTimerId;

   useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom - gravity);
      }, 30);
      return () => {
        clearInterval(gameTimerId);
      }
    }
   }, [birdBottom]) ;

  return (
    <View style={styles.container}>
      <Bird
         birdLeft={birdLeft}
         birdBottom={birdBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
