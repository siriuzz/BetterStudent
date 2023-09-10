import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";

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
        paddingHorizontal: 40
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome {userDetails.fullName}</Text>
        <Button title="Logout" onPress={logout}/>
    </View>
    );
};

export default Home;