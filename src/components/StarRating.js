import React, { useState } from 'react';
import { View } from 'react-native';
import Star from './Star';

const StarRating = (props) => {
    const [rating, setRating] = useState(0);
  
    const handleStarPress = (starIndex) => {
      // Actualiza el estado de la valoración cuando se toca una estrella
      setRating(starIndex + 1);
    };

    const stars = props.stars;
  
    return (
      <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 15 }}>
        {Array(5)
          .fill()
          .map((_, index) => (
            //Rating es lo que indica cuantas estrellas habran
            <Star
              key={index}
              filled={index < rating}
              onPress={() => handleStarPress(index)}
            />
          ))}
      </View>
    );
  };
  

export default StarRating;
