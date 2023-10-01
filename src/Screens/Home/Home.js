import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Image } from "react-native";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import COLORS from "../../conts/colors";


const Home = ({navigation}) => {

    const [userDetails, setUserDetails] = React.useState({});
    React.useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async() => {
        const userData = await AsyncStorage.getItem('user');
        if(userData) {
            setUserDetails(JSON.parse(userData));
        }
    };

    const logout = async() => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({...userDetails, loggedIn: false}),
        );
        navigation.navigate('Login');
    };

    return (
    <View 
        style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal: 40,
            backgroundColor: COLORS.white
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bienvenido {userDetails.fullName}</Text>
            <Button title="Logout" onPress={logout}/>
            {/*Llamar componente de foto de perfil (editable)
            <Avatar />
            */}
    </View>
    );
};

export default Home;