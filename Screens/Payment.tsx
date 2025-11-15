import axios from "axios";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Button,
  ScrollView,
  TextInput,
  View
} from "react-native";
import { Text } from "react-native-paper";
import * as Yup from "yup";



interface RegistrationProps {
  navigation: any;
}

const Payment: React.FC<RegistrationProps> = ({ navigation }) => {
  return (
    <Formik
      initialValues={{
        name: "token",
        price: "",
        category: "pay",
        driverphone: "",
      }}
      validationSchema={Yup.object({
        price: Yup.string(),
        name: Yup.string(),
        category: Yup.string(),
        driverphone: Yup.string(),
      })}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            "http://192.168.1.169:8000/createItems",
            values
          );
          console.log(response.data); // Log the response data to check its structure

          const itemId = response.data._id;
          const totalPrice = response.data.price;

          const response2 = await axios.post(
            "http://192.168.1.169:8000/initialize-khalti",
            { itemId, totalPrice }
          );
         console.log(response2.data.payment.totalprice)
         console.log(response2.data)
          const paymentUrl = response2.data.payment.payment_url;
          console.log(paymentUrl);
          navigation.navigate("khaltiPay", {
            paramKey: paymentUrl,
            secondParamKey: totalPrice,
          });
         
        } catch (error: any) {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }

          console.log(error.config);
          Alert.alert("An error occurred: " + error.message);
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
            alignContent: "center",
            backgroundColor: "#dd141e",
          }}
        >
          <View style={{ padding: 20 }}>
            
            
                <View style={{gap:20,padding:5}}>
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
                    placeholder="price"
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    value={values.price}
                  />

                  {errors.price && (
                    <Text style={{ fontSize: 10, color: "blue" }}>
                      {errors.price}
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
                    placeholder="driverphone"
                    onChangeText={handleChange("driverphone")}
                    onBlur={handleBlur("driverphone")}
                    value={values.driverphone}
                  />

                  {errors.driverphone && (
                    <Text style={{ fontSize: 10, color: "blue" }}>
                      {errors.driverphone}
                    </Text>
                  )}

                  <Button
                    title="Buy token"
                    color={"#5bc0de"}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                  />
                </View>
              </View>
           
          
          {/* </ImageBackground> */}
        </ScrollView>
      )}
    </Formik>
  );
};

export default Payment;
