import React from "react";
import { Text, View } from "react-native";
import Payment from "./Payment";

const MyWallet = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1,  }}>
      {/* Payment component */}
      <Payment navigation={navigation} />
      
      {/* Add space between Payment component and text with margin */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "yellow",position:"static" }}>Your total token is: 1000</Text>
      </View>
    </View>
  );
};

export default MyWallet;
