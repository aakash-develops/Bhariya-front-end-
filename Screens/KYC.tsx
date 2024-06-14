import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Alert, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import axios from 'axios';

interface KycProps {}

const Kyc: React.FC<KycProps> = () => {
  const [licenseImage, setLicenseImage] = useState<string>('');
  const [bluebookImage, setBluebookImage] = useState<string>('');

  const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string>>) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    const response = await fetch(uri);
    const blob = await response.blob();
  
    formData.append('image', blob, 'upload.jpg');
  
    try {
      const uploadResponse = await axios.post('http://192.168.1.74:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again later.');
    }
  };
  
  

  return (
    <Formik
      initialValues={{
        vehicleNumber: '',
        licenseImage: '',
        bluebookImage: '',
        vehicleType: '',
        phoneNumber: '',
        route: '',
      }}
      onSubmit={async (values) => {
        values.licenseImage = licenseImage;
        values.bluebookImage = bluebookImage;

        try {
          await uploadImage(licenseImage);
          await uploadImage(bluebookImage);
          Alert.alert('Submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
          Alert.alert('Error', 'Failed to submit form. Please try again later.');
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Vehicle Number"
                onChangeText={handleChange('vehicleNumber')}
                onBlur={handleBlur('vehicleNumber')}
                value={values.vehicleNumber}
              />
              <Button title="Pick a license image" onPress={() => pickImage(setLicenseImage)} />
              {licenseImage && <Image source={{ uri: licenseImage }} style={styles.image} />}
              <Button title="Pick a bluebook image" onPress={() => pickImage(setBluebookImage)} />
              {bluebookImage && <Image source={{ uri: bluebookImage }} style={styles.image} />}
              <TextInput
                style={styles.input}
                placeholder="Vehicle Type"
                onChangeText={handleChange('vehicleType')}
                onBlur={handleBlur('vehicleType')}
                value={values.vehicleType}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Route"
                onChangeText={handleChange('route')}
                onBlur={handleBlur('route')}
                value={values.route}
              />
             <Button
  title="Submit"
  onPress={() => handleSubmit()}
/>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default Kyc;
