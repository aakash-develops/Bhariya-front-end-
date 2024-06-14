import React, { useState } from 'react';
import { Button, SafeAreaView } from 'react-native';
import { KhatiSdk } from 'rn-all-nepal-payment'; // Importing KhatiSdk from rn-all-nepal-payment package

type PaymentProps = {};

const Payment: React.FC<PaymentProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _onPaymentComplete = (data: any) => {
    setIsVisible(false);
    const str: string = data.nativeEvent.data;
    const resp: any = JSON.parse(str);
    console.log({ resp });
    if (resp.event === 'CLOSED') {
      console.log(resp.event); // handle closed action
    } else if (resp.event === 'SUCCESS') {
      console.log({ data: resp.data });
    } else if (resp.event === 'ERROR') {
      console.log({ error: resp.data });
    }
    return;
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={'pay with khalti'} onPress={() => setIsVisible(true)} />
      <KhatiSdk
        amount={50000} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'buy token'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'http://localhost:8000'} // Url of product or server where its running
        publicKey={'test_public_key_da7d55ddeb2148cabbc397b3c2133736'} // Test or live public key which identifies the merchant
      />
    </SafeAreaView>
  );
};

export default Payment;
