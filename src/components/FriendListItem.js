import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';;

export default function FriendListItem({ image, name, major, rating }) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        // Toggle the following state
        setIsFollowing(!isFollowing);

        // You can also send a request to your backend to update the follow status here
    };
    return (
        <View style={style.container}>

            <View style={style.imageContainer}>
                <Image source={image} style={style.image} />
            </View>
            <View style={style.infoContainer}>
                <Text style={style.name}>{name}</Text>
                <Text style={style.major}>Carrera: {major}</Text>
            </View>
            {/* <View style={style.ratingContainer}>
                <Text style={style.rating}>{rating}</Text>
            </View> */}
            <TouchableOpacity
                style={[style.followButton, isFollowing ? style.followingButton : null]}
                onPress={handleFollowToggle}
            >
                <Text style={style.buttonText}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        width: 60,
        height: 60,
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
        paddingRight: 50,
        justifyContent: 'center',
        alignContent: 'left',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkBlue,
    },
    major: {
        fontSize: 14,
        fontWeight: 'bold',
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