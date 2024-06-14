import React from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

interface HomePageProps {
  navigation: any;
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/background.jpeg")}
          style={{ flex: 1 }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  padding: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  padding: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate("Services")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Services
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  padding: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  padding: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate("AboutUs")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  About Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  padding: 10,
                  borderRadius: 20,
                }}
                onPress={() => navigation.navigate("Wallet")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Wallet
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", padding: 15 }}>
              <Text style={{ fontSize: 35, fontWeight: "bold", color: "#FFB000", fontStyle: "italic" }}>
                Welcome to
              </Text>
              <Text style={{ fontSize: 35, fontWeight: "bold", color: "#FFB000", fontStyle: "italic" }}>
                TEAM BHARIYA
              </Text>
            </View>

            <View style={{ justifyContent: "space-around", alignItems: "center", alignContent: "space-between" }}>
              <Image source={require("../assets/Team.jpg")} style={{ width: 200, height: 200, marginVertical: 10 }} />
              <Text style={{ fontWeight: "bold", fontSize: 30, color: "#FFB000" }}>
                Always at Your Service
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFB000" }}>
                Team Bhariya is providing the best services all around Nepal with fair prices, superior quality, and exceptional customer service are guaranteed when you work with us.
              </Text>
            </View>

            <View style={{ justifyContent: "space-around", alignItems: "center", alignContent: "space-between" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#5bc0de",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("DriverPage")}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                  Available Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default HomePage;
