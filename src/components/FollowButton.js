import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
// import Logo from "../../assets/Logo.png";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import FriendProfile from "../Screens/FriendProfile/FriendProfile";
// import { useNavigation } from "@react-navigation/native";

export default function FollowButton({ friend_id }) {
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
        <View >
            <TouchableOpacity
                style={[style.followButton, isFollowing ? style.followingButton : null]}
                onPress={handleFollowToggle}
            >
                <Text style={style.buttonText}>
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    followButton: {
        backgroundColor: COLORS.navyBlue,
        width: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    followingButton: {
        backgroundColor: COLORS.grey, // Change the color for the following state
    },
    buttonText: {
        color: COLORS.white,
        textAlign: 'center',
    },
});