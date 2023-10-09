import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import COLORS from '../conts/colors';

const LeaderBoardPerson = ({position, image, name, major, points }) => {
    let colorNumber = {
        color: {
            color: COLORS.lightBlue, // Valor predeterminado si no se cumple ninguna condición
        }
    };

    if ( position === 1) {
        colorNumber = {
            color: {
                color: COLORS.darkYellow,
            }
        }
    } else if ( position === 2) {
        colorNumber = {
            color: {
                color: COLORS.black,
            }
        }
    } else if ( position === 3) {
        colorNumber = {
            color: {
                color: COLORS.navyBlue,
            }
        }
    }

  return (
    <View style={styles.fill}>
        <View style={styles.numPosPerson}>
            <Text style={[ colorNumber.color, {fontSize: 16, fontWeight: 'bold'}]}>#{position}</Text>
        
            <Image
                style={styles.img}
                source={image} 
            />
            <View style={styles.txt}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.darkBlue}}>{name}</Text>
                <Text style={{fontSize: 12, fontWeight: 'regular', color: COLORS.yellow}}>{major}</Text>
            </View>
        </View>
        <View style={{width: '20%', justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 12, fontWeight: 'regular', color: COLORS.yellow}}>{points} puntos</Text>  
        </View>
        
    </View>
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
  fill: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    elevation: 5,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  position: {


  },
  numPosPerson: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  img: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
    borderRadius: 28,
    backgroundColor: COLORS.black,

  },
  txt: {
    width: '60%',
  }

});

export default LeaderBoardPerson;