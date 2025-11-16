import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AboutUs from "./Screens/AboutUs";
import Services from "./Screens/Services";
import Accept from "./Screens/Accept";
import Billgen from "./Screens/Billgen";
import Client from "./Screens/Client";
import Company from "./Screens/Company";
import Driver from "./Screens/Driver";
import ForgotPassword from "./Screens/ForgotPassword";
import ForgotPasswordOtpVerify from "./Screens/ForgotPasswordOtpVerify";
import HomePage from "./Screens/Homepage";
import HomePage1 from "./Screens/Homepage1";
import Kyc from "./Screens/KYC";
import OngoingDeals from "./Screens/OngoinDeals";

import Registration from "./Screens/Registration";
import UpdateFreight from "./Screens/UpdateFreight";
import UserForm from "./Screens/Userform";

import Welcome from "./Screens/Welcome";
import Payment from "./Screens/Payment";
import KhaltiExample from "./Screens/khalti";
import MyKhalti from "./Screens/khalti";
import MyWallet from "./Screens/Mywallet";
import MyWebView from "./Screens/Client";
import LocationSelectionScreen from "./Screens/Location.send.screen";
import ClientScreen from "./Screens/Client";
import CustomGooglePlacesAutocomplete from "./Screens/Google.autoplace";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      {/* <Stack.Screen name="Userform" component={UserForm} /> */}
      {/* <Stack.Screen name="Registration" component={Registration} /> */}
      {/* <Stack.Screen name="AboutUs" component={AboutUs} /> */}
      {/* <Stack.Screen name="payment" component={Payment} /> */}

      {/* <Stack.Screen name="Services" component={Services} /> */}
      {/* <Stack.Screen name="Accept" component={Accept} /> */}
      {/* <Stack.Screen name="Billgen" component={Billgen} /> */}
      {/* <Stack.Screen name="Client" component={ClientScreen} /> */}

      {/* <Stack.Screen name="SendLocation" component={LocationSelectionScreen} /> */}
      {/* <Stack.Screen name="Company" component={Company} /> */}
      {/* <Stack.Screen name="DriverPage" component={Driver} /> */}
      {/* <Stack.Screen name="payment page" component={Payment} /> */}
      {/* <Stack.Screen name="khaltiPay" component={MyKhalti} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
      <Stack.Screen
        name="ForgotPasswordOtpVerify"
        component={ForgotPasswordOtpVerify}
      />
      {/* <Stack.Screen name="Homepage" component={HomePage} /> */}
      {/* <Stack.Screen name="Homepage1" component={HomePage1} /> */}
      {/* <Stack.Screen name="KYC" component={Kyc} /> */}
      {/* <Stack.Screen name="OngoinDeals" component={OngoingDeals} /> */}

      {/* <Stack.Screen name="UpdateFreight" component={UpdateFreight} /> */}
      {/* <Stack.Screen name="wallet" component={MyWallet} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
