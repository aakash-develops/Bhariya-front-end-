import React, { useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Button, View, Text } from 'react-native';

const LocationSelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formattedAddress, setFormattedAddress] = useState('');

  const handleMessage = (event: WebViewMessageEvent) => {
    const parsedData = JSON.parse(event.nativeEvent.data);
    console.log('Received Location Data:', parsedData);

    if (parsedData && parsedData.formatted_address) {
      const { formatted_address } = parsedData;
      setFormattedAddress(formatted_address);
      // Log the selected place data to the console
      console.log('Selected Address:', formatted_address);
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Place Autocomplete</title>
        <style>
          .search-container {
            font-size: 50px; /* Increase font size of the search container */
          }

          .search-container input {
            font-size: 50px; /* Increase font size of the input field */
            width: 50%; /* Increase the width of the input field */
          }

          .pac-container {
            font-size: 600%q !important; /* Adjust the font size of the dropdown text */
            max-height: 400px !important; /* Increase the max height of the dropdown */
            overflow-y: scroll; /* Enable vertical scrolling for large lists */
          }
        </style>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkd5GSIXoztiBAHCb7-BabHlI9vgqHa_s&libraries=places"></script>
      </head>
      <body>
        <div class="search-container">
          <label for="autocomplete-input">Search for a place:</label>
          <input type="text" id="autocomplete-input" placeholder="Enter a location">
        </div>

        <script>
          var autocomplete = new google.maps.places.Autocomplete(
              document.getElementById('autocomplete-input'),
              { types: ['geocode'] }
          );

          autocomplete.addListener('place_changed', function() {
              var place = autocomplete.getPlace();
              if (!place.geometry) {
                  window.alert("No details available for the input");
                  return;
              }

              // Post selected place data to React Native WebView
              window.ReactNativeWebView.postMessage(JSON.stringify(place));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
      />
      <Button title=" Address" onPress={() => console.log('Selected Address:', formattedAddress)} />
    </View>
  );
};

export default LocationSelectionScreen;
