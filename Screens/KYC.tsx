import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Alert, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import * as Yup from 'yup';
interface KycProps {}

const Kyc: React.FC<KycProps> = ({navigation}:any) => {
  const [vehicleType, setVehicleType] = useState<string | null>(null)
  const [route, setRoute] = useState<string | null>(null)
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
      const uploadResponse = await axios.post('http://192.168.1.169:8000/upload', formData, {
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
      validationSchema={Yup.object({
        vehicleNumber: Yup.string().required("required"),
        // licenseImage: Yup.string().required("required"),
        // bluebookImage:Yup.string().required("required"),
        // vehicleType:Yup.string().required("required"),
        phoneNumber:Yup.string().required("required"),
        // route:Yup.string().required("required"),
      })}
      onSubmit={async (values) => {
        console.log(values)
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
      {({ handleChange, handleBlur, handleSubmit, values,errors,
        isValid }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView>
          <ImageBackground
            source={require("../assets/background.jpeg")}
            style={{ height: Dimensions.get("window").height }}
          >
            <View style={styles.form}>
            <RNPickerSelect
      style={{ 
        inputIOS: {
          backgroundColor: '#f2f2f2',
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        },
        inputAndroid: {
          backgroundColor: '#f2f2f2',
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        },
      }}
      placeholder={{ label: 'Choose Vehicle', value: null }}
      value={vehicleType}
      onValueChange={(value) => setVehicleType(value)}
      items={[
        { label: '4 wheeler', value: '4 wheeler' },
        { label: '6 wheeler', value: '6 wheeler' },
        { label: '8 wheeler', value: '8 wheeler' },
        { label: '10 wheeler', value: '10 wheeler' },
        { label: '12 wheeler', value: '12 wheeler' },
        { label: '14 wheeler', value: '14 wheeler' },
        { label: '18 wheeler', value: '18 wheeler' },
        { label: '22 wheeler', value: '22 wheeler' },
      ]}
    />
    {errors.vehicleType && <Text style={{ fontSize: 10, color: 'blue' }}>{errors.vehicleType}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Vehicle Number"
                onChangeText={handleChange('vehicleNumber')}
                onBlur={handleBlur('vehicleNumber')}
                value={values.vehicleNumber}
              />
               {errors.vehicleNumber && <Text style={{ fontSize: 10, color: 'blue' }}>{errors.vehicleNumber}</Text>}
               <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
               {errors.phoneNumber && <Text style={{ fontSize: 10, color: 'blue' }}>{errors.phoneNumber}</Text>}
               <RNPickerSelect
      style={{ 
        inputIOS: {
          backgroundColor: '#f2f2f2',
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        },
        inputAndroid: {
          backgroundColor: '#f2f2f2',
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        },
      }}
      placeholder={{ label: 'Route', value: null }}
      value={route}
      onValueChange={(value) => setRoute(value)}
      items={[
        { label: 'Local', value: 'Local' },
        { label: 'Express', value: 'Express' },
        
      ]}
    />
    {errors.route && <Text style={{ fontSize: 10, color: 'blue' }}>{errors.route}</Text>}

              <Button title="Pick a license image" onPress={() => pickImage(setLicenseImage)} />
              {licenseImage && <Image source={{ uri: licenseImage }} style={styles.image} />}
              <Button title="Pick a bluebook image" onPress={() => pickImage(setBluebookImage)} />
              {bluebookImage && <Image source={{ uri: bluebookImage }} style={styles.image} />}
              
             

             
             
             <Button
  title="Submit"
  color={"#5bc0de"}
  disabled={!isValid}
  onPress={() => navigation.navigate("Homepage")}
  
/>
            </View>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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