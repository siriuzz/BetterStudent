import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
// import Logo from "../../assets/Logo.png";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddReviewModal from "./AddReviewModal";
// import FriendProfile from "../Screens/FriendProfile/FriendProfile";
// import { useNavigation } from "@react-navigation/native";

export default function AddReviewButton({ friend_id }) {
    const [modalStatus, setModalStatus] = useState(false);

    const handleAddReview = () => {
        setModalStatus(true);

        // Toggle the following state
        // async function deleteFriend(friend_id) {
        //     const user = await AsyncStorage.getItem('user');
        //     const userId = JSON.parse(user).id;
        //     // console.log(friend_id)
        //     const result = await axios.delete(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Friends/${friend_id}`);
        //     console.log(result.data);
        // }

        // async function addFriend(friend_id) {
        //     const user = await AsyncStorage.getItem('user');
        //     const userId = JSON.parse(user).id;
        //     // console.log(friend_id)
        //     const result = await axios.post(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Friends/${friend_id}`);
        //     console.log(result.data);
        // }

        // if (!isFollowing) {
        //     addFriend(friend_id);
        // } else {
        //     deleteFriend(friend_id);
        // }
        // setIsFollowing(!isFollowing);
    };

    const closeModal = () => {
        setModalStatus(false);
    };
    return (
        <KeyboardAvoidingView style={{ width: "auto" }}>
            <TouchableOpacity
                style={style.addReviewButton}
                onPress={handleAddReview}
            >
                <Text style={style.buttonText}>
                    Agregar reseña
                </Text>

                <AddReviewModal isVisible={modalStatus} onClose={closeModal} friend_id={friend_id} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

//constante para agregar reviews de estudiantes, basicamente se encarga del diseño
const style = StyleSheet.create({
    addReviewButton: {
        backgroundColor: COLORS.navyBlue,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: COLORS.white,
        textAlign: 'center',
    },

});