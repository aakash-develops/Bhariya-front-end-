import React from 'react';
import { Text, TextInput, Button, View, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as Yup from 'yup';
import { ImageBackground } from 'react-native';

const UpdateFreight = ({ route, navigation }: any) => {
  const phoneId: string = route.params.paramKey;
  const [price, setPrice] = React.useState<string>('');

  return (
    <SafeAreaView style={{backgroundColor:"#EF4136", flex: 1, alignContent: "center" }} >
      <ImageBackground
            source={require("../assets/background.jpeg")}
            style={{ height: Dimensions.get("window").height }}>
      {/* <View style={{ paddingHorizontal: 20, paddingTop: 20 }}> */}
        <TextInput
          style={{
            padding: 10,
            borderColor: 'black',
            backgroundColor: '#94e9de',
            borderRadius: 10,
            fontSize: 20,
            marginBottom: 10,
          }}
          value={price}
          onChangeText={(text) => setPrice(text)}
          placeholder="Price"
          maxLength={10}
          keyboardType="numeric"
        />
        <Button
          title="Update your price"
          onPress={async () => {
            const priceValue: number = parseFloat(price);
            if (!priceValue || isNaN(priceValue)) {
              Alert.alert('Please enter a valid price');
              return;
            }
            try {
              await axios.put(`http:192.168.1.74:8000/ClientUpdate/${phoneId}`, { price: priceValue });
              Alert.alert('Request is updated successfully');
              navigation.pop(2);
            } catch (error) {
              // Handle error
            }
          }}
        />
      {/* </View> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UpdateFreight;
