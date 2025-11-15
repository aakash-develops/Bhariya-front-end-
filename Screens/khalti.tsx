import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';


const MyKhalti = ({ route, navigation }: any) => {
  const { paramKey } = route.params;
  
  const {secondParamKey}=route.params;
  // console.log(secondParamKey)

  const handleWebViewMessage = (event: any) => {
    const data = event.nativeEvent.data;
    console.log('Received message from WebView:', data);

    if (data.includes('khalti-payment-completed')) {
      console.log('Payment completed:', data);
      // Additional logic for payment completion

      // Redirect to another page after payment completion
      if(data){
      navigation.navigate('Wallet',{paramKey: secondParamKey});}
    } else {
      console.log('Unhandled message:', data);
    }
  };

  useEffect(() => {
    // Additional logic can be added here if needed on component mount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: paramKey }}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

export default MyKhalti;
