import React, { useState } from "react";
import { View, Text } from "react-native";
import Rating from '../Screens/Rating';

const InvoiceView = () => {
  const unit = "ton";
  const invoiceData = {
    invoiceNumber: "12345",
    invoiceDate: "01/01/2022",
    clientName: "hari",
    pickUpLocation: "kathmandu",
    dropOffLocation: "bhaktpur",
    item: "cement",
    quantity: "10 " + unit,
    price: "5000",
    clientNumber: "9898989898",
    vehicleNumber: "123 Main St, Anytown USA 12345",
  };

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: 30 }}>Invoice</Text>
      </View>
      <View style={{ alignItems: "flex-start", margin: 20 }}>
        <Text>Invoice Number: {invoiceData.invoiceNumber}</Text>
        <Text>Invoice Date: {invoiceData.invoiceDate}</Text>
      </View>

      <View style={{ margin: 20, padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Customer Information</Text>
        <Text>Name: {invoiceData.clientName}</Text>
        <Text>Pick Up Location: {invoiceData.pickUpLocation}</Text>
        <Text>Drop Off Location: {invoiceData.dropOffLocation}</Text>
        <Text>Item Name: {invoiceData.item}</Text>
        <Text>Quantity: {invoiceData.quantity}</Text>
        <Text>Price: {invoiceData.price}</Text>
        <Text>Client Number: {invoiceData.clientNumber}</Text>
        <Text>Vehicle Number: {invoiceData.vehicleNumber}</Text>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Rating:</Text>
        <Rating initialRating={rating} onRatingChange={handleRatingChange} />
        <Text>{rating}</Text>
      </View>
    </View>
  );
};

export default InvoiceView;
