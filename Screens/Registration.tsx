import React from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { RadioButton, Button, Text } from "react-native-paper";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { GestureResponderEvent } from 'react-native';

interface RegistrationProps {
  navigation: any;
}

const Registration: React.FC<RegistrationProps> = ({ navigation }) => {
    
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        userName: "",
        password: "",
        re_password: "",
        gender: "",
        roles: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(3, ({ min }) => `First name must be at least ${min} characters`)
          .required("First name is required"),
        lastName: Yup.string()
          .min(3, ({ min }) => `Last name must be at least ${min} characters`)
          .required("Last name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        address: Yup.string()
          .min(3, ({ min }) => `Address must be at least ${min} characters`)
          .required("Address is required"),
        phoneNumber: Yup.string()
          .min(
            10,
            ({ min }) => `Phone number must be at least ${min} characters`
          )
          .required("Phone number is required"),
        userName: Yup.string()
          .min(8, ({ min }) => `User name must be at least ${min} characters`)
          .required("User name is required"),
        password: Yup.string()
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required("Password is required"),
        re_password: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password must match"
        ),
        gender: Yup.string(),
        roles: Yup.string(),
      })}
      
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            "http:192.168.1.80:8000/users/add",
            values
          );
          if (response.data.roles === "Driver") {
            navigation.navigate("KYC");
          } else {
            navigation.navigate("Company", {
              paramKey: response.data.phoneNumber,
            });
          }
          Alert.alert(JSON.stringify("Registered successfully"));
        } catch (error: any) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            Alert.alert(JSON.stringify(error.response.data.message));
          } else {
            Alert.alert(JSON.stringify("An error occurred."));
          }
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
        <ScrollView style={{ flex: 1, alignContent: "center" }}>
          <ImageBackground
            source={require("../assets/truck.jpg")}
            style={{ height: Dimensions.get("window").height }}
          >
            <View style={{ padding: 10 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    color: "#fdd017",
                    fontSize: 22,
                    padding: 10,
                    fontWeight: "bold",
                  }}
                >
                  PLEASE CREATE YOUR ACCOUNT!!
                </Text>
                <View style={{ marginTop: "5%" }}>
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="First Name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />

                    {errors.firstName && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.firstName}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Last Name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                    {errors.lastName && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.lastName}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Address"
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                    {errors.address && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.address}
                      </Text>
                    )}
                    <RadioButton.Group
                      onValueChange={handleChange("gender")}
                      value={values.gender}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ff0000",
                          }}
                        >
                          {" "}
                          Please select gender
                        </Text>
                        <RadioButton.Item label="Male" value="Male" />
                        <RadioButton.Item label="Female" value="Female" />
                        <RadioButton.Item label="Others" value="Others" />
                      </View>
                    </RadioButton.Group>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Phone Number"
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Email Address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.email}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="User Name"
                      onChangeText={handleChange("userName")}
                      onBlur={handleBlur("userName")}
                      value={values.userName}
                    />
                    {errors.userName && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.userName}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                    {errors.password && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.password}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderWidth: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: 5,
                        borderRadius: 15,
                        backgroundColor: "#94e9de",
                      }}
                      placeholder="Re-Password"
                      onChangeText={handleChange("re_password")}
                      onBlur={handleBlur("re_password")}
                      value={values.re_password}
                      secureTextEntry
                    />
                    {errors.re_password && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.re_password}
                      </Text>
                    )}
                    <RadioButton.Group
                      onValueChange={handleChange("roles")}
                      value={values.roles}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ff0000",
                          }}
                        >
                          {" "}
                          Please select user
                        </Text>
                        <RadioButton.Item label="Driver" value="Driver" />
                        <RadioButton.Item label="Client" value="Client" />
                      </View>
                    </RadioButton.Group>
                    <Button
  style={{ borderRadius: 20, backgroundColor: "#FFB000" }}
  onPress={(event: GestureResponderEvent) => {
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
  labelStyle={{
    fontWeight: 900,
    fontSize: 15,
    color: "black",
  }}
>


                      SUBMIT
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Registration;
