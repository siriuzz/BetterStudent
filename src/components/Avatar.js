import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import user from '../../assets/icon-user.png';
import edit from '../../assets/icon-edit.png'
import COLORS from "../conts/colors";
import * as ImagePicker from 'expo-image-picker';

const Avatar = () => {
    //Estado para guardar el uri de la imagen seleccionada
    const [selectedImage, setSelectedImage] = useState(null); 

    let openImagePickerAsync = async () => {
        //Pedir permisos para acceder a galeria
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Los permisos para acceder a la galeria son requeridos');
            return;
        }

        //Muesstra el sistema para seleccionar elementos de la galeria
        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        //Si se cancela el proceso se retorna para evitar errores
        if (pickerResult.canceled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.assets[0].uri });
    }
    
    return(
        <View style={styles.back}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                {/*Expresion ternaria: Si se coloco una uri de imagen se muestra esa, sino se muestra la imagen por default*/}
                {selectedImage ? (
                    <Image
                        style={styles.userImage}
                        source={{ uri: selectedImage.localUri }}
                    />
                ) : (
                    <Image
                        style={styles.userImage}
                        source={ user }
                    />
                    )
                }
                <Image 
                    style={styles.editIcon}
                    source={ edit }/>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    back: {
        backgroundColor: COLORS.grey,
        width: 120,
        height: 120, 
        borderRadius: 60, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        height: 120,
        width: 120,
        resizeMode: 'cover',
        borderRadius: 60,
    },
    editIcon:{
        position: 'absolute',
        backgroundColor: COLORS.light,
        height: 36,
        width: 36,
        marginTop: 75,
        marginLeft: 73,
        resizeMode: 'cover',
        borderRadius: 60,
        
    }
})

export default Avatar;