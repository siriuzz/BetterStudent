import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import COLORS from '../conts/colors';

const OptionSection = (props) => {
    return(
        <View style={styles.section}>
            <Image
                style={styles.icon}
                source= '../../assets/icon-star.png'
            />
            <View>
                
            </View>
            <Text>
                Probando
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    section: {
        width: '100%',
        paddingHorizontal: '40%',
        borderRadius: 9,
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 16,
    },
    icon: {
        
    }
})

export default OptionSection;