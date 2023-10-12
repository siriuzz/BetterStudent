import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../Screens/Login/Login';
import COLORS from '../constants/colors';
import Input from './Input';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddReviewModal({ isVisible, onClose }) {

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Agregar Reseña</Text>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Input label="Título" style={{ width: "100%" }} height="30" />
                    </View>
                    <TouchableOpacity onPress={onClose}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
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


