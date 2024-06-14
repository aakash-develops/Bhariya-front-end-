import React from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ navigation }: any) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
      })}
      onSubmit={async (values) => {
        try {
          const response = await axios.post('http:192.168.1.74:8000/users/login', values);
          console.log(response.data);
          const token = response.data.token;
          const role = response.data.user.roles;
          const phone = response.data.user.phoneNumber;
          console.log(phone);
          if (role === 'Driver') {
            navigation.navigate('Dashboard1', { paramKey: phone });
          } else {
            navigation.navigate('Dashboard2', { paramKey: phone });
          }
        } catch (error: any) {
          console.log('Error', error.message);
          Alert.alert(JSON.stringify(error.response?.data?.message));
        }
      }}
      
  
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
        <ScrollView style={{ backgroundColor: '#fdd017' }}>
          <ImageBackground source={require('../assets/dummyImage.jpeg')} style={{ height: Dimensions.get('window').height / 2.5 }}></ImageBackground>
          <View style={{ flex: 1.5, backgroundColor: '#fdd017', bottom: 100, borderTopStartRadius: 60, borderTopEndRadius: 60 }}>
            <View style={{ padding: 50 }}>
              
              <Text style={{ color: '#3559E0', fontSize: 30, padding: 10 }}>Welcome !!!</Text>
              <View style={{ flexDirection: 'row',
    alignItems: 'center'}}>
              <Text style={{ color: '#3559E0', fontSize: 15, padding: 10 }}>Dont have an account?</Text>
              
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                  <Text style={{fontSize:20, color:"red" }}>Register Now</Text>
                </TouchableOpacity>
                </View>
              <View style={{ marginTop: '10%' }}>
                <TextInput
                  style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
                
                  placeholder="Login userId or Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                <TextInput
                  style={{ borderWidth: 1, padding: 5, borderRadius: 5, marginTop: 10 }}
                 
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}
                <Button
  title="Submit"
  onPress={(event) => {
    const syntheticEvent: any = {
        currentTarget: null,
        target: null,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        composed: false,
        preventDefault: () => {},
        stopPropagation: () => {},
        nativeEvent: event.nativeEvent,
    };
    
    handleSubmit(syntheticEvent);
  }}
  disabled={!isValid}
/>

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text>Forgot your Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default UserForm;
