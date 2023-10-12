import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
import Logo from "../../assets/Logo.png";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendProfile from "../Screens/FriendProfile/FriendProfile";
import { useNavigation } from "@react-navigation/native";
import FollowButton from "./FollowButton";

export default function FriendListItem({ friend_id, image, name, major }) {
    const navigation = useNavigation();

    return (
        <View >
            <TouchableOpacity style={style.container} onPress={() => { navigation.navigate("FriendProfile", { "friend_id": friend_id }) }}>

                <View style={style.imageContainer}>
                    <Image source={Logo} style={style.image} />
                </View>
                <View style={style.infoContainer}>
                    <Text style={style.name}>{name}</Text>
                    <Text style={style.major}>{major}</Text>
                </View>
                {/* <View style={style.ratingContainer}>
                <Text style={style.rating}>{rating}</Text>
            </View> */}
                <FollowButton friend_id={friend_id} />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: '97%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 2,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        height: '100%',
        justifyContent: 'center',
        alignContent: 'left',
        width: 150
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
    },
    major: {
        fontSize: 12,
        fontWeight: 'bold',
        width: 100,
        color: COLORS.darkBlue,
    },
    ratingContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
    },
    followButton: {
        backgroundColor: '#007BFF',
        width: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    followingButton: {
        backgroundColor: '#ccc', // Change the color for the following state
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
});