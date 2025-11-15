import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = (map: any) => {
  
  return (
    <GooglePlacesAutocomplete
      disableScroll={true}
      placeholder="pickUp"
      onPress={(data) => {
        // console.log(data.description);
        map = data.description;
        // value=values.pickup
        // console.log(value)
        const value = map;
      }}
      query={{
        key: 'AIzaSyBVkhlAZwynSaPK0ujH91q5bk3O881OyKA',
        language: 'en',
      }}
      styles={{
        container: {
          flex: 1,
        },
        textInputContainer: {
          flexDirection: 'row',
          gap:5
        },
        textInput: {
          backgroundColor: "#94e9de",
          height: 44,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 1,
        },
        listView: {
          position: 'absolute',
          top: 50,
          left: 5,
          right: 5,
          flex: 1,
          elevation: 3,
          zIndex: 10
        },
        row: {
          backgroundColor: '#FFFFFF',
          padding: 13,
          height: 44,
          flexDirection: 'row',
        },
        separator: {
          height: 0.5,
          backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
        }
      }}
    />
  );
};

export default GooglePlacesInput;
