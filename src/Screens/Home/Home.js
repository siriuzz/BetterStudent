import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
    Image,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    ScrollView,
} from 'react-native';
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import COLORS from "../../constants/colors";
import Info from "../../components/Info";
import Input from "../../components/Input";
import StarRating from "../../components/StarRating";
import TopButtons from "../../components/TobButtons"

const Home = ({ navigation }) => {
    const [userDetails, setUserDetails] = React.useState({});
    React.useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        console.log(userData);
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };

    const logout = async () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        );
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: COLORS.white,
            }}>

            {/*Color en Avatar... Yo(estudiante)=COLORS.yellow, Yo(admin)=COLORS.lightBlue, otraPersona=COLORS.darkYellow*/}
            <Avatar
                enableEdit={true}
                color={COLORS.yellow} />
            <TopButtons
                enableGoBack={false}
                enableTopRightIcons={true}
            />

            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{userDetails.name}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'regular' }}>{userDetails.email}</Text>
            <StarRating
                stars={userDetails.rating}
            />
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,

                }}
            >
                <Info
                    title='Estudiante de'
                    text='Ingenieria de software' />

                <Info
                    title='Caracteristicas a destacar'
                    text='Lider innato, QSY profesional, programador pro premium, Lider innato, QSY profesional, programador pro premium, Lider innato, QSY profesional, programador pro premium, Lider innato, QSY profesional, programador pro premium' />


                {/*<Button title="Logout" onPress={() => {navigation.navigate('LeaderBoard')}}/>*/}

            </ScrollView>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    userContext: {
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 5, // Añade sombra con una elevación de 5
    }
})

export default Home;