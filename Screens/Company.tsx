import React from 'react';
import { Alert, Dimensions, ImageBackground, TextInput, View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GestureResponderEvent } from 'react-native';

interface CompanyProps {
  navigation: any;
  route: any;
}

const Company: React.FC<CompanyProps> = ({ navigation, route }: CompanyProps) => {
  const phone = route.params.paramKey;

  return (
    <Formik
      initialValues={{
        Company: '',
      }}
      validationSchema={Yup.object({
        Company: Yup.string().required('Company name is required'),
      })}
      onSubmit={async (values) => {
        try {
          await axios.put(`http://192.168.1.80:8000/ClientCompany/` + phone, { company: values.Company });
          // Uncomment this if navigation is needed after submission
          // navigation.navigate("ClientRequest", {
          //   paramKey: values,
          //   phone,
          // });
        } catch (error: any) {
          console.error("Error:", (error as Error).message);
          Alert.alert("An error occurred while submitting the company name.");
        }
      }}
      
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={require('../assets/background.jpeg')} style={{ height: Dimensions.get('window').height }}>
            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: '#fdd017', fontSize: 22, padding: 10, fontWeight: 'bold' }}>
                  Enter your company name!
                </Text>
                <View>
                  <TextInput
                    style={{ borderWidth: 1, padding: 5, borderRadius: 15, backgroundColor: '#94e9de' }}
                    placeholder='Company'
                    onChangeText={handleChange('Company')}
                    onBlur={handleBlur('Company')}
                    value={values.Company}
                  />
                  
                  <Button
                    mode="contained"
                    style={{ borderRadius: 20, backgroundColor: '#FFB000', marginTop: 10 }}
                    onPress={(e: GestureResponderEvent) => handleSubmit()}
                    disabled={!isValid}
                  >
                    SUBMIT
                  </Button>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Company;
