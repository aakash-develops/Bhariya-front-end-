import React from 'react';
import { View, ImageBackground, Dimensions, Text } from 'react-native';
import Payment from './Payment'; // Assuming the Payment component is in a file named Payment.tsx

const Wallet: React.FC = () => {
  let token: number = 1000;
  
  return (
    <ImageBackground source={require('../assets/background.jpeg')} style={{ height: Dimensions.get('window').height, padding: 10, flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#fdd017' }}>Your have ${token}</Text>
      <Payment />
    </ImageBackground>
  );
};

export default Wallet;
