import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import UserForm from './Userform';

const Welcome: React.FC = ({ navigation }: any) => {
  return (
    <Swiper style={styles.wrapper} showsButtons loop>
      <View style={styles.slide}>
        <Image source={require('../assets/welcome.jpg')} style={styles.image} />
        <Text style={styles.text}>Welcome to our App</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/image2.jpg')} style={styles.image} />
        <Text style={styles.text}>Enjoy our features</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/image3.jpg')} style={styles.image} />
        {/* <Text style={styles.text}>Stay Connected</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Userform')}>
                  <Text style={{fontSize:20, color:"red" }}>Get Started</Text>
                </TouchableOpacity>
      </View>
      
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Welcome;
