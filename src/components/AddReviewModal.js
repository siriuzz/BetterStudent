import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../Screens/Login/Login';
import COLORS from '../constants/colors';
import Input from './Input';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function AddReviewModal({ isVisible, onClose, friend_id }) {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [rating, setRating] = useState(0);

    const onChangeTitle = (text) => {
        setTitle(text);
    };

    const onChangeBody = (text) => {
        setBody(text);
    };

    const handleAddReview = () => {

        // Toggle the following state
        async function addReview(friend_id) {
            // console.log(friend_id)
            // console.log({
            //     title: title,
            //     comment: body,
            //     rating: rating != "Rating" ? parseInt(rating) : 1
            // })

            const result = await axios.post(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${friend_id}/Reviews`, {
                student_id: friend_id,
                title: title,
                comment: body,
                rating: rating != "Rating" ? parseInt(rating) : 1
            });
            // console.log(result.data);
        }

        addReview(friend_id);
        onClose();
    };
    return (
        <Modal
            visible={isVisible}
            animationType="fade"
        >
            <Loader visible={loading} />
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Agregar Reseña</Text>
                    <View style={{ paddingHorizontal: 20 }}>
                        <TextInput onChangeText={(text) => { onChangeTitle(text) }} editable label="Título" underlineColor='transparent' style={{ backgroundColor: COLORS.light, borderBottomColor: COLORS.white, width: 325, marginVertical: 20 }} />
                        <TextInput onChangeText={(text) => { onChangeBody(text) }} multiline editable selectionColor={COLORS.lightBlue} label="Cuerpo de la reseña" maxLength={500} numberOfLines={10} underlineColor='transparent' style={{ marginBottom: 20, backgroundColor: COLORS.light, borderBottomColor: COLORS.white }} />
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Rating</Text>
                        <Picker
                            style={{ borderRadius: 8, backgroundColor: COLORS.light, borderBottomColor: COLORS.white, width: 325, marginTop: 10, marginBottom: 20 }}
                            selectedValue={rating}
                            onValueChange={(itemValue, itemIndex) => {
                                setRating(itemValue);
                            }}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />

                        </Picker>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={onClose}>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: "#de3d4b", borderRadius: 8 }}>

                                <Text style={{ color: COLORS.white, fontSize: 16 }}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAddReview}>
                            <View style={{ marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: COLORS.navyBlue, borderRadius: 8 }}>
                                <Text style={{ color: COLORS.white, fontSize: 16 }}>Agregar reseña</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    {/* Agrega más elementos de menú según sea necesario */}
                </View>
            </TouchableWithoutFeedback>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: "35%",

    },
    menuContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        height: '60%',
        padding: 20,
        elevation: 5,
        alignItems: 'center',
        borderRadius: 15,
        position: 'absolute',


    },
});


