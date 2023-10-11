import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
import Logo from "../../assets/Logo.png";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FriendListItem({ friend_id, image, name, major }) {
    const [isFollowing, setIsFollowing] = useState(true);

    const handleFollowToggle = () => {
        // Toggle the following state
        async function deleteFriend(friend_id) {
            const user = await AsyncStorage.getItem('user');
            const userId = JSON.parse(user).id;
            // console.log(friend_id)
            const result = await axios.delete(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Friends/${friend_id}`);
            console.log(result.data);
        }

        async function addFriend(friend_id) {
            const user = await AsyncStorage.getItem('user');
            const userId = JSON.parse(user).id;
            // console.log(friend_id)
            const result = await axios.post(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Friends/${friend_id}`);
            console.log(result.data);
        }

        if (!isFollowing) {
            addFriend(friend_id);
        } else {
            deleteFriend(friend_id);
        }
        setIsFollowing(!isFollowing);
    };
    return (
        <View style={style.container}>

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