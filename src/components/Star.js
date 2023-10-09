import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import iconStar from '../../assets/icon-star.png'

const Star = ({ filled, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View  />
        <Image 
        style={[styles.star, filled && styles.filledStar]}
        source={iconStar}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 16,
    height: 16,
    opacity: 0.2,
    borderWidth: 1,
    margin: 2,
  },
  filledStar: {
    opacity: 1,
  },
});

export default Star;