import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import axios from "axios";


import Accept from "./Accept";
import uuid from './../node_modules/expo-modules-core/build/uuid/uuid';
import moment from 'moment';


const Invoice: React.FC<{ navigation: any }> = ({ navigation }) => {
  const phone: number = 9845071110;
  const [list, setList] = useState<any>("");
const id= uuid.namespace.oid
const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');


  useEffect(() => {
    axios
      .get("http://192.168.1.169:8000/ClientFind/" + phone)
      .then((response) => {
        const newlist = response.data;
        setList(newlist);
      });
  }, [navigation]);

  function system(jsonList: any) {
    if (list.accept === "true") {
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
            <Text style={{ padding: 5, fontSize: 20, textAlign: "left" }}>{`Your INVOICE IS GIVEN AS  :\n
        Your loadingslip number is : ${id} \n
        Company or personnel is : ${list.company}
        Date:${currentDate}\n
        Item is : ${list.items}\n
        Pickup location is : ${list.pickUp}\n
        DropOff location is :${list.dropOff}\n
        Driver phone is  :${list.driverphone}\n
        Quantity is : ${list.quantity} ${list.unit}\n
        Vehicle is : ${list.wheelers} wheelers\n
        The cost is : ${list.price}`}</Text>
            <Button title="keep screen shot" onPress={() => { navigation.navigate("Homepage"); }} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "red", justifyContent: "center", alignContent: "center", alignItems: "center", padding: 10 }}>
          <Text>No deals or transaction found</Text>
          <Button title="GO back" onPress={() => { navigation.goBack(); }} />
        </View>
      );
    }
  }

  return <View>{system(list)}</View>;
};

export default Invoice;
