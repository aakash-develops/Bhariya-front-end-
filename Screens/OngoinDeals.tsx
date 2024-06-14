import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import axios from "axios";

import Accept from "./Accept";

const OngoingDeals: React.FC<{ navigation: any }> = ({ navigation }) => {
  const phone: number = 9845071110;
  const [list, setList] = useState<any>("");

  useEffect(() => {
    axios
      .get("http://192.168.0.104:8000/ClientFind/" + phone)
      .then((response) => {
        const newlist = response.data;
        setList(newlist);
      });
  }, [navigation]);

  function system(jsonList: any) {
    if (list.accept === "") {
      return (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: 10,
            margin: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 10,
              borderWidth: 5,
              borderColor: "red",
            }}
          >
            <Text style={{ padding: 5, fontSize: 20, textAlign: "left" }}>{`Your request has been updated as :\n
        Pickup location is : ${list.pickUp} \n
        DropOff location is :${list.dropOff}\n
        Item is : ${list.items}\n
        Quantity is : ${list.quantity} ${list.unit}\n
        Vehicle is : ${list.wheelers} wheelers\n
        The cost is : ${list.price}`}</Text>
            <Button title="Accept delivery" onPress={() => { Accept; navigation.navigate("Services"); }} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "red", justifyContent: "center", alignContent: "center", alignItems: "center", padding: 10 }}>
          <Text>No deals found</Text>
          <Button title="GO back" onPress={() => { navigation.goBack(); }} />
        </View>
      );
    }
  }

  return <View>{system(list)}</View>;
};

export default OngoingDeals;
