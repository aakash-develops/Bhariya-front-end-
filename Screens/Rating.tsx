import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RatingProps {
  initialRating: number;
  onRatingChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const renderStar = (index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleRating(index + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.star}>{index < rating ? '★' : '☆'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 30,
    color: '#FFD700',
    marginRight: 5,
  },
});

export default Rating;
