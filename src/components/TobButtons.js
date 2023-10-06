import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import iconBack from '../../assets/icon-back.png';
import iconMenuVertical from '../../assets/icon-menu-vertical.png';
import iconBarChart from '../../assets/icon-bar-chart.png';
import LeaderBoard from '../Screens/LeaderBoard/LeaderBoard';
import PopUpMenu from './PopUpMenu';

const TopButtons = (props) => {
    const navigation = useNavigation(); // Usa useNavigation para acceder a la navegación

    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    return(


        <View style={styles.buttons}>
            <View style={{alignItems: 'flex-start'}}>
                { props.enableGoBack === true ? (
                    <TouchableOpacity>
                        <Image
                        source={iconBack}
                        />
                    </TouchableOpacity>
                ):(
                    null
                )}
                
            </View>
            <View  style={{ flexDirection: 'row' ,alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate('LeaderBoard')}>
                    <Image
                    source={iconBarChart}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMenu}>
                    <Image
                        style={{marginLeft: 20}}
                        source={iconMenuVertical}
                        /> 
                </TouchableOpacity>
                
                
            </View>
            <PopUpMenu isVisible={isMenuVisible} onClose={toggleMenu} />
        </View>
    )
}

export default TopButtons;

const styles = StyleSheet.create ({
    buttons: {
        position: 'absolute',
        top: '8%',
        flexDirection: 'row', 
        width: '85%', 
        justifyContent: 'space-between', 
    }
    
})