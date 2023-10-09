import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../constants/colors";

const Button = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.blue,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
            }}>
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>  {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button; 