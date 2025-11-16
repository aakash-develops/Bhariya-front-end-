import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import UserForm from "./Userform";

const Welcome: React.FC = ({ navigation }: any) => {
  return (
    <Swiper style={styles.wrapper} showsButtons loop>
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/welcome.jpg")}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Welcome to our App</Text>
      </View>

      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/image2.jpg")}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Enjoy our features</Text>
      </View>

      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/image3.jpg")}
            style={styles.image}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Userform")}>
          <Text style={{ fontSize: 20, color: "red" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    paddingHorizontal: 20,
    gap: 50,
  },

  imageContainer: {
    width: "80%",
    aspectRatio: 1.2,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default Welcome;
