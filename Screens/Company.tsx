import axios from "axios";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import * as Yup from "yup";

interface CompanyProps {
  navigation: any;
  route: any;
}

const Company: React.FC<CompanyProps> = ({
  navigation,
  route,
}: CompanyProps) => {
  // const phone = route.params.paramKey;

  const phone = 9876543213;

  return (
    <Formik
      initialValues={{
        company: "",
      }}
      validationSchema={Yup.object({
        company: Yup.string().required("Company name is required"),
      })}
      onSubmit={async (values) => {
        try {
          axios
            .put("http://192.168.1.169:8000/ClientCompany/" + phone, values)
            .then((response: any) => {
              console.log(response);
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
            Alert.alert(JSON.stringify(error.response.data.message));
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            source={require("../assets/background.jpeg")}
            style={{ height: Dimensions.get("window").height }}
          >
            <View
              style={{
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: "#fdd017",
                    fontSize: 22,
                    padding: 10,
                    fontWeight: "bold",
                  }}
                >
                  Enter your company name!
                </Text>
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      borderRadius: 15,
                      backgroundColor: "#94e9de",
                    }}
                    placeholder="company or personal name"
                    onChangeText={handleChange("company")}
                    onBlur={handleBlur("company")}
                    value={values.company}
                  />

                  <Button
                    title="Submit"
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Company;
