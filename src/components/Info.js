import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Info = (props) => {
    return (
        <View style={styles.userContext}>
            <Text style={styles.paraghap}>
                <Text style={styles.title}>{props.title}: </Text>
                {props.text}
            </Text>
        </View >
    )
}

const styles = StyleSheet.create({
    userContext:{
        width: '100%',
        borderRadius: 9,
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 16,
    },
    paraghap:{
        margin: 10,
        fontWeight: '300',
        fontStyle: 'italic',
        fontSize: 14,
    },
    title:{
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: 14,
    }

})

export default Info;