import React from 'react';
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, Text, View, Image } from 'react-native';

interface ServiceCardProps {
    image: number;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => {
    return (
        <View style={{ flex: 1, borderWidth: 1, borderColor: "#EF4136", margin: 5, borderRadius: 10, overflow: 'hidden' }}>
            <Image source={image} resizeMode='cover' style={{ width: '100%', height: 150 }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
                <Text>{description}</Text>
            </View>
        </View>
    );
}

const Services = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={require("../assets/background.jpeg")} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, padding: 10 }}>
                    <Text style={{ color: "#fdd017", fontWeight: 'bold', fontSize: 42, padding: 5, textAlign: 'center' }}>Our Services</Text>
                    <Text style={{ fontSize: 16, marginVertical: 10, textAlign: 'center' }}>
                        Welcome to Bhariya, where customer satisfaction is our priority. We provide various transportation services tailored to your needs.
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <ServiceCard
                            image={require("../assets/image1.jpg")}
                            title="Local Delivery"
                            description="We offer fast and reliable local delivery services."
                        />
                        <ServiceCard
                            image={require("../assets/image2.jpg")}
                            title="Long Route Transportation"
                            description="Transport goods over long distances with our efficient services."
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ServiceCard
                            image={require("../assets/image3.jpg")}
                            title="Local Goods Transport"
                            description="Efficient local goods transport solutions for your business."
                        />
                        <ServiceCard
                            image={require("../assets/truck.jpg")}
                            title="Transport Inquiry"
                            description="Have a transport inquiry? Contact us for a quote."
                        />
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Services;
