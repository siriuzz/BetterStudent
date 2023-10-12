import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
    Image,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Avatar from "../../components/Avatar";
import COLORS from "../../constants/colors";
import Info from "../../components/Info";
import StarRating from "../../components/StarRating";
import TopButtons from "../../components/TopButtons";
import axios from "axios";
import FollowButton from "../../components/FollowButton";
import AddReviewButton from "../../components/AddReview";

export default function FriendProfile({ navigation, route }) {
    const { friend_id } = route.params;

    const [friendDetails, setfriendDetails] = React.useState({});
    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        async function getReviews() {
            const friend = await axios.get(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${friend_id}`);

            setfriendDetails(friend.data);
            const reviews = await axios.get(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${friend_id}/Reviews`);
            // console.log(reviews.data);
            setReviews(reviews.data);
        }

        // console.log("id del amigo ", friend_id);
        getReviews();

    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: COLORS.white,
            }}

        >
            {/*Color en Avatar... Yo(estudiante)=COLORS.yellow, Yo(admin)=COLORS.lightBlue, otraPersona=COLORS.darkYellow*/}
            <Avatar
                enableEdit={false}
                color={COLORS.lightBlue} />
            <TopButtons
                enableGoBack={true}
                enableTopRightIcons={false}
            />

            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{friendDetails.name}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'regular' }}>{friendDetails.email}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'regular', marginTop: 10 }}>{friendDetails.rating && parseFloat(friendDetails.rating.toFixed(2))}/5</Text>

            <StarRating
                stars={Math.floor(friendDetails.rating)}
            />
            <View keyboardShouldPersistTaps="never" style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", }}>
                <FollowButton friend_id={friend_id} />
                <AddReviewButton friend_id={friend_id} />
            </View>

            {/* // Hacer que el scrollview sea funcional */}
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
                    text={friendDetails.info} /> {/*Aqui va la info de los estudiantes, es decir los amigos de x estudiante*/}
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

            </ScrollView>

        </SafeAreaView>
    );
};