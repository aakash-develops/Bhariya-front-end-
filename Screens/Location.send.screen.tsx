import React, { useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Button, View, Text } from "react-native";
import { GOOGLE_API_KEY } from "@env";

const apiKey = GOOGLE_API_KEY;

const LocationSelectionScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [formattedAddress, setFormattedAddress] = useState("");

  const handleMessage = (event: WebViewMessageEvent) => {
    const parsedData = JSON.parse(event.nativeEvent.data);
    console.log("Received Location Data:", parsedData);

    if (parsedData && parsedData.formatted_address) {
      const { formatted_address } = parsedData;
      setFormattedAddress(formatted_address);
      console.log("Selected Address:", formatted_address);
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Place Autocomplete</title>
        <style>
          .search-container {
            font-size: 50px;
          }

          .search-container input {
            font-size: 50px;
            width: 50%;
          }

          .pac-container {
            font-size: 600% !important;
            max-height: 400px !important;
            overflow-y: scroll;
          }
        </style>

        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places">
        </script>

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

              window.ReactNativeWebView.postMessage(JSON.stringify(place));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
      />
      <Button
        title=" Address"
        onPress={() => console.log("Selected Address:", formattedAddress)}
      />
    </View>
  );
};

export default LocationSelectionScreen;
