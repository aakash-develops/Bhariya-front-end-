import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import * as Location from "expo-location";
import RNPickerSelect from "react-native-picker-select";

interface ClientProps {
  navigation: any;
  route: any;
}

const Client: React.FC<ClientProps> = ({ navigation, route }: ClientProps) => {
  const phone: string = "98022222222";
  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const [myLocation, setMyLocation] = useState(initialLocation);
  const [newLock, setNewLock] = useState(initialLocation);
  const [pin, setPin] = useState({});
  const local = {
    latitude: "37.78825",
    longitude: "-122.4324",
  };

  useEffect(() => {
    setPin(local);
    _getLocation();
  }, []);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
      setNewLock(location.coords);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Formik
      initialValues={{
        items: "",
        quantity: "",
        unit: "",
        wheelers: "",
        price: "",
        pickUp: "",
        dropOff: "",
        update: "false",
        trip: "",
        phoneNumber: "",
        accept: "",
        latitude1: "",
        longitude1: "",
      }}
      validationSchema={Yup.object({
        items: Yup.string().required("It can't be empty"),
        quantity: Yup.string().required("Quantity is required"),
        unit: Yup.string().required("Unit is required"),
        wheelers: Yup.string().required("Vehicle is required"),
        price: Yup.number().min(500, "It should be more than 500"),
      })}
      onSubmit={async (values) => {
        try {
          await axios.post("http://192.168.1.74:8000/ClientRequest", values);
          Alert.alert("Request Sent!!!");
          navigation.navigate("Dashboard2");
        } catch (error: any) {
          console.error("Error:", error.message);
          Alert.alert(JSON.stringify(error.response?.data?.message));
        }
      }}
      
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ImageBackground
              source={require("../assets/background.jpeg")}
              style={{
                padding: 20,
                height: Dimensions.get("window").height,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {/* GooglePlacesAutocomplete for PickUp Location */}
                <GooglePlacesAutocomplete
                  disableScroll={true}
                  placeholder="Pickup location"
                  fetchDetails={true}
                  onPress={(data) => {
                    values.pickUp = data.description;
                  }}
                  query={{
                    key: "YOUR_API_KEY",
                    language: "en",
                  }}
                  styles={{
                    container: {
                      flex: 1,
                    },
                    textInputContainer: {
                      flexDirection: "row",
                      width: 300,
                    },
                    textInput: {
                      backgroundColor: "#94e9de",
                      height: 44,
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      fontSize: 15,
                      flex: 1,
                    },
                   
                  }}
                />

                {/* GooglePlacesAutocomplete for DropOff Location */}
                <GooglePlacesAutocomplete
                  disableScroll={true}
                  placeholder="DropOff location"
                  fetchDetails={true}
                  onPress={(data) => {
                    values.dropOff = data.description;
                  }}
                  query={{
                    key: "YOUR_API_KEY",
                    language: "en",
                  }}
                  styles={{
                    container: { flex: 1 },
                    textInputContainer: {
                      width: 300,
                      marginTop: -150,
                    },
                    textInput: {
                      backgroundColor: "#94e9de",
                      height: 40,
                      borderRadius: 20,
                    },
                   
                  }}
                />

                

              </View>
            </ImageBackground>
          </SafeAreaView>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Client;
