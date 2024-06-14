import React from 'react';
import axios from 'axios';
import { Alert, Button } from 'react-native'; // Assuming you want to trigger the API call on a button press

const Accept: React.FC = () => {
  const phone = 9845071110;
  let token = 5000;

  const handleClientAccept = () => {
    if (token >= 500) {
      axios.put(`http://192.168.0.104:8000/ClientAccept/${phone}`).then((response) => {
        console.log(response.data);
        token -= 500; // Update token after the successful request
        Alert.alert('Deal Accepted successfully');
      }).catch((error) => {
        console.error('Error accepting deal:', error);
        Alert.alert('Failed to accept deal. Please try again.');
      });
    } else {
      Alert.alert('Insufficient token balance to accept the deal.');
    }
  };

  return (
    <Button title="Accept Deal" onPress={handleClientAccept} />
  );
};

export default Accept;
