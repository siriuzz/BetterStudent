import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../Screens/Login/Login';
import COLORS from '../conts/colors';

const PopUpMenu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // Usa useNavigation para acceder a la navegación

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text>Proximamente...</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text>Proximamente...</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text>Cerrar sesión</Text>
            </TouchableOpacity>
            {/* Agrega más elementos de menú según sea necesario */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: '52%',
    paddingTop: '15%',
  },
  menuContainer: {
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
  },
});

export default PopUpMenu;
