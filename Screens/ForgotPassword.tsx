import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, Button, Alert, GestureResponderEvent } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface ForgotPasswordProps {
  navigation: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <Formik
      initialValues={{ to: "" }}
      validationSchema={Yup.object({
        to: Yup.string()
          .email("Invalid email address")
          .required("Email address is required"),
      })}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            "http://192.168.1.74:8000/send",
            values
          );
          console.log(response.data);
          navigation.navigate("VerifyOTP", { paramKey: values });
        } catch (error: any) {
          // Explicitly define the type of error here
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(JSON.stringify(error.response.data.message));
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          Alert.alert("Error", errorMessage);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <ScrollView style={{ backgroundColor: "#fdd017" }}>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: 35,
            }}
          >
            <Text
              style={{
                textDecorationStyle: "double",
                padding: 20,
                fontWeight: "900",
                fontSize: 20,
              }}
            >
              Please input the valid email for password reset
            </Text>
            <TextInput
              style={{
                borderWidth: 1.5,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: 5,
                borderRadius: 20,
                backgroundColor: "#EF4136",
                height: 40,
                width: 250,
              }}
              accessibilityLabel="to" // Label to associate with the input
              placeholder="Login userId or Email Address"
              onChangeText={handleChange("to")}
              onBlur={handleBlur("to")}
              value={values.to}
              keyboardType="email-address"
            />

            {errors.to && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.to}</Text>
            )}
            <Text style={{ padding: 20, fontWeight: "bold" }}>
              * note email verification will be sent to your email id
            </Text>
            <Button
  title="Send email"
  onPress={(event: GestureResponderEvent) => handleSubmit()}
/>



          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ForgotPassword;
