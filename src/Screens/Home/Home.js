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
import TopButtons from "../../components/TopButtons";
import axios from "axios";

const Home = ({ navigation }) => {
    const [userDetails, setUserDetails] = React.useState({});
    const [reviews, setReviews] = React.useState([]);
    const [info, setInfo] = React.useState("");

    React.useEffect(() => {
        async function getReviews() {
            const user = await AsyncStorage.getItem('user');
            const userId = JSON.parse(user).id;
            const info = await axios.get(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}`);

            setInfo(JSON.parse(user).info);
            const reviews = await axios.get(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Reviews`);
            // console.log(reviews.data);
            setReviews(reviews.data);
        }
        getReviews();
        getUserDetails();

    }, []);

    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        // console.log("este es el user ", userData);
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
            <Text style={{ fontSize: 14, fontWeight: 'regular', marginTop: 10 }}>{userDetails.rating && parseFloat(userDetails.rating.toFixed(2))}/5</Text>

            <StarRating
                stars={Math.floor(userDetails.rating)}
            />
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'flex-start',
                }}
                style={{
                    paddingHorizontal: 20,
                    width: '100%',
                }}
            >
                <Info
                    text={userDetails.info} />
                <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'flex-start' }}>Reviews</Text>
                {reviews.map((review) => {
                    return (
                        <View key={review.comment + review.date} style={{
                            width: '99%',
                            borderRadius: 9,
                            backgroundColor: 'white',
                            elevation: 2,
                            marginBottom: 16,
                            marginHorizontal: 1,
                        }}>
                            <Text style={{
                                margin: 10,
                                fontWeight: '300',
                                fontStyle: 'italic',
                                fontSize: 14,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    fontSize: 20,
                                }}>{review.title}</Text> <StarRating stars={review.rating} />

                                <Text>{"\n" + review.comment}</Text>

                            </Text>
                        </View>
                    )
                })
                }
                {/* <FlatList
                    data={reviews}
                    style={{
                        width: '100%',
                        paddingTop: 10,
                        alignContent: 'center',
                    }}
                    renderItem={({ item }) => (
                        <View style={{
                            width: '99%',
                            borderRadius: 9,
                            backgroundColor: 'white',
                            elevation: 2,
                            marginBottom: 16,
                            marginHorizontal: 1,
                        }}>
                            <Text style={{
                                margin: 10,
                                fontWeight: '300',
                                fontStyle: 'italic',
                                fontSize: 14,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    fontSize: 20,
                                }}>{item.title}</Text> <StarRating stars={item.rating} />

                                <Text>{"\n" + item.comment}</Text>


                            </Text>
                        </View >
                    )}
                    keyExtractor={item => item.id}
                /> */}

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