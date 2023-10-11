import { settings } from "firebase/analytics";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  Image,
} from "react-native";
import COLORS from "../../constants/colors";
import Info from "../../components/Info";
import { GlobalStyles } from "../GlobalStyles";
import FriendListItem from "../../components/FriendListItem";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FriendScreen({ navigation }) {
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    async function getFriends() {
      const user = await AsyncStorage.getItem("user");
      const userId = JSON.parse(user).id;
      const friends = await axios.get(
        `${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Friends`
      ).then((res) => {
        console.log(res.data);
        setFriends(res.data);
      }).catch((err) => {
        console.log("Este es el error ", err);
      });
    }
    getFriends();
  }, []);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: '20%',
      alignItems: 'center',
    }}>
      <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.title}>Amigos</Text>
        <SearchBar data={[]} />
        <ScrollView>
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 10, paddingBottom: 20 }}>
            {friends.map((friend) => {
              return (
                <FriendListItem
                  key={friend.id}
                  friend_id={friend.id}
                  image={friend.image}
                  name={friend.name}
                  major={friend.career.name}
                  onPress={() => {
                    navigation.navigate("FriendProfile", {
                      friendId: friend.id,
                    });
                  }}
                />
              );
            })}
          </View>

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}