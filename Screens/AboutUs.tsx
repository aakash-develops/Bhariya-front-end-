import React from 'react';
import { ScrollView, ImageBackground, View, Text, Dimensions } from 'react-native';

const AboutUs: React.FC = () => {
  return (
    <ScrollView
      style={{ padding: 30, marginTop: 1, backgroundColor: "#EF4136" }}
    >
      <ImageBackground
        source={require('../assets/aboutUs.jpg')}
        style={{
          height: Dimensions.get('window').height / 4,
          padding: 30,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.5)', // Optional: to improve text readability
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#fdd017', textAlign: 'center' }}>
            "Beyond fast and reliable delivery, we're in the business of smiles."
          </Text>
        </View>
      </ImageBackground>

      <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 10, color: '#fff' }}>
        "Welcome to 
        <Text style={{ color: '#fdd017', fontSize: 18 }}>
          Team Bhariya
        </Text>
        , where customer satisfaction is our priority. We go beyond the ordinary, providing not just delivery services but an experience tailored to your needs. Your convenience is our mission, and your peace of mind is our guarantee."
      </Text>

      <View
        style={{
          borderRadius: 10,
          borderColor: '#fdd017',
          borderWidth: 2,
          backgroundColor: '#EF4136',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 }}>
          Contact Us
        </Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>
          Chairman: <Text style={{ fontWeight: 'bold' }}>Mr. Kamal Phuyal</Text>
        </Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>
          Contact No: +9779767220450, +9779807128513
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
