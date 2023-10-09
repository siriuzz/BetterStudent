import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import COLORS from "../constants/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    return (
        <View style={{ marginBottom: 1 }}>
            <Text style={style.label}>{label}</Text>
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error
                            ? COLORS.red
                            : isFocused
                                ? COLORS.darkBlue
                                : COLORS.light
                    },
                ]}>
                <Icon
                    name={iconName}
                    style={{ fontSize: 23, color: COLORS.darkBlue, marginRight: 12, marginLeft: 12 }}
                />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => { onFocus(); setIsFocused(true); }}
                    onBlur={() => setIsFocused(false)}
                    style={{ color: COLORS.darkBlue, flex: 1 }}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ fontSize: 22, color: COLORS.darkBlue }}
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        margin={12}
                    />
                )}
            </View>
            <Text style={{ color: COLORS.red, fontSize: 12, }}>{error}</Text>
        </View>);
};

const style = StyleSheet.create({
    label: {
        marginVertical: 1,
        fontSize: 14,
        color: COLORS.grey,
    },
    inputContainer: {
        height: 55,
        borderRadius: 10,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        marginHorizontal: 1,
        borderWidth: 0.8,
        alignItems: 'center',
    },
});

export default Input;