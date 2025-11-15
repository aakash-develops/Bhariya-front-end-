import { GOOGLE_API_KEY } from "@env";
import axios from "axios";
import * as Location from "expo-location";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RNPickerSelect from "react-native-picker-select";

const Client: React.FC = ({ navigation, route }: any) => {
  const [Item, setItem] = useState<string | null>(null);
  const [Unit, setUnit] = useState<string | null>(null);
  const [Trip, setTrip] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [phoneNum, setPhoneNum] = useState<string>("");
  const { phone } = route.params;
  console.log(phone);
  const [pickUp, setPickup] = useState<string>();
  const [dropOff, setDropOff] = useState<string>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
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
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Formik
      initialValues={{
        pickUp: pickUp || "",
        dropOff: dropOff || "",
        items: "",
        quantity: "",
        unit: Unit || "",
        price: "",
        wheelers: vehicleType || "",
        update: false,
        phoneNumber: "",
        trip: Trip || "",
        accept: "",
        driverphone: "",
        latitude: latitude !== undefined ? latitude : 0,
        longitude: longitude !== undefined ? longitude : 0,
        company: "",
      }}
      // validationSchema={Yup.object({
      //   items: Yup.string().required("It can't be empty"),
      //   quantity: Yup.string().required("Quantity is required"),
      //   unit: Yup.string().required("Unit is required"),
      //   wheelers: Yup.string().required("Vehicle is required"),
      //   price: Yup.number().min(500, "It should be more than 500"),
      // })}
      onSubmit={async (values) => {
        try {
          await axios
            .post("http:192.168.0.144:8000/ClientRequest", values)
            .then((response) => {
              () => console.log(response);
              navigation.pop(1);
            })
            .then(() => {
              Alert.alert(JSON.stringify("registered successfully"));
            });
        } catch (error: any) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // error.request is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config),
            Alert.alert(JSON.stringify(error.response?.data?.message));
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
      }) => (
        <SafeAreaView>
          <ImageBackground
            source={require("../assets/background.jpeg")}
            style={{ padding: 20, height: Dimensions.get("window").height }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                // Adjust the distance between views
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, padding: 5 }}>
                Please select the request
              </Text>

              <GooglePlacesAutocomplete
                placeholder={"pickup location"}
                fetchDetails={true}
                onPress={(data) => {
                  console.log(data.description);
                  setPickup(data.description);
                  setPhoneNum(phone);
                  {
                    values.pickUp = data.description;
                  }
                }}
                query={{
                  key: `${GOOGLE_API_KEY}`,
                  language: "en",
                }}
                styles={{
                  container: {
                    flex: 1,
                  },
                  textInputContainer: {
                    flexDirection: "row",
                    width: 320,
                    zIndex: 10,
                  },
                  textInput: {
                    backgroundColor: "#94e9de",
                    height: 44,
                    borderRadius: 5,
                    fontSize: 15,
                    flex: 1,
                    zIndex: 1,
                  },
                  listView: {
                    position: "absolute", // Position the suggestion list independently
                    zIndex: 999, // Set a high z-index to ensure it appears above other elements
                    top: 50, // Adjust the top position as needed
                    left: 0,
                    right: 0,
                    backgroundColor: "#ffffff",
                    // Increase the height of the suggestion list box
                  },
                  row: {
                    backgroundColor: "#FFFFFF",
                    padding: 13,
                    height: 60, // Adjust the height of each suggestion row
                    flexDirection: "row",
                  },
                  separator: {
                    height: 0.5,
                    backgroundColor: "#c8c7cc",
                  },
                }}
              />

              <GooglePlacesAutocomplete
                placeholder={"drop off location"}
                fetchDetails={true}
                onPress={(data) => {
                  console.log(data.description);
                  setDropOff(data.description);
                  {
                    values.dropOff = data.description;
                  }
                }}
                query={{
                  key: `${GOOGLE_API_KEY}`,
                  language: "en",
                }}
                styles={{
                  container: {
                    flex: 1,
                  },
                  textInputContainer: {
                    flexDirection: "row",
                    width: 320,
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

                  listView: {
                    position: "absolute", // Position the suggestion list independently
                    zIndex: 999, // Set a high z-index to ensure it appears above other elements
                    top: 50, // Adjust the top position as needed
                    left: 0,
                    right: 0,
                    backgroundColor: "#ffffff",
                  },
                  row: {
                    backgroundColor: "#FFFFFF",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                  },
                  separator: {
                    height: 0.5,
                    backgroundColor: "#c8c7cc",
                  },

                  loader: {
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    height: 20,
                  },
                }}
              />

              <View style={{ flex: 10, gap: 10 }}>
                <Text style={{ display: "none" }}>
                  {(values.latitude = latitude)}
                </Text>
                <Text style={{ display: "none" }}>
                  {(values.longitude = longitude)}
                </Text>

                <Text style={{ display: "none" }}>
                  {(values.phoneNumber = phoneNum)}
                </Text>

                <RNPickerSelect
                  style={{
                    inputAndroid: {
                      alignSelf: "center",
                      backgroundColor: "#94e9de",

                      width: 320,
                    },
                  }}
                  placeholder={{ label: "Choose Item", color: "0,0,0,0.6" }}
                  value={values.items}
                  onValueChange={(value) => handleChange("items")(value)}
                  items={[
                    { label: "Cement", value: "Cement" },
                    { label: "Tmt/Chhad", value: "Tmt/Chhad" },
                    {
                      label: "Metal Pipe / Sheet",
                      value: "Metal Pipe / Sheet",
                    },
                    { label: "Jasta Pata", value: "Jasta Pata" },
                    {
                      label: "Angle patti/Grill patti",
                      value: "Angle patti/Grill patti",
                    },
                    {
                      label: "Khaddhanna(Food Grain) Item",
                      value: "Khaddhanna(Food Grain) Item",
                    },
                    { label: "Vegetable", value: "Vegetable" },
                    { label: "Itta(Brick)", value: "Itta(Brick)" },
                    { label: "Bitumin Drum", value: "Bitumin Drum" },
                    { label: "Plywood", value: "Plywood" },
                    {
                      label: "Sand/Stone/Gravel/Gitti",
                      value: "Sand/Stone/Gravel/Gitti",
                    },
                    { label: "Others", value: "Others" },
                  ]}
                />

                <TextInput
                  style={{
                    backgroundColor: "#94e9de",
                    height: 44,
                    textAlign: "center",
                    fontSize: 15,
                  }}
                  placeholder="Quantity"
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  value={values.quantity}
                />

                <RNPickerSelect
                  style={{
                    inputAndroid: {
                      backgroundColor: "#94e9de",
                      padding: 10,
                      marginVertical: 5,
                      borderRadius: 5,
                    },
                  }}
                  placeholder={{ label: "Unit" }}
                  value={values.unit}
                  onValueChange={(value) => handleChange("unit")(value)}
                  items={[
                    { label: "Kg", value: "Kg" },
                    { label: "Quintal", value: "Quintal" },
                    { label: "Ton", value: "Ton" },
                    { label: "Bags", value: "Bags" },
                    { label: "Unknown", value: "Unknown" },
                  ]}
                />
                <TextInput
                  style={{
                    backgroundColor: "#94e9de",
                    height: 44,
                    textAlign: "center",
                    fontSize: 15,
                  }}
                  placeholder="Company or your name"
                  onChangeText={handleChange("company")}
                  onBlur={handleBlur("company")}
                  value={values.company}
                />

                <TextInput
                  style={{
                    backgroundColor: "#94e9de",
                    height: 44,
                    textAlign: "center",
                    fontSize: 15,
                  }}
                  placeholder="Freight"
                  keyboardType="numeric"
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  value={values.price}
                />
                <RNPickerSelect
                  style={{
                    inputAndroid: {
                      backgroundColor: "#94e9de",
                      padding: 10,
                      marginVertical: 5,
                      borderRadius: 5,
                    },
                  }}
                  placeholder={{ label: "Choose Vehicle" }}
                  value={values.wheelers}
                  onValueChange={(value) => handleChange("wheelers")(value)}
                  items={[
                    { label: "4 wheeler", value: "4 wheeler" },
                    { label: "6 wheeler", value: "6 wheeler" },
                    { label: "8 wheeler", value: "8 wheeler" },
                    { label: "10 wheeler", value: "10 wheeler" },
                    { label: "12 wheeler", value: "12 wheeler" },
                    { label: "14 wheeler", value: "14 wheeler" },
                    { label: "18 wheeler", value: "18 wheeler" },
                    { label: "22 wheeler", value: "22 wheeler" },
                  ]}
                />

                <RNPickerSelect
                  style={{
                    inputAndroid: {
                      backgroundColor: "#94e9de",
                      padding: 10,
                      marginVertical: 5,
                      borderRadius: 5,
                    },
                  }}
                  placeholder={{ label: "Delivery" }}
                  value={values.trip}
                  onValueChange={(value) => handleChange("trip")(value)}
                  items={[
                    { label: "Local", value: "local" },
                    { label: "Express", value: "full" },
                  ]}
                />

                <Button
                  color={"#5bc0de"}
                  title="Submit"
                  onPress={(event) => {
                    const syntheticEvent: any = {
                      currentTarget: null,
                      target: null,
                      bubbles: false,
                      cancelable: false,
                      defaultPrevented: false,
                      composed: false,
                      preventDefault: () => {},
                      stopPropagation: () => {},
                      nativeEvent: event.nativeEvent,
                    };

                    handleSubmit(syntheticEvent);
                  }}
                  disabled={!isValid}
                />
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Client;
