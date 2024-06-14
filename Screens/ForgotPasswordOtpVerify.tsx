import React from "react";
import { TextInput, Text, View, ScrollView, Button, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

interface ForgotPasswordOtpVerifyProps {
  navigation: any;
  route: any;
}

const ForgotPasswordOtpVerify: React.FC<ForgotPasswordOtpVerifyProps> = ({ navigation, route }) => {
  const email1: string = "bhariyatransport@gmail.com";

  return (
    <Formik
      initialValues={{ Otp: "", email: email1 }}
      validationSchema={Yup.object({
        Otp: Yup.string().matches(/^[0-9]{4}$/, "Must be exactly 4 digits"),
      })}
      onSubmit={async (values) => {
        console.log(values);
        // Add your logic for OTP verification here
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              justifyContent: "space-around",
              alignContent: "space-around",
              alignItems: "center",
              flex: 1,
              backgroundColor: "#fdd017",
              padding: 15,
            }}
          >
            <Text
              style={{
                textDecorationStyle: "double",
                padding: 5,
                fontWeight: "900",
                fontSize: 20,
              }}
            >
              Please Enter Your OTP
            </Text>
            <TextInput
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                borderRadius: 15,
                backgroundColor: "#94e9de",
                height: 50,
                width: 200,
                fontSize: 20,
              }}
              placeholder="OTP code"
              keyboardType="numeric"
              onChangeText={(text: string) => handleChange("Otp")(text)}
              onBlur={() => handleBlur("Otp")}
              value={values.Otp}
            />
            {errors.Otp && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.Otp}</Text>
            )}
            <Button
  title="Verify"
  onPress={() => handleSubmit()}
  color="#5bc0de"
  disabled={!isValid}
/>

          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ForgotPasswordOtpVerify;
