import React from "react";
import { View, useWindowDimensions, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../constants/colors";

const Loader = ({ visible = true }) => {
    const { height, width } = useWindowDimensions();
    return (
        visible && (<View style={[style.container, { height: height + 35, width }]}>
            <View style={style.loader}>
                <ActivityIndicator size="large" color={COLORS.blue} />
                <Text style={{ margin: 10, fontSize: 17 }}>Loading...</Text>
            </View>
        </View>
        )
    );
};

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
    },
});

export default Loader;