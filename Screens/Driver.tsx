import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, Dimensions, FlatList } from "react-native";
import axios from "axios";
import { ListItem } from "@rneui/themed"; // Importing ListItem from react-native-elements
import * as Location from "expo-location";

interface Request {
  latitude1: number;
  longitude1: number;
  pickUp: string;
  dropOff: string;
  items: string;
  price: number;
  quantity: number;
  unit: string;
  wheelers: string;
  phoneNumber: string;
  update: boolean;
}

const DriverRequest: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [requestList, setRequestList] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [driverLocation, setDriverLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setDriverLocation({ latitude, longitude });
      handleSubmit({ latitude, longitude });
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };

  const handleSubmit = async (driverCoords: { latitude: number; longitude: number }) => {
    try {
      const response = await axios.get<Request[]>("http:/192.168.0.144:8000/ClientDetails");
      const requests = response.data;
      setRequestList(requests);
      calculateDistances(driverCoords, requests);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const calculateDistances = (driverCoords: { latitude: number; longitude: number }, requests: Request[]) => {
    const filtered = requests.filter(request => {
      const distance = haversineDistance(driverCoords.latitude, driverCoords.longitude, request.latitude1, request.longitude1);
      return distance <= 25;
    });
    if (filtered.length === 0) {
      setError(true);
    } else {
      setError(false);
      setFilteredRequests(filtered);
    }
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Haversine formula implementation for distance calculation
    // Add your haversine distance calculation code here
    return 0; // Return distance in kilometers
  };

  const renderRequestItem = ({ item }: { item: Request }) => (
    <ScrollView>
      <ListItem>
        <ListItem.Content>
          <View
            style={{
              backgroundColor: "lightblue",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "flex-start",
              padding: 10,
              width: Dimensions.get("screen").width * 0.83,
            }}
          >
            <ListItem.Title>
              <Text style={{ textDecorationStyle: "double" }}>{/* Adjust as necessary */}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              {`A customer request for the following:
               \nPick Up location: ${item.pickUp} 
               \nDrop off location: ${item.dropOff} 
               \nItem: ${item.items}
               \nCustomer suggested price: ${item.price}
               \nWeight: ${item.quantity} ${item.unit}
               \nOn vehicle: ${item.wheelers} `}
            </ListItem.Subtitle>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Button
                title="Update Freight"
                onPress={() => {
                  navigation.navigate("UpdateFreight", {
                    paramKey: item.phoneNumber,
                  });
                }}
                disabled={!!item.update}
              />
              <Button title="Accept Deal" disabled={!!item.update} />
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );

  return (
    <View style={{ padding: 10, backgroundColor: "#94e9de", justifyContent: "center", flex: 1 }}>
      {error ? (
        <View style={{ alignItems: "center" }}>
          <Text>No requests available in your area.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRequestItem}
        />
      )}
      <View style={{ padding: 10, alignItems: "center" }}>
        <Button title="Request Available" onPress={getCurrentLocation} />
      </View>
    </View>
  );
};

export default DriverRequest;
